export function normalizeAddress(address: string): string {
  if (!address) return '0x0';

  let hex = address.toLowerCase();

  if (hex.startsWith('0x')) {
    hex = hex.slice(2);
  }

  const stripped = hex.replace(/^0+/, '') || '0';

  return '0x' + stripped;
}

export function addressesMatch(a: string, b: string): boolean {
  if (!a || !b) return false;
  return normalizeAddress(a) === normalizeAddress(b);
}