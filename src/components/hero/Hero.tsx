'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Gamepad2 } from 'lucide-react';
import ConnectButton from '@/components/ui/ConnectButton';
import PrimaryButton from '@/components/ui/PrimaryButton';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black pointer-events-none" />
      
      {/* Animated background glow */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-orange-600 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 h-screen flex items-center">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left side: Tagline & CTA */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            {/* Subtitle badge */}
            <motion.div
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs uppercase font-bold tracking-widest"
              whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.15)' }}
            >
              <Gamepad2 className="w-4 h-4" />
              Sphere Powered Gaming
            </motion.div>

            {/* Main tagline */}
            <motion.div className="flex flex-col gap-2">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-tight">
                Play.
              </h1>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black text-orange-500 leading-tight">
                Train.
              </h2>
              <h3 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-tight">
                Compete.
              </h3>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-zinc-300 max-w-xl leading-relaxed"
            >
              Challenge AI. Train your skills. Connect your Sphere Wallet. Stake. Win. Repeat.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <ConnectButton size="lg" showNametag={false} />
              <PrimaryButton
                size="lg"
                variant="secondary"
                icon={ArrowDown}
                iconPosition="right"
                ariaLabel="Scroll to explore available games"
              >
                Explore Games
              </PrimaryButton>
            </motion.div>
          </motion.div>

          {/* Right side: Game showcase */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-end"
          >
            <motion.div
              className="relative w-full max-w-md h-80 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-orange-600/30 via-purple-600/20 to-transparent backdrop-blur-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black" />

              {/* Game info overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                {/* Voxel Duel icon/text */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Gamepad2 className="w-16 h-16 text-orange-400" />
                </motion.div>

                {/* Game name */}
                <div className="text-center">
                  <h4 className="text-3xl font-black text-white mb-1">
                    Voxel Duel
                  </h4>
                  <p className="text-sm text-orange-400 font-semibold">
                    First Playable Game
                  </p>
                </div>
              </div>

              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <ArrowDown className="w-6 h-6 text-orange-500/50" />
      </motion.div>
    </section>
  );
};

export default Hero;