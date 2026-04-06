import express from 'express';
import cors from 'cors';
import { PrivyClient } from '@privy-io/server-auth';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { Account, ec, hash, num } from 'starknet';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('[startup] DEPLOYER_ADDRESS:', process.env.DEPLOYER_ADDRESS ? process.env.DEPLOYER_ADDRESS.slice(0, 10) + '...' : 'MISSING');
console.log('[startup] DEPLOYER_PRIVATE_KEY:', process.env.DEPLOYER_PRIVATE_KEY ? 'PRESENT' : 'MISSING');
const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));

const PRIVY_APP_ID = process.env.VITE_PRIVY_APP_ID;
const PRIVY_SECRET = process.env.PRIVY_SECRET_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const DEPLOYER_ADDRESS = process.env.DEPLOYER_ADDRESS;

if (!PRIVY_APP_ID || !PRIVY_SECRET) {
  console.error('FATAL: Missing PRIVY env vars');
  process.exit(1);
}

const privy = new PrivyClient(PRIVY_APP_ID, PRIVY_SECRET);
const userKeys = new Map();

// Stark curve order — private key must be strictly less than this
const STARK_CURVE_ORDER = BigInt(
  '3618502788666131213697322783095070105526743751716087489154079457884512865583'
);

// Rejection sampling — generates a cryptographically valid Stark private key
function generateStarkPrivateKey() {
  while (true) {
    const bytes = crypto.randomBytes(32);
    const candidate = BigInt('0x' + bytes.toString('hex'));
    if (candidate >= 1n && candidate < STARK_CURVE_ORDER) {
      return '0x' + candidate.toString(16).padStart(64, '0');
    }
  }
}


const STARKZAP_CLASS_HASH = '0x01d1777db36cdd06dd62cfde77b1b6ae06412af95d57a13dc40ac77b8a702381';
const STRK_ADDRESS = '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';

function deriveStarkZapAddress(privateKey) {
  // Apply grindKey to match exactly what StarkSigner does in useAuth.ts
  const groundKey = ec.starkCurve.grindKey(privateKey);
  const publicKey = ec.starkCurve.getStarkKey(groundKey);

  // StarkZap uses publicKey as both the salt and constructor calldata
  return hash.calculateContractAddressFromHash(
    publicKey,         // salt
    STARKZAP_CLASS_HASH,
    [publicKey],       // constructor calldata
    0                  // deployer address
  );
}

async function fundNewWallet(recipientAddress) {
  if (!DEPLOYER_PRIVATE_KEY || !DEPLOYER_ADDRESS) {
    console.warn('[fund] Missing deployer config');
    return;
  }

  console.log('[fund] recipient:', recipientAddress);
  console.log('[fund] deployer:', DEPLOYER_ADDRESS.slice(0, 12) + '...');

  try {
    const cleanAddress = DEPLOYER_ADDRESS.startsWith('0x')
      ? DEPLOYER_ADDRESS
      : '0x' + DEPLOYER_ADDRESS;

    const cleanKey = DEPLOYER_PRIVATE_KEY.startsWith('0x')
      ? DEPLOYER_PRIVATE_KEY
      : '0x' + DEPLOYER_PRIVATE_KEY;

    
    const deployer = new Account({
      provider: {
        nodeUrl:  `https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_9/${process.env.ALCHEMY_API_KEY}`
      },
      address: cleanAddress,
      signer: cleanKey
    });

    const amount = 20000000000000000n;
    const amountLow = (amount & 0xffffffffffffffffffffffffffffffffn).toString();
    const amountHigh = '0';

    const tx = await deployer.execute({
      contractAddress: STRK_ADDRESS,
      entrypoint: 'transfer',
      calldata: [recipientAddress, amountLow, amountHigh],
    },
   
  );

    console.log('[fund] STRK sent! tx:', tx.transaction_hash);

  } catch (err) {
    console.error('[fund] Failed:', err.message);
  }
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', appId: PRIVY_APP_ID.slice(0, 8) + '...' });
});

app.post('/api/wallet/get-or-create', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Missing token' });

    const claims = await privy.verifyAuthToken(token);
    if (!claims) return res.status(401).json({ error: 'Invalid token' });

    const userId = claims.userId;
    console.log('[wallet] Request for userId:', userId);

    if (!userKeys.has(userId)) {
      const privateKey = generateStarkPrivateKey();
      userKeys.set(userId, privateKey);

      
      const address = deriveStarkZapAddress(privateKey);
      console.log('[wallet] New wallet for', userId, '| address:', address);

      // Fire and forget — non-blocking, non-fatal
      fundNewWallet(address).catch(err =>
        console.error('[fund] Unexpected error:', err.message)
      );
    }

    res.json({ privateKey: userKeys.get(userId) });

  } catch (err) {
    console.error('[wallet] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`PayLink server running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
});