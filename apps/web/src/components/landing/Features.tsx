import { Chrome, Zap, DollarSign, Globe, ShieldCheck, Clock } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Navbar from '../ui/Navbar';

export default function Features() {
  const features = [
    {
      icon: <Chrome className="w-6 h-6 text-blue-500" />,
      title: "Google Login",
      description: "No seed phrases or private keys. Sign in with Google and we'll handle the rest."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Gasless Payments",
      description: "We handle all the network fees. Your users pay exactly what you ask for."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      title: "USDC Stable Payments",
      description: "Get paid in a stable currency pegged to the US Dollar. No volatility."
    },
    {
      icon: <Globe className="w-6 h-6 text-teal-500" />,
      title: "Works Globally",
      description: "Receive payments from anyone, anywhere in the world, instantly."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      title: "Secure by Design",
      description: "Powered by Starknet, ensuring your funds are always safe and verifiable."
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: "Instant Settlement",
      description: "No waiting for bank clearances. Your funds are available as soon as they're sent."
    }
  ];

  return (
    <>
    <Section id="features" className="pt-32 pb-48">
      <div className="text-center space-y-6 mb-24">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none">
          Built for the <span className="text-teal-600">modern web</span>
        </h2>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          All the power of blockchain, none of the complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index}>
            <Card className="group hover:border-teal-100 transition-all duration-300 h-full" padding="lg">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                  {feature.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-900">{feature.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Section>
    </>
  );
}