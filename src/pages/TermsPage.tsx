import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Section from '../components/ui/Section';

export default function TermsPage() {
  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to PayLink. By using our services, you agree to these terms. Please read them carefully. PayLink provides a platform for crypto payments powered by Starknet."
    },
    {
      title: "2. User Responsibilities",
      content: "You are responsible for maintaining the security of your Google account used to access PayLink. You must not use the service for any illegal activities or to facilitate fraudulent payments."
    },
    {
      title: "3. Payments Disclaimer",
      content: "PayLink facilitates payments in USDC and other supported assets. We are not responsible for the volatility of any assets or for any errors made by the user in entering payment amounts or recipient details."
    },
    {
      title: "4. Limitation of Liability",
      content: "PayLink is provided 'as is' without any warranties. We are not liable for any damages arising from the use of our service, including but not limited to loss of funds due to network failures or security breaches."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      
      <Section className="pt-24 pb-32">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-none">
              Terms of <span className="text-teal-600">Service</span>
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