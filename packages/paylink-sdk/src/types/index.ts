export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  isVerified?: boolean;
}

export interface Transaction {
  id: string | number;
  sender: string;
  recipient: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Failed';
  hash?: string;
}

export type PaymentMethod = 'card' | 'bank';

export interface PaymentParams {
  recipient: string;
  amount: number;
  asset: string;
}

export interface WithdrawalParams {
  amount: number;
  destination: string;
  type: 'bank' | 'wallet';
}
