// Game difficulty levels
export type DifficultyLevel = 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';

// Badge types for game cards
export type BadgeVariant = 'featured' | 'beta' | 'new' | 'coming-soon' | 'hot';

// Game interface
export interface Game {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  players: string;
  reward: string;
  difficulty: DifficultyLevel;
  available: boolean;
  imageUrl?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

// Navigation item
export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}