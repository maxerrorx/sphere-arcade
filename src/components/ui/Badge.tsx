'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  label: string;
  variant?: 'featured' | 'beta' | 'new' | 'coming-soon' | 'hot';
  className?: string;
}

const Badge = ({
  label,
  variant = 'featured',
  className = '',
}: BadgeProps) => {
  const variantClasses = {
    featured: 'bg-orange-500 text-black',
    beta: 'bg-blue-600 text-white',
    new: 'bg-emerald-500 text-black',
    'coming-soon': 'bg-zinc-700 text-zinc-300',
    hot: 'bg-red-500 text-white',
  };

  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider';

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {label}
    </motion.div>
  );
};

export default Badge;