import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PlantDefinition } from '../types';

export interface UnlockNotification {
  id: string;
  plantId: string;
  plantName: string;
  plantSprite: string;
  timestamp: Date;
}

interface UnlockState {
  unlockedPlants: string[];
  notifications: UnlockNotification[];

  checkAndUnlockPlants: (
    plants: PlantDefinition[],
    playerLevel: number,
    harvestedPlants: Record<string, number>
  ) => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
  isPlantUnlocked: (plantId: string) => boolean;
}

export const useUnlockStore = create<UnlockState>()(
  persist(
    (set, get) => ({
      unlockedPlants: ['var-seedling'],
      notifications: [],

      checkAndUnlockPlants: (
        plants: PlantDefinition[],
        playerLevel: number,
        harvestedPlants: Record<string, number> = {}
      ) => {
        const { unlockedPlants } = get();
        const newUnlocks: UnlockNotification[] = [];
        const safeHarvestedPlants = harvestedPlants || {};

        plants.forEach((plant) => {
          if (unlockedPlants.includes(plant.id)) return;

          const requirement = plant.unlockRequirement;
          if (!requirement) {
            if (!unlockedPlants.includes(plant.id)) {
              newUnlocks.push({
                id: `unlock-${plant.id}-${Date.now()}`,
                plantId: plant.id,
                plantName: plant.displayName,
                plantSprite: plant.sprite,
                timestamp: new Date(),
              });
            }
            return;
          }

          const levelMet = !requirement.level || playerLevel >= requirement.level;

          const prerequisitesMet = !requirement.prerequisitePlants ||
            requirement.prerequisitePlants.every(
              (prereqId) => (safeHarvestedPlants[prereqId] || 0) > 0
            );

          if (levelMet && prerequisitesMet) {
            newUnlocks.push({
              id: `unlock-${plant.id}-${Date.now()}`,
              plantId: plant.id,
              plantName: plant.displayName,
              plantSprite: plant.sprite,
              timestamp: new Date(),
            });
          }
        });

        if (newUnlocks.length > 0) {
          set((state) => ({
            unlockedPlants: [
              ...state.unlockedPlants,
              ...newUnlocks.map((n) => n.plantId),
            ],
            notifications: [...state.notifications, ...newUnlocks],
          }));
        }
      },

      dismissNotification: (id: string) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearAllNotifications: () =>
        set({ notifications: [] }),

      isPlantUnlocked: (plantId: string) => {
        return get().unlockedPlants.includes(plantId);
      },
    }),
    {
      name: 'syntax-gardens-unlocks',
    }
  )
);
