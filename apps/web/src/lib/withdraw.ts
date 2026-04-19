import { Amount, sepoliaTokens } from 'starkzap';
import { normalizeAddress } from './address';

const USDC = sepoliaTokens.USDC;

export async function withdrawToAddress(
  wallet: any,
  recipientAddress: string,
  amount: string
): Promise<string> {
  if (!wallet) throw new Error('Wallet not connected');
  if (!recipientAddress) throw new Error('Recipient address required');
  if (!amount || parseFloat(amount) <= 0) throw new Error('Invalid amount');

  const normalized = normalizeAddress(recipientAddress);
  if (!normalized || normalized === '0x0') {
    throw new Error('Invalid Starknet address');
  }


  await wallet.ensureReady({ deploy: 'if_needed' });

  const tx = await wallet.transfer(
    USDC,
    [{ to: normalized, amount: Amount.parse(amount, USDC) }],
    { feeMode: 'user_pays' }
  );

  const txHash = tx.transaction_hash ?? tx.hash;
  await tx.wait();

  return txHash;
}