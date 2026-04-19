import { ShieldCheck, ArrowRight, Wallet, Link } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function PaymentCardMock() {
  return (
    <Card className="max-w-sm mx-auto shadow-2xl relative overflow-hidden border-teal-100" padding="lg">
      <div className="absolute top-0 right-0 p-4">
        <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
          <Wallet className="w-5 h-5" />
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-bold text-teal-600 uppercase tracking-widest">Payment Request</p>
          <h3 className="text-2xl font-black text-gray-900">Pay @mekjah</h3>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-400">$</span>
            <input 
              type="text" 
              readOnly 
              value="50.00" 
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-6 pl-10 pr-4 text-3xl font-black text-gray-900 focus:outline-none"
            />
          </div>
          <p className="text-xs text-gray-400 font-medium text-center italic">
            "Thanks for the design work!"
          </p>
        </div>

        <div className="space-y-4">

          <Link to="/dashboard">
          <Button className="py-5 text-xl shadow-teal-200">
            <span>Pay with Google</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
          </Link>

          <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 uppercase font-black tracking-tighter">
            <ShieldCheck className="w-3 h-3" />
            <span>Secure • No wallet needed • Fast</span>
          </div>
        </div>
      </div>
    </Card>
  );
}