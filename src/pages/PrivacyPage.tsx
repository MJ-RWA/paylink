import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Section from '../components/ui/Section';

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. What data we collect",
      content: "We collect your Google login information to facilitate authentication. We also store your Starknet wallet address to manage your payments and balances."
    },
    {
      title: "2. How data is used",
      content: "Your data is used solely to provide the PayLink service. We use your Google account to verify your identity and your wallet address to process transactions."
    },
    {
      title: "3. No selling of data",
      content: "We do not sell your personal data to third parties. Your privacy is our priority, and we only share data when necessary to provide the service or as required by law."
    },
    {
      title: "4. Contact info",
      content: "If you have any questions about your privacy or data, please contact us at privacy@paylink.app."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      
      <Section className="pt-24 pb-32">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-none">
              Privacy <span className="text-teal-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Last updated: April 7, 2026
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl font-black text-gray-900">{section.title}</h2>
                <p className="text-gray-500 font-medium leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}