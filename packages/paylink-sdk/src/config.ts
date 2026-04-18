type PayLinkConfig = {
  network: 'mainnet' | 'sepolia';
  serverUrl: string;
  alchemyApiKey?: string;
  debug?: boolean;
  moonpayApiKey?: string;
};

let config: PayLinkConfig = {
  network: 'sepolia',
  serverUrl: 'http://localhost:3001',
  alchemyApiKey: undefined,
  debug: false,
};

export function setPayLinkConfig(newConfig: Partial<PayLinkConfig>) {
  config = { ...config, ...newConfig };
}

export function getPayLinkConfig() {
  return config;
}