import { RpcProvider, shortString } from 'starknet';
import { normalizeAddress } from './address';

const REGISTRY_ADDRESS =
  '0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822';

function getEndpoints(): string[] {
  const alchemyKey = import.meta.env.VITE_ALCHEMY_API_KEY;
  const endpoints: string[] = [];

  if (alchemyKey) {
    endpoints.push(
      `https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/${alchemyKey}`
    );
  }

  endpoints.push('https://free-rpc.nethermind.io/sepolia-juno');
  endpoints.push('https://rpc.starknet-testnet.lava.build');
  return endpoints;
}

export async function resolveUsername(username: string): Promise<string | null> {
  if (!username || username.length < 3) return null;

  const endpoints = getEndpoints();
  const nameFelt = shortString.encodeShortString(username);

  console.log('[registry] Resolving:', username, '| endpoints:', endpoints.length);

  let lastError: any = null;

  for (const url of endpoints) {
    try {
      console.log('[registry] Trying:', url);

      const provider = new RpcProvider({ nodeUrl: url });

      const result: any = await provider.callContract({
        contractAddress: REGISTRY_ADDRESS,
        entrypoint: 'resolve_name',
        calldata: [nameFelt],
      });

      console.log('[registry] Raw result from', url, ':', result);

      let rawAddress: string;

      if (typeof result === 'bigint') {
        rawAddress = '0x' + result.toString(16);
      } else if (typeof result === 'string') {
        rawAddress = result;
      } else if (Array.isArray(result)) {
        const first = result[0];
        rawAddress = typeof first === 'bigint'
          ? '0x' + first.toString(16)
          : String(first);
      } else if (result && typeof result === 'object' && 'result' in result) {
        const arr = (result as { result: string[] }).result;
        rawAddress = arr[0] ?? '0x0';
      } else {
        rawAddress = String(result);
      }

      console.log('[registry] Parsed address:', rawAddress);

      if (!rawAddress || rawAddress === '0x0' || rawAddress === '0x') {
        return null;
      }

      try {
        if (BigInt(rawAddress) === 0n) return null;
      } catch {
      }

      const normalized = normalizeAddress(rawAddress);
      return normalized;

    } catch (err: any) {
      lastError = err;
    }
  }
  console.error('[registry] All endpoints failed. Last error:', lastError);
  throw new Error('Could not connect to Starknet. Please try again.');
}

if (import.meta.env.DEV) {
  (window as any).testResolve = (username: string) =>
    resolveUsername(username)
      .then(res => console.log(`[testResolve] ${username} ->`, res))
      .catch(err => console.error(`[testResolve] ${username} failed:`, err));
}