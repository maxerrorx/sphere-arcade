'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatBoxProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

const StatBox = ({
  icon: Icon,
  label,
  value,
  className = '',
}: StatBoxProps) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm ${className}`}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Icon */}
      <Icon className="w-5 h-5 text-orange-400 mb-1" aria-hidden="true" />

      {/* Label */}
      <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
        {label}
      </p>

      {/* Value */}
      <p className="text-lg font-bold text-white mt-1">
        {value}
      </p>
    </motion.div>
  );
};

export default StatBox;