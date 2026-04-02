import { CreditCard } from 'lucide-react';
import Button from '../ui/Button';

interface CardFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function CardForm({ onSubmit, onCancel }: CardFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
            <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500 font-medium"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <Button onClick={() => onSubmit({})}>
          Pay Securely
        </Button>
        <button
          onClick={onCancel}
          className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
