import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePaymentStore } from './useStore';
import { fetchTransactionsFromServer } from '../lib/transactions';
import { normalizeAddress } from '../lib/address';


export function useUnifiedTransactions(walletAddress: string | null) {
  const { transactions: localTransactions } = usePaymentStore();
  const [serverTransactions, setServerTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  
  const normalizedWallet = useMemo(() => 
    walletAddress ? normalizeAddress(walletAddress) : null
  , [walletAddress]);

  const refetch = useCallback(async () => {
    if (!normalizedWallet || normalizedWallet === '0x0') return;

    setIsLoading(true);
    try {
      console.log('[FETCH] Wallet:', normalizedWallet);

      const txs = await fetchTransactionsFromServer(normalizedWallet);

      console.log('[FETCH] Server returned', txs.length, 'transactions');

      const normalizedTxs = txs.map((tx: any) => ({
        ...tx,
        senderAddress: tx.senderAddress
          ? normalizeAddress(tx.senderAddress)
          : '0x0',
        recipientAddress: tx.recipientAddress
          ? normalizeAddress(tx.recipientAddress)
          : '0x0',
      }));

      setServerTransactions(normalizedTxs);

    } catch (err) {
      console.error('[useUnifiedTransactions]', err);
    } finally {
      setIsLoading(false);
    }
  }, [normalizedWallet]);

 const isReady = !!normalizedWallet && normalizedWallet !== '0x0';

useEffect(() => {
  if (!isReady) return;

  const timeout = setTimeout(() => {
    refetch();
  }, 200);

  return () => clearTimeout(timeout);
}, [isReady, refetch]);
 
  const unifiedTransactions = useMemo(() => {
  if (!normalizedWallet) return [];

  const map = new Map<string, any>();

  serverTransactions.forEach(tx => {
    if (tx.hash) {
      map.set(tx.hash, tx);
    }
  });

  localTransactions.forEach(tx => {
    if (!tx.hash) return;
    
    const sender = normalizeAddress(tx.senderAddress || '');
    const recipient = normalizeAddress(tx.recipientAddress || '');
    const isRelevant = sender === normalizedWallet || recipient === normalizedWallet;
    
    if (isRelevant) {
  map.set(tx.hash, tx); 
}
  });

  return Array.from(map.values())
    .map(tx => {
      const sender = normalizeAddress(tx.senderAddress || '');
      const recipient = normalizeAddress(tx.recipientAddress || '');
      
      if (!tx.senderAddress || !tx.recipientAddress) return tx;
      
      let direction: 'sent' | 'received' | 'unknown' = 'unknown';
      if (sender === normalizedWallet) {
        direction = 'sent';
      } else if (recipient === normalizedWallet) {
        direction = 'received';
      }
      
      return {
        ...tx,
        direction,
      };
    })
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}, [serverTransactions, localTransactions, normalizedWallet]);

  return {
    transactions: unifiedTransactions,
    refetch,
    isLoading,
  };
}