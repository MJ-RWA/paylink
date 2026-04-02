import { CheckCircle } from 'lucide-react';

export default function ProfileHeader({ username }: { username: string }) {
  return (
    <div className="text-center py-12 space-y-4">
      <div className="relative inline-block">
        <div className="w-24 h-24 bg-teal-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-3xl font-bold">
          {username[0].toUpperCase()}
        </div>
        <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md">
          <CheckCircle className="w-5 h-5 text-teal-500 fill-teal-50" />
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-center space-x-1">
          <h1 className="text-2xl font-bold text-gray-900">@{username}</h1>
        </div>
        <p className="text-gray-500 max-w-xs mx-auto text-sm">
          Building the future of payments on Starknet. Send me a payment instantly.
        </p>
      </div>
    </div>
  );
}
