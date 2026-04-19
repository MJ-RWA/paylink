import { Link } from 'react-router-dom';
import { Wallet, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200 group-hover:bg-teal-700 transition-colors">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">PayLink</span>
          </Link>
          <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
            The simplest way to get paid in crypto. No wallets, no seed phrases, just a link.
          </p>
          <div className="flex items-center space-x-4">
          
            <a href="https://github.com/MJ-RWA/paylink" className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-teal-600 hover:border-teal-100 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:mekjahbassey@gmail.com" className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-teal-600 hover:border-teal-100 transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-gray-900">Product</h4>
          <ul className="space-y-4">
            <li><Link to="/features" className="text-sm font-semibold text-gray-500 hover:text-teal-600 transition-colors">Features</Link></li>
            <li><Link to="/how-it-works" className="text-sm font-semibold text-gray-500 hover:text-teal-600 transition-colors">How it works</Link></li>
            <li><Link to="/support" className="text-sm font-semibold text-gray-500 hover:text-teal-600 transition-colors">Support</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-gray-900">Legal</h4>
          <ul className="space-y-4">
            <li><Link to="/terms" className="text-sm font-semibold text-gray-500 hover:text-teal-600 transition-colors">Terms</Link></li>
            <li><Link to="/privacy" className="text-sm font-semibold text-gray-500 hover:text-teal-600 transition-colors">Privacy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100 text-gray-400 text-xs font-medium">
        <p>© 2026 PayLink. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Built on Starknet.</p>
      </div>
    </footer>
  );
}