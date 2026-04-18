export function openMoonPay(walletAddress: string) {
  const apiKey = import.meta.env.VITE_MOONPAY_API_KEY;

  if (!apiKey) {
    console.warn('[moonpay] VITE_MOONPAY_API_KEY not set');
    return;
  }

  const params = new URLSearchParams({
    apiKey,
    currencyCode: 'usdc_starknet',
    walletAddress,
    colorCode: '#0D9488',
  });

  const url = `https://buy-sandbox.moonpay.com?${params.toString()}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}