'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Gamepad2 } from 'lucide-react';
import ConnectButton from '@/components/ui/ConnectButton';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Games', href: '/games' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'About', href: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Navbar container */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500 group-hover:bg-orange-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gamepad2 className="w-6 h-6 text-black" />
              </motion.div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-black text-white">
                  Sphere<span className="text-orange-500">Arcade</span>
                </span>
                <span className="text-xs text-zinc-500 font-semibold tracking-widest">
                  PLAY • TRAIN • COMPETE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-zinc-300 hover:text-white font-semibold text-sm uppercase tracking-wider transition-colors group"
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-orange-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>

            {/* Connect Sphere Button - Now with actual wallet connection */}
            <div className="hidden sm:block">
              <ConnectButton size="md" showNametag={true} />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-4 border-t border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-zinc-300 hover:text-orange-500 font-semibold text-sm uppercase tracking-wider transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <ConnectButton size="md" showNametag={false} className="w-full" />
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;