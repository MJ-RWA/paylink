import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Section from '../ui/Section';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <Section className="relative overflow-hidden pt-32 pb-48 md:pt-48 md:pb-64 text-center">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-4xl mx-auto space-y-15">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-xs font-black uppercase tracking-widest border border-teal-100 shadow-sm mx-auto">
          <Sparkles className="w-4 h-4" />
          <span>The Future of Payments</span>
        </div>
        
        <div className="space-y-8">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-gray-900 leading-none">
            Get paid with a <br /><span className="text-teal-600">simple link</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Create your PayLink in 60 seconds. No wallets. No crypto knowledge. Just a link to get paid instantly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to="/dashboard">
            <Button className="w-full sm:w-auto py-6 px-12 text-2xl shadow-teal-200">
              <span>Create my PayLink</span>
              <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/Demo">
          <Button variant="outline" className="w-full sm:w-auto py-6 px-12 text-2xl border-gray-100">
            View Demo
          </Button>
        </Link>
        </div>


        <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-400">
            <CheckCircle className="w-5 h-5 text-teal-500" />
            <span>No seed phrases</span>
          </div>
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-400">
            <CheckCircle className="w-5 h-5 text-teal-500" />
            <span>Google login</span>
          </div>
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-400">
            <CheckCircle className="w-5 h-5 text-teal-500" />
            <span>Starknet powered</span>
          </div>
        </div>
      </div>
    </Section>
  );
}