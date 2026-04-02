interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currencySymbol?: string;
}

export default function AmountInput({ value, onChange, currencySymbol = '$' }: AmountInputProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">Enter amount</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 font-bold text-4xl">
          {currencySymbol}
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="w-full text-4xl font-bold p-4 pl-10 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-500 transition-all"
        />
      </div>
      <p className="text-xs text-gray-400 text-center">You will be charged in your local currency</p>
    </div>
  );
}
