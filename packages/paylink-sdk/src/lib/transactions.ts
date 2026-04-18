import { getPayLinkConfig } from '../config';

function getServerUrl() {
  const { serverUrl } = getPayLinkConfig();
  return serverUrl;
}

export async function saveTransactionToServer(
  token: string,
  transaction: {
    hash: string;
    amount: string;
    symbol: string;
    timestamp: number;
    status: string;
    recipientAddress: string;
    senderAddress: string;
  }
) {
  try {
    const res = await fetch(`${getServerUrl()}/api/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, transaction }),
    });
    if (!res.ok) console.warn('[tx] Save failed:', await res.text());
  } catch (err) {
    console.warn('[tx] Could not save to server:', err);
  }
}

export async function fetchTransactionsFromServer(
  recipientAddress: string
): Promise<any[]> {
  try {
    const res = await fetch(`${getServerUrl()}/api/transactions/${recipientAddress}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.transactions ?? [];
  } catch {
    return [];
  }
}

export async function updateTransactionOnServer(hash: string, status: string) {
  try {
    await fetch(`${getServerUrl()}/api/transactions/${hash}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  } catch (err) {
    console.warn('[tx] Status update failed:', err);
  }
}