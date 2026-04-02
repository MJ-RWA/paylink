import { usePaymentStore } from '../../hooks/useStore';
import Button from '../ui/Button';
import { Check } from 'lucide-react';

export default function SettingsModal({ onConfirm }: { onConfirm: () => void }) {
  const { preferredAsset, setPreferredAsset } = usePaymentStore();
  
  const assets = [
    { id: 'USDC', name: 'USDC', description: 'Stablecoin pegged to USD' },
    { id: 'STRK', name: 'Starknet (STRK)', description: 'Native Starknet asset' },
    { id: 'ETH', name: 'Ethereum (ETH)', description: 'Ether on Starknet' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Choose which asset you'd like to receive by default when someone pays you.
        </p>
        
        <div className="space-y-2">
          {assets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => setPreferredAsset(asset.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                preferredAsset === asset.id 
                  ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500' 
                  : 'bg-gray-50 border-gray-100 hover:border-gray-200'
              }`}
            >
              <div>
                <div className="font-bold text-gray-900">{asset.name}</div>
                <div className="text-xs text-gray-400">{asset.description}</div>
              </div>
              {preferredAsset === asset.id && (
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={onConfirm}>
        Save Settings
      </Button>
    </div>
  );
}
