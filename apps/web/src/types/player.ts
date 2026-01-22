export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface PlayerStats {
  totalPlantsHarvested: number;
  totalChallengesPassed: number;
  totalPlayTime: number;
  bestStreak: number;
  currentStreak: number;
  lastPlayedAt: Date;
  harvestedPlants: Record<string, number>;
}

export interface Player {
  id: string;
  username: string;
  level: number;
  experience: number;
  coins: number;
  currentDay: number;
  currentSeason: Season;
  stats: PlayerStats;
}

export interface Achievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}
