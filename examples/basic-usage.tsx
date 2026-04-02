import PaymentCard from '../src/components/paylink/PaymentCard';
import ProfileHeader from '../src/components/paylink/ProfileHeader';
import Card from '../src/components/ui/Card';

/**
 * Basic Usage Example
 * This demonstrates how to integrate the PayLink components into your own page.
 */
export default function BasicUsageExample() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        {/* 1. Profile Header */}
        <ProfileHeader username="mekjah" />

        {/* 2. Main Payment Card */}
        <PaymentCard />

        {/* 3. Custom Content in a Card */}
        <Card className="text-center">
          <h3 className="font-bold text-gray-900">Support this creator</h3>
          <p className="text-sm text-gray-500 mt-2">
            Your contributions help us build more open-source tools for the Starknet ecosystem.
          </p>
        </Card>
      </div>
    </div>
  );
}
