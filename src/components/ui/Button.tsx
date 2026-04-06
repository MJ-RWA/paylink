import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  onClick,
  isLoading,
  disabled,
  children,
  variant = 'primary',
  className,
  type = 'button'
}: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700',
    secondary: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
    outline: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'w-full py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-200',
        variants[variant],
        (disabled || isLoading) && 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none hover:bg-gray-200',
        className
      )}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
}