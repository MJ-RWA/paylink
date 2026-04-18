import { Transaction } from '../../hooks/useStore';
import Card from '../ui/Card';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { normalizeAddress } from '../../lib/address';

interface TransactionListProps {
  transactions: Transaction[];
  isAdvancedMode: boolean;
  currentWalletAddress?: string | null;
}

export default function TransactionList({ 
  transactions, 
  isAdvancedMode, 
  currentWalletAddress 
}: TransactionListProps) {

  const normalizedWallet = currentWalletAddress
    ? normalizeAddress(currentWalletAddress)
    : null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="font-bold text-gray-900">Recent Activity</h3>
        <button className="text-xs text-teal-600 font-bold hover:underline">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">No transactions found yet.</p>
          </div>
        ) : (
          transactions.map((tx) => {
            const sender = tx.senderAddress
              ? normalizeAddress(tx.senderAddress)
              : null;

            const recipient = tx.recipientAddress
              ? normalizeAddress(tx.recipientAddress)
              : null;

          
            let direction: 'sent' | 'received' | 'unknown' = 'unknown';

            if (sender && normalizedWallet && sender === normalizedWallet) {
              direction = 'sent';
            } else if (recipient && normalizedWallet && recipient === normalizedWallet) {
              direction = 'received';
            }

            const isOutgoing = direction === 'sent';
            const isIncoming = direction === 'received';

    
            const amount = parseFloat(tx.amount || '0');
            const safeAmount = isNaN(amount) ? 0 : amount;

            return (
              <div key={tx.hash}>
                <Card padding="sm" className="flex items-center justify-between shadow-sm hover:shadow-md transition-shadow border-gray-100">
                  
                  {/* LEFT SIDE */}
                  <div className="flex items-center space-x-3">
                    
                    {/* ICON */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isOutgoing 
                        ? 'bg-amber-50 text-amber-600' 
                        : 'bg-teal-50 text-teal-600'
                    }`}>
                      {isOutgoing ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div>
                      {/* TITLE */}
                      <div className="font-bold text-sm text-gray-900">
                        {isOutgoing
                          ? 'Payment Sent'
                          : isIncoming
                          ? 'Payment Received'
                          : 'Transaction'}
                        
                        {tx.status === 'pending' && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-700 animate-pulse">
                            Pending
                          </span>
                        )}
                      </div>
                      
                      {/* TIME */}
                      <div className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(tx.timestamp || Date.now()).toLocaleString(undefined, { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      
                      {/* HASH (ADVANCED MODE) */}
                      {isAdvancedMode && (
                        <a 
                          href={`https://sepolia.voyager.online/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-teal-500 font-mono mt-1 hover:text-teal-700 flex items-center gap-1"
                        >
                          {tx.hash?.slice(0, 6)}...{tx.hash?.slice(-4)}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="text-right">
                    <div className={`font-bold text-sm ${
                      isOutgoing ? 'text-gray-900' : 'text-green-600'
                    }`}>
                      {isOutgoing ? '-' : '+'}${safeAmount.toFixed(2)}
                    </div>

                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      {tx.status === 'success' ? (
                        <CheckCircle2 className="w-3 h-3 text-teal-500" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-amber-500" />
                      )}
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">
                        {tx.symbol || 'USDC'}
                      </span>
                    </div>
                  </div>

                </Card>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}