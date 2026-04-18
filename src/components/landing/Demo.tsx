import Section from '../ui/Section';
import PaymentCardMock from './PaymentCardMock';

export default function Demo() {
  return (
    <>
  
    <Section className="bg-white pt-32 pb-48 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 bg-teal-500/10 rounded-[40px] blur-2xl" />
          <div className="relative">
            <PaymentCardMock />
          </div>
        </div>

        <div className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none">
            Experience the <span className="text-teal-600">magic</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
            This is how your customers see your PayLink. No complex wallet connections, just a familiar Google login and instant payment.
          </p>
          <ul className="space-y-4 inline-block text-left">
            {[
              "Familiar Web2 login experience",
              "Instant transaction confirmation",
              "Zero network fees for customers",
              "Secure Starknet-powered settlement"
            ].map((item, i) => (
              <li key={i} className="flex items-center space-x-3 text-gray-600 font-bold">
                <div className="w-6 h-6 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                  <div className="w-2 h-2 bg-teal-600 rounded-full" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
    </>
  );
}