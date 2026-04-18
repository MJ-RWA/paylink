import { usePaymentStore } from '../../hooks/useStore';
import { sepoliaTokens } from 'starkzap'; // Importing for consistent IDs
import Button from '../ui/Button';
import { Check } from 'lucide-react';

export default function SettingsModal({ onConfirm }: { onConfirm: () => void }) {
  const { preferredAsset, setPreferredAsset } = usePaymentStore();
  
  
   const assets = [
  { 
    id: 'USDC', 
    name: 'USDC', 
    description: 'Stablecoin pegged to USD',
    // Extract the string immediately
    displayAddress: sepoliaTokens.USDC.address 
  },
  { 
    id: 'STRK', 
    name: 'Starknet (STRK)', 
    description: 'Native Starknet asset for gas',
    displayAddress: sepoliaTokens.STRK.address 
  },
  { 
    id: 'ETH', 
    name: 'Ethereum (ETH)', 
    description: 'Ether on Starknet layer 2',
    displayAddress: sepoliaTokens.ETH.address 
  },
];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-900">Payment Asset</h3>
          <p className="text-sm text-gray-500">
            Choose which asset you'd like to receive by default.
          </p>
        </div>
        
        <div className="space-y-2">
          {assets.map((asset) => {
            const isSelected = preferredAsset === asset.id;
            
            return (
              <button
                key={asset.id}
                onClick={() => setPreferredAsset(asset.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${
                  isSelected 
                    ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500' 
                    : 'bg-gray-50 border-gray-100 hover:border-teal-200 hover:bg-white'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`font-bold ${isSelected ? 'text-teal-900' : 'text-gray-900'}`}>
                    {asset.name}
                  </span>
                  <span className="text-[11px] text-gray-400 leading-tight">
                    {asset.description}
                  </span>
                   {isSelected && (
                  <span className="text-[10px] text-teal-600 font-mono mt-1 opacity-70">
                  {asset.displayAddress.slice(0, 10)}...{asset.displayAddress.slice(-6)}
                  </span>
                   )}
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-teal-500 text-white' : 'bg-gray-200 text-transparent'
                }`}>
                  <Check className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Button 
        onClick={onConfirm}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-100"
      >
        Save Settings
      </Button>
    </div>
  );
}