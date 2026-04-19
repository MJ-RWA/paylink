import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  message: string;
}

export default function Toast({ isVisible, message }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl border border-gray-800"
        >
          <div className="flex-shrink-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white stroke-[3px]" />
          </div>
          <p className="text-sm font-bold tracking-tight whitespace-nowrap">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}