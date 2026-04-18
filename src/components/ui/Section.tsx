import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export default function Section({ children, className, containerClassName, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24 px-6', className)}>
      <div className={cn('max-w-7xl mx-auto', containerClassName)}>
        {children}
      </div>
    </section>
  );
}