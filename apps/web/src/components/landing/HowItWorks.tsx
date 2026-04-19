import { Link2, Share2, Wallet } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Link2 className="w-8 h-8 text-teal-600" />,
      title: "Create your link",
      description: "Sign in with Google and claim your unique PayLink. No complex setup required."
    },
    {
      icon: <Share2 className="w-8 h-8 text-purple-600" />,
      title: "Share it anywhere",
      description: "Paste your link in your bio, send it via DM, or add it to your invoices."
    },
    {
      icon: <Wallet className="w-8 h-8 text-blue-600" />,
      title: "Get paid instantly",
      description: "Receive USDC directly into your secure wallet. Withdraw to your bank anytime."
    }
  ];

  return (
    <>
  
    <Section id="how-it-works" className="bg-gray-50 pt-32 pb-48">
      <div className="text-center space-y-6 mb-24">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none">
          Simple as <span className="text-teal-600">1, 2, 3</span>
        </h2>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          We've removed all the friction from crypto payments. No wallets, no seed phrases, just a simple link.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index}>
            <Card className="relative group hover:border-teal-100 transition-all duration-300 h-full" padding="lg">
              <div className="absolute top-0 right-0 p-8 text-6xl font-black text-gray-50 group-hover:text-teal-50 transition-colors">
                0{index + 1}
              </div>
              <div className="space-y-6 relative">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{step.description}</p>
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