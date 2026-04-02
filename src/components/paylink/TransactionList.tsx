import Card from '../ui/Card';

interface Transaction {
  id: number;
  sender: string;
  amount: number;
  date: string;
}

export default function TransactionList({ transactions, isAdvancedMode }: { transactions: Transaction[], isAdvancedMode: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="font-bold text-gray-900">Recent Activity</h3>
        <button className="text-xs text-teal-600 font-bold hover:underline">View All</button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id}>
            <Card padding="sm" className="flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                  {tx.sender[0]}
                </div>
                <div>
                  <div className="font-bold text-sm">{tx.sender}</div>
                  <div className="text-xs text-gray-400">{tx.date}</div>
                  {isAdvancedMode && (
                    <div className="text-[10px] text-teal-400 font-mono mt-0.5">
                      Hash: 0x7a2...f93
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">+${tx.amount.toFixed(2)}</div>
                {isAdvancedMode && (
                  <div className="text-[10px] text-gray-300">USDC</div>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
