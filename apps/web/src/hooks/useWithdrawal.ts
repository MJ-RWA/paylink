import { useState } from 'react';
import { starkzap } from '../services/starkzapService';

export function useWithdrawal() {
  const [isLoading, setIsLoading] = useState(false);

  const withdraw = async (amount: number, destination: string, type: 'bank' | 'wallet') => {
    setIsLoading(true);
    const result = await starkzap.withdraw({ amount, destination, type });
    setIsLoading(false);
    return result.success;
  };

  return {
    isLoading,
    withdraw,
  };
}
