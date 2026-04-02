import { CreditCard, Banknote } from 'lucide-react';

interface PaymentMethodSelectorProps {
  onSelect: (method: 'card' | 'bank') => void;
  onCancel: () => void;
}

export default function PaymentMethodSelector({ onSelect, onCancel }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-gray-900">Select Payment Method</h3>
        <p className="text-sm text-gray-500">Choose how you'd like to pay</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onSelect('card')}
          className="w-full flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-teal-500 transition-all text-left"
        >
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold">Pay with Card</div>
            <div className="text-xs text-gray-500">Visa, Mastercard, American Express</div>
          </div>
        </button>

        <button
          onClick={() => onSelect('bank')}
          className="w-full flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-teal-500 transition-all text-left"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold">Bank Transfer</div>
            <div className="text-xs text-gray-500">Instant transfer from your bank account</div>
          </div>
        </button>
      </div>

      <button
        onClick={onCancel}
        className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        Go back
      </button>
    </div>
  );
}
