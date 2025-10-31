import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ 
  variant = 'primary', 
  href, 
  children, 
  className,
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-500",
    ghost: "border border-white/20 text-white hover:bg-white/10 focus:ring-white/50"
  };

  const classes = cn(baseClasses, variantClasses[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}