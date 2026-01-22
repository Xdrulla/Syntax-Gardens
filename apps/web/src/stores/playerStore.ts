import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Player, Season } from '../types';

interface PlayerState {
  player: Player;
  addExperience: (amount: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  advanceDay: () => void;
  incrementHarvested: (plantId: string) => void;
  incrementChallengesPassed: () => void;
  getHarvestedCount: (plantId: string) => number;
  hasHarvestedPlant: (plantId: string) => boolean;
}

const EXPERIENCE_PER_LEVEL = 100;
const DAYS_PER_SEASON = 7;

const initialPlayer: Player = {
  id: 'player-1',
  username: 'Gardener',
  level: 1,
  experience: 0,
  coins: 100,
  currentDay: 1,
  currentSeason: 'spring',
  stats: {
    totalPlantsHarvested: 0,
    totalChallengesPassed: 0,
    totalPlayTime: 0,
    bestStreak: 0,
    currentStreak: 0,
    lastPlayedAt: new Date(),
    harvestedPlants: {},
  },
};

const getNextSeason = (current: Season): Season => {
  const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
  const currentIndex = seasons.indexOf(current);
  return seasons[(currentIndex + 1) % seasons.length];
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      player: initialPlayer,

      addExperience: (amount: number) =>
        set((state) => {
          const newExperience = state.player.experience + amount;
          const levelsGained = Math.floor(newExperience / EXPERIENCE_PER_LEVEL);
          const remainingExperience = newExperience % EXPERIENCE_PER_LEVEL;

          return {
            player: {
              ...state.player,
              experience: remainingExperience,
              level: state.player.level + levelsGained,
            },
          };
        }),

      addCoins: (amount: number) =>
        set((state) => ({
          player: {
            ...state.player,
            coins: state.player.coins + amount,
          },
        })),

      spendCoins: (amount: number) => {
        let success = false;
        set((state) => {
          if (state.player.coins >= amount) {
            success = true;
            return {
              player: {
                ...state.player,
                coins: state.player.coins - amount,
              },
            };
          }
          return state;
        });
        return success;
      },

      advanceDay: () =>
        set((state) => {
          const newDay = state.player.currentDay + 1;
          const seasonComplete = newDay > DAYS_PER_SEASON;
          const newSeason = seasonComplete
            ? getNextSeason(state.player.currentSeason)
            : state.player.currentSeason;

          if (seasonComplete) {
            import('./seasonStore').then(({ useSeasonStore }) => {
              useSeasonStore.getState().triggerSeasonChange(newSeason);
            });
          }

          return {
            player: {
              ...state.player,
              currentDay: seasonComplete ? 1 : newDay,
              currentSeason: newSeason,
            },
          };
        }),

      incrementHarvested: (plantId: string) =>
        set((state) => {
          const currentCount = state.player.stats.harvestedPlants[plantId] || 0;
          return {
            player: {
              ...state.player,
              stats: {
                ...state.player.stats,
                totalPlantsHarvested: state.player.stats.totalPlantsHarvested + 1,
                harvestedPlants: {
                  ...state.player.stats.harvestedPlants,
                  [plantId]: currentCount + 1,
                },
              },
            },
          };
        }),

      incrementChallengesPassed: () =>
        set((state) => ({
          player: {
            ...state.player,
            stats: {
              ...state.player.stats,
              totalChallengesPassed: state.player.stats.totalChallengesPassed + 1,
            },
          },
        })),

      getHarvestedCount: (plantId: string) => {
        return get().player.stats.harvestedPlants[plantId] || 0;
      },

      hasHarvestedPlant: (plantId: string) => {
        return (get().player.stats.harvestedPlants[plantId] || 0) > 0;
      },
    }),
    {
      name: 'syntax-gardens-player',
    }
  )
);
