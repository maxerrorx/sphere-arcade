'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GameCard from '@/components/ui/GameCard';
import { Game } from '@/types';

const gamesData: Game[] = [
  {
    id: 'voxel-duel',
    title: 'Voxel Duel',
    subtitle: '1v1 Arena Fighter',
    description: 'Master combos, train against AI, and challenge other players in fast-paced voxel battles.',
    badge: 'Featured',
    badgeVariant: 'featured',
    players: '1 vs 1',
    reward: 'Stake Match',
    difficulty: 'Medium',
    available: true,
    gradientFrom: 'from-orange-600/30',
    gradientTo: 'to-purple-600/20',
  },
  {
    id: 'bus-rush',
    title: 'Bus Rush',
    subtitle: 'Competitive Driving',
    description: 'Race through challenging routes, avoid obstacles, and beat the AI to become the fastest driver.',
    badge: 'Beta',
    badgeVariant: 'beta',
    players: 'Single Player',
    reward: 'Training',
    difficulty: 'Hard',
    available: false,
    gradientFrom: 'from-blue-600/30',
    gradientTo: 'to-cyan-600/20',
  },
  {
    id: 'training-arena',
    title: 'Training Arena',
    subtitle: 'Practice Mode',
    description: 'Learn every game mechanic without pressure. Perfect for mastering movement, combat, and controls.',
    badge: 'New',
    badgeVariant: 'new',
    players: '--',
    reward: '--',
    difficulty: 'Beginner',
    available: true,
    gradientFrom: 'from-emerald-600/30',
    gradientTo: 'to-teal-600/20',
  },
  {
    id: 'boss-rush',
    title: 'Boss Rush',
    subtitle: 'Cooperative PvE',
    description: 'Face increasingly difficult AI bosses with unique attack patterns. Future multiplayer support included.',
    badge: 'Coming Soon',
    badgeVariant: 'coming-soon',
    players: '--',
    reward: '--',
    difficulty: 'Expert',
    available: false,
    gradientFrom: 'from-red-600/30',
    gradientTo: 'to-pink-600/20',
  },
  {
    id: 'arena-challenges',
    title: 'Arena Challenges',
    subtitle: 'Daily Missions',
    description: 'Complete daily and weekly challenges with unique objectives, speed runs, and special modifiers.',
    badge: 'Coming Soon',
    badgeVariant: 'coming-soon',
    players: '--',
    reward: '--',
    difficulty: 'Hard',
    available: false,
    gradientFrom: 'from-yellow-600/30',
    gradientTo: 'to-orange-600/20',
  },
  {
    id: 'community-games',
    title: 'Community Games',
    subtitle: 'Multiplayer Expansion',
    description: 'Community-created and officially developed mini-games integrated into the Sphere Arcade ecosystem.',
    badge: 'Coming Soon',
    badgeVariant: 'coming-soon',
    players: '--',
    reward: '--',
    difficulty: 'Varies',
    available: false,
    gradientFrom: 'from-violet-600/30',
    gradientTo: 'to-indigo-600/20',
  },
];

const FeaturedGames = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section label */}
          <motion.p
            variants={itemVariants}
            className="text-sm uppercase font-bold tracking-widest text-orange-500 mb-4"
          >
            Featured Games
          </motion.p>

          {/* Section title */}
          <motion.h2
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-black text-white mb-4"
          >
            Choose Your <span className="text-orange-500">Arena</span>
          </motion.h2>

          {/* Section description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Every game is built for competitive gameplay, AI training, and future Sphere wallet integration.
          </motion.p>
        </motion.div>

        {/* Games grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {gamesData.map((game) => (
            <motion.div key={game.id} variants={itemVariants}>
              <GameCard
                title={game.title}
                subtitle={game.subtitle}
                description={game.description}
                badge={game.badge}
                badgeVariant={game.badgeVariant}
                players={game.players}
                reward={game.reward}
                difficulty={game.difficulty}
                available={game.available}
                gradientFrom={game.gradientFrom}
                gradientTo={game.gradientTo}
                onPlay={() => {
                  console.log(`Playing ${game.title}`);
                  // Future: Navigate to game
                }}
                ariaLabel={`${game.title} game card - ${game.available ? 'available' : 'coming soon'}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedGames;