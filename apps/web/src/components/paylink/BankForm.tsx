interface BankFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function BankForm({ onSubmit, onCancel }: BankFormProps) {
  const banks = [
    { name: 'Chase Bank', icon: '🏦' },
    { name: 'Bank of America', icon: '🏦' },
    { name: 'Wells Fargo', icon: '🏦' },
    { name: 'Citibank', icon: '🏦' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-gray-500 text-center">Select your bank to initiate a secure transfer.</p>
        <div className="grid grid-cols-1 gap-3">
          {banks.map((bank) => (
            <button
              key={bank.name}
              onClick={() => onSubmit({})}
              className="w-full flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-teal-500 transition-all text-left"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">
                {bank.icon}
              </div>
              <span className="font-bold text-gray-700">{bank.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={onCancel}
          className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
      <p className="text-[10px] text-gray-400 text-center">Processing may take a few minutes</p>
    </div>
  );
}
