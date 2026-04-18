import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Demo from '../components/landing/Demo';
import Features from '../components/landing/Features';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Demo />
      <Features />
      
      {/* Final CTA */}
      <Section className="bg-teal-600 text-white py-32 overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-700 rounded-full blur-3xl opacity-50" />
        
        <div className="text-center space-y-12 relative">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
            Ready to get <span className="text-teal-200">paid?</span>
          </h2>
          <p className="text-xl md:text-2xl text-teal-50 font-medium max-w-xl mx-auto leading-relaxed">
            Join thousands of creators and freelancers getting paid instantly with PayLink.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/dashboard">
              <Button className="w-full sm:w-auto py-6 px-12 text-2xl bg-white text-teal-600 hover:bg-teal-50 shadow-2xl shadow-teal-900/20">
                <span>Create my PayLink</span>
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}