import express from 'express';
import cors from 'cors';
import { PrivyClient } from '@privy-io/server-auth';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { Account, ec, hash, shortString } from 'starknet';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});



const TX_FILE = join(__dirname, 'transactions.json');

const app = express();
app.use(express.json());
app.use(cors({ 
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000', 
    'https://paylink001.vercel.app',
    'https://www.paylink001.vercel.app'
  ],
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const PRIVY_APP_ID = process.env.VITE_PRIVY_APP_ID;
const PRIVY_SECRET = process.env.PRIVY_SECRET_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const DEPLOYER_ADDRESS = process.env.DEPLOYER_ADDRESS;

if (!PRIVY_APP_ID || !PRIVY_SECRET) {
  console.error('FATAL: Missing PRIVY env vars');
  process.exit(1);
}

const privy = new PrivyClient(PRIVY_APP_ID, PRIVY_SECRET);
const userKeys = new Map(); // Tracks funding in current session

/* ---------------- NONCE MANAGEMENT QUEUE ---------------- */
class FundingQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.maxSize = 10;
  }

  async add(task) {
    if (this.queue.length >= this.maxSize) {
      throw new Error('TOO_MANY_REQUESTS');
    }
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    const { task, resolve, reject } = this.queue.shift();
    try {
      const result = await task();
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      await new Promise(r => setTimeout(r, 3000)); 
      this.processing = false;
      this.process();
    }
  }
}

const fundingQueue = new FundingQueue();

/* ---------------- HELPERS & STORAGE ---------------- */

function normalizeAddress(address) {
  if (!address) return '0x0';

  let hex = address.toLowerCase();

  if (hex.startsWith('0x')) {
    hex = hex.slice(2);
  }

  const stripped = hex.replace(/^0+/, '') || '0';

  return '0x' + stripped;
}

const REGISTRY_FILE = join(__dirname, 'registry.json');

function loadRegistry() {
  try {
    if (existsSync(REGISTRY_FILE)) {
      return JSON.parse(readFileSync(REGISTRY_FILE, 'utf8'));
    }
  } catch (err) {
    console.warn('[registry] Load error:', err.message);
  }
  return {};
}

function saveRegistry(data) {
  try {
    writeFileSync(REGISTRY_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.warn('[registry] Save error:', err.message);
  }
}

const registry = loadRegistry();

function loadTransactions() {
  try {
    if (existsSync(TX_FILE)) {
      const data = JSON.parse(readFileSync(TX_FILE, 'utf8'));
      const map = new Map();
      
      // Convert from hash-based storage
      if (Array.isArray(data)) {
        // New format: array of transactions
        data.forEach(tx => map.set(tx.hash, tx));
      } else {
        // Old format: address-based grouping - migrate to hash-based
        for (const txList of Object.values(data)) {
          if (Array.isArray(txList)) {
            txList.forEach(tx => {
              if (!map.has(tx.hash)) {
                map.set(tx.hash, tx);
              }
            });
          }
        }
      }
      return map;
    }
  } catch (err) {
    console.warn('[tx] Load error:', err.message);
  }
  return new Map();
}

function saveTransactions(map) {
  try {
    const transactions = Array.from(map.values());
    writeFileSync(TX_FILE, JSON.stringify(transactions, null, 2));
  } catch (err) {
    console.warn('[tx] Save error:', err.message);
  }
}

const transactionsMap = loadTransactions();

function storeTransaction(tx) {
  const sender = normalizeAddress(tx.senderAddress);
  const recipient = normalizeAddress(tx.recipientAddress);
  
  if (sender === recipient) {
    throw new Error('Invalid transaction: self-transfer detected');
  }
  

  transactionsMap.set(tx.hash, {
    ...tx,
    senderAddress: sender,
    recipientAddress: recipient
  });
}

/* ---------------- WALLET LOGIC ---------------- */
const STARK_CURVE_ORDER = BigInt('3618502788666131213697322783095070105526743751716087489154079457884512865583');
const STARKZAP_CLASS_HASH = '0x0113c49842a1768686d63d894b986e66e6b010c71a36417537b98d25434440c4';
const STRK_ADDRESS = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';

function derivePrivateKey(userId) {
  const digest = crypto.createHash('sha256').update(userId).digest('hex');
  const candidate = BigInt('0x' + digest) % STARK_CURVE_ORDER;
  return '0x' + candidate.toString(16).padStart(64, '0');
}


async function performFunding(recipientAddress) {
  if (!DEPLOYER_PRIVATE_KEY || !DEPLOYER_ADDRESS) return;
  
  const apiKey = process.env.ALCHEMY_API_KEY || process.env.VITE_ALCHEMY_API_KEY;
  const deployer = new Account({
    provider: { nodeUrl: `https://starknet-sepolia.g.alchemy.com/v2/${apiKey}` },
    address: normalizeAddress(DEPLOYER_ADDRESS),
    signer: DEPLOYER_PRIVATE_KEY
  });

  const amount = 300000000000000000n; 
  try {
    const tx = await deployer.execute({
      contractAddress: STRK_ADDRESS,
      entrypoint: 'transfer',
      calldata: [recipientAddress, (amount & 0xffffffffffffffffffffffffffffffffn).toString(), '0'],
    });
    console.log('[fund] Sent to:', recipientAddress, 'TX:', tx.transaction_hash);
    await deployer.waitForTransaction(tx.transaction_hash);
  } catch (error) {
    console.error('[fund] Failed:', error.message);
    throw error;
  }
}

/* ---------------- ROUTES ---------------- */

function resolveUsername(username) {
  return registry[username] || null;
}

app.post('/rebind', async (req, res) => {
  const { username, newAddress } = req.body;

  try {
    if (!username || !newAddress) {
      return res.json({ success: false, error: 'Missing data' });
    }

    const normalized = normalizeAddress(newAddress);

  
    registry[username] = normalized;

    saveRegistry(registry);

    console.log(`[REBOUND] ${username} -> ${normalized}`);

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.get('/resolve/:username', (req, res) => {
  const { username } = req.params;
  const address = resolveUsername(username);

  res.json({ address });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', appId: PRIVY_APP_ID.slice(0, 8) + '...' });
});

app.post('/api/wallet/get-or-create', async (req, res) => {
  try {
    const { token, address } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Missing token' });
    }

    const claims = await privy.verifyAuthToken(token);
    if (!claims) return res.status(401).json({ error: 'Unauthorized' });

    const privateKey = derivePrivateKey(claims.userId);

    if (!address) {
      return res.json({ privateKey });
    }

    const normalizedAddress = normalizeAddress(address);

    console.log('[wallet] userId:', claims.userId);
    console.log('[wallet] frontend address (SOURCE OF TRUTH):', normalizedAddress);
    console.log('[wallet] pk:', privateKey.slice(0, 10));

  
    if (!userKeys.has(claims.userId)) {
      userKeys.set(claims.userId, true);
      fundingQueue
        .add(() => performFunding(normalizedAddress))
        .catch(e => console.error(e.message));
    }

    return res.json({
      privateKey,
      address: normalizedAddress,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { token, transaction } = req.body;
    const claims = await privy.verifyAuthToken(token);
    if (!claims) return res.status(401).json({ error: 'Invalid token' });

    const { hash, amount, symbol, timestamp, status, senderAddress, recipientAddress } = transaction;

    const txRecord = { 
      hash, 
      amount, 
      symbol, 
      timestamp, 
      status, 
      senderAddress, 
      recipientAddress 
    };

    storeTransaction(txRecord);
    saveTransactions(transactionsMap);
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/transactions/:address', (req, res) => {
  const address = normalizeAddress(req.params.address);
  
  const transactions = Array.from(transactionsMap.values()).filter(tx => {
    const sender = normalizeAddress(tx.senderAddress || '');
    const recipient = normalizeAddress(tx.recipientAddress || '');
    return sender === address || recipient === address;
  });
  
  res.json({ success: true, count: transactions.length, transactions });
});

app.patch('/api/transactions/:hash', (req, res) => {
  const { hash } = req.params;
  const { status } = req.body;
  
  const tx = transactionsMap.get(hash);
  if (tx) {
    tx.status = status;
    transactionsMap.set(hash, tx);
    saveTransactions(transactionsMap);
  }
  
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(` PayLink Server running on port ${PORT}`));