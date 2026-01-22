import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Season } from '../types';

export interface SeasonalEvent {
  id: string;
  name: string;
  description: string;
  season: Season;
  bonusType: 'xp' | 'coins' | 'growth';
  bonusMultiplier: number;
  icon: string;
}

export interface SeasonBonus {
  xpMultiplier: number;
  coinsMultiplier: number;
  growthSpeedBonus: number;
  specialPlantIds: string[];
}

interface SeasonState {
  activeEvent: SeasonalEvent | null;
  seasonTransitioning: boolean;
  lastSeasonChange: Date | null;

  getSeasonBonus: (season: Season) => SeasonBonus;
  triggerSeasonChange: (newSeason: Season) => void;
  clearTransition: () => void;
  setActiveEvent: (event: SeasonalEvent | null) => void;
  rollForSeasonalEvent: (season: Season) => void;
}

const SEASON_BONUSES: Record<Season, SeasonBonus> = {
  spring: {
    xpMultiplier: 1.0,
    coinsMultiplier: 1.0,
    growthSpeedBonus: 0.2,
    specialPlantIds: ['spring-blossom'],
  },
  summer: {
    xpMultiplier: 1.25,
    coinsMultiplier: 1.0,
    growthSpeedBonus: 0,
    specialPlantIds: ['summer-sunflower'],
  },
  autumn: {
    xpMultiplier: 1.0,
    coinsMultiplier: 1.5,
    growthSpeedBonus: 0,
    specialPlantIds: ['autumn-maple'],
  },
  winter: {
    xpMultiplier: 1.5,
    coinsMultiplier: 1.0,
    growthSpeedBonus: -0.25,
    specialPlantIds: ['winter-frost'],
  },
};

const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: 'spring-bloom',
    name: 'Festival das Flores',
    description: 'As plantas crescem 50% mais rapido!',
    season: 'spring',
    bonusType: 'growth',
    bonusMultiplier: 1.5,
    icon: '🌸',
  },
  {
    id: 'summer-harvest',
    name: 'Colheita de Verao',
    description: 'Ganhe 75% mais XP nas colheitas!',
    season: 'summer',
    bonusType: 'xp',
    bonusMultiplier: 1.75,
    icon: '☀️',
  },
  {
    id: 'autumn-fortune',
    name: 'Fortuna do Outono',
    description: 'Ganhe o dobro de moedas!',
    season: 'autumn',
    bonusType: 'coins',
    bonusMultiplier: 2.0,
    icon: '🍂',
  },
  {
    id: 'winter-wisdom',
    name: 'Sabedoria de Inverno',
    description: 'Desafios dao o dobro de XP!',
    season: 'winter',
    bonusType: 'xp',
    bonusMultiplier: 2.0,
    icon: '❄️',
  },
];

export const useSeasonStore = create<SeasonState>()(
  persist(
    (set, get) => ({
      activeEvent: null,
      seasonTransitioning: false,
      lastSeasonChange: null,

      getSeasonBonus: (season: Season) => {
        return SEASON_BONUSES[season];
      },

      triggerSeasonChange: (newSeason: Season) => {
        set({
          seasonTransitioning: true,
          lastSeasonChange: new Date(),
        });

        get().rollForSeasonalEvent(newSeason);
      },

      clearTransition: () => {
        set({ seasonTransitioning: false });
      },

      setActiveEvent: (event: SeasonalEvent | null) => {
        set({ activeEvent: event });
      },

      rollForSeasonalEvent: (season: Season) => {
        const eventChance = 0.3;
        if (Math.random() < eventChance) {
          const seasonEvents = SEASONAL_EVENTS.filter((e) => e.season === season);
          if (seasonEvents.length > 0) {
            const randomEvent = seasonEvents[Math.floor(Math.random() * seasonEvents.length)];
            set({ activeEvent: randomEvent });
          }
        } else {
          set({ activeEvent: null });
        }
      },
    }),
    {
      name: 'syntax-gardens-season',
    }
  )
);

export { SEASON_BONUSES, SEASONAL_EVENTS };
