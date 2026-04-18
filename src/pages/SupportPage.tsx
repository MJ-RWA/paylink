import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { Mail, HelpCircle, MessageCircle } from 'lucide-react';

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I get paid?",
      answer: "Simply share your PayLink with anyone. They can pay you using their Google account, and the funds will be sent directly to your secure wallet."
    },
    {
      question: "Do I need crypto knowledge?",
      answer: "No. PayLink is designed to be as simple as any Web2 payment app. We handle all the blockchain complexity behind the scenes."
    },
    {
      question: "What if payment fails?",
      answer: "Payments are processed instantly on Starknet. If a payment fails, the funds remain in the sender's account, and you'll be notified of the error."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      
      <Section className="pt-24 pb-32">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-none">
              How can we <span className="text-teal-600">help?</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Find answers to common questions or get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center space-y-6 group hover:border-teal-100 transition-all" padding="lg">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto text-teal-600 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-gray-900">Email Us</h3>
                <p className="text-sm text-gray-500 font-medium">support@paylink.app</p>
              </div>
            </Card>
            <Card className="text-center space-y-6 group hover:border-teal-100 transition-all" padding="lg">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto text-purple-600 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-gray-900">FAQ Section</h3>
                <p className="text-sm text-gray-500 font-medium">Find quick answers</p>
              </div>
            </Card>
            <Card className="text-center space-y-6 group hover:border-teal-100 transition-all" padding="lg">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto text-blue-600 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-gray-900">Live Chat</h3>
                <p className="text-sm text-gray-500 font-medium">Coming soon</p>
              </div>
            </Card>
          </div>

          <div className="space-y-12">
            <h2 className="text-3xl font-black text-gray-900 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-4 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                  <h3 className="text-xl font-black text-gray-900">{faq.question}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}