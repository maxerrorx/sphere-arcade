'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Gamepad2 } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import Badge from './Badge';
import StatBox from './StatBox';

interface GameCardProps {
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  badgeVariant?: 'featured' | 'beta' | 'new' | 'coming-soon' | 'hot';
  players: string;
  reward: string;
  difficulty: string;
  available: boolean;
  imageUrl?: string;
  gradientFrom?: string;
  gradientTo?: string;
  onPlay?: () => void;
  ariaLabel?: string;
}

const GameCard = ({
  title,
  subtitle,
  description,
  badge,
  badgeVariant = 'featured',
  players,
  reward,
  difficulty,
  available,
  imageUrl,
  gradientFrom = 'from-orange-600/30',
  gradientTo = 'to-purple-600/20',
  onPlay,
  ariaLabel,
}: GameCardProps) => {
  const handlePlayClick = () => {
    if (available && onPlay) {
      onPlay();
    }
  };

  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
    >
      {/* Glow background (behind card) */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${gradientFrom} ${gradientTo} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        aria-hidden="true"
      />

      {/* Main card */}
      <div
        className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-black/80 backdrop-blur-xl p-6 flex flex-col overflow-hidden"
        role="article"
        aria-label={ariaLabel || `${title} game card`}
      >
        {/* Top section: Image area + Badge */}
        <div className="relative mb-4 -mx-6 -mt-6 h-48 bg-gradient-to-b from-zinc-800 to-transparent overflow-hidden">
          {/* Background gradient if no image */}
          {!imageUrl && (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
              aria-hidden="true"
            />
          )}

          {/* Image */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Badge overlay */}
          {badge && (
            <div className="absolute top-4 right-4">
              <Badge label={badge} variant={badgeVariant} />
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-2xl font-black text-white mb-1">
            {title}
          </h3>
          <p className="text-orange-400 font-semibold text-sm">
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-zinc-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <StatBox
            icon={Users}
            label="Players"
            value={players}
          />
          <StatBox
            icon={Zap}
            label="Reward"
            value={reward}
          />
          <StatBox
            icon={Gamepad2}
            label="Difficulty"
            value={difficulty}
          />
        </div>

        {/* Action button */}
        <div className="mt-auto">
          <PrimaryButton
            onClick={handlePlayClick}
            disabled={!available}
            size="md"
            className="w-full"
            ariaLabel={`Play ${title}`}
          >
            {available ? 'Play Now' : 'Coming Soon'}
          </PrimaryButton>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;