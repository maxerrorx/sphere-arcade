'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  size = 'md',
  variant = 'primary',
  type = 'button',
  ariaLabel,
}: PrimaryButtonProps) => {
  // Size mapping for consistent scaling
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  // Variant styling
  const variantClasses = {
    primary: disabled
      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
      : 'bg-orange-500 text-black hover:bg-orange-400 shadow-lg hover:shadow-xl',
    secondary: disabled
      ? 'bg-transparent border border-zinc-600 text-zinc-500 cursor-not-allowed'
      : 'bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black hover:shadow-lg',
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-full font-bold transition-all';
  const finalClassName = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      type={type}
      className={finalClassName}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : { scale: 1 }}
      whileTap={!disabled ? { scale: 0.97 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Left icon */}
      {Icon && iconPosition === 'left' && (
        <Icon className="w-5 h-5" aria-hidden="true" />
      )}

      {/* Label */}
      <span>{children}</span>

      {/* Right icon */}
      {Icon && iconPosition === 'right' && (
        <Icon className="w-5 h-5" aria-hidden="true" />
      )}
    </motion.button>
  );
};

export default PrimaryButton;