import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Garden, Plot, PlantInstance, GrowthStage } from '../types';

interface GardenState {
  garden: Garden;
  selectedPlotId: string | null;
  activeChallengeId: string | null;
  currentPlantId: string | null;

  selectPlot: (plotId: string | null) => void;
  plantSeed: (plotId: string, plantDefinitionId: string) => void;
  waterPlant: (plotId: string) => void;
  harvestPlant: (plotId: string) => PlantInstance | null;
  setActiveChallenge: (challengeId: string | null, plantId?: string | null) => void;
  expandGarden: () => void;
}

const calculateGrowthStage = (wateredCount: number, requiredWaterings: number): GrowthStage => {
  const progress = (wateredCount / requiredWaterings) * 100;
  if (progress === 0) return 'seed';
  if (progress < 33) return 'sprout';
  if (progress < 100) return 'growing';
  return 'mature';
};

const createInitialPlots = (size: number): Plot[] => {
  const plots: Plot[] = [];
  for (let i = 0; i < size; i++) {
    plots.push({
      id: `plot-${i}`,
      position: i,
      plant: null,
    });
  }
  return plots;
};

const initialGarden: Garden = {
  id: 'garden-1',
  size: 9,
  plots: createInitialPlots(9),
};

export const useGardenStore = create<GardenState>()(
  persist(
    (set, get) => ({
      garden: initialGarden,
      selectedPlotId: null,
      activeChallengeId: null,
      currentPlantId: null,

      selectPlot: (plotId: string | null) =>
        set({ selectedPlotId: plotId }),

      plantSeed: (plotId: string, plantDefinitionId: string) =>
        set((state) => {
          const plotIndex = state.garden.plots.findIndex((p) => p.id === plotId);
          if (plotIndex === -1) return state;

          const plot = state.garden.plots[plotIndex];
          if (plot.plant) return state;

          const newPlant: PlantInstance = {
            id: `plant-${Date.now()}`,
            plantDefinitionId,
            plantedAt: new Date(),
            wateredCount: 0,
            growthStage: 'seed',
            growthProgress: 0,
            isHarvestable: false,
          };

          const newPlots = [...state.garden.plots];
          newPlots[plotIndex] = { ...plot, plant: newPlant };

          return {
            garden: { ...state.garden, plots: newPlots },
            selectedPlotId: null,
          };
        }),

      waterPlant: (plotId: string) =>
        set((state) => {
          const plotIndex = state.garden.plots.findIndex((p) => p.id === plotId);
          if (plotIndex === -1) return state;

          const plot = state.garden.plots[plotIndex];
          if (!plot.plant) return state;

          const requiredWaterings = 3;
          const newWateredCount = plot.plant.wateredCount + 1;
          const newGrowthStage = calculateGrowthStage(newWateredCount, requiredWaterings);
          const newProgress = Math.min((newWateredCount / requiredWaterings) * 100, 100);
          const isHarvestable = newGrowthStage === 'mature';

          const updatedPlant: PlantInstance = {
            ...plot.plant,
            wateredCount: newWateredCount,
            growthStage: newGrowthStage,
            growthProgress: newProgress,
            isHarvestable,
          };

          const newPlots = [...state.garden.plots];
          newPlots[plotIndex] = { ...plot, plant: updatedPlant };

          return {
            garden: { ...state.garden, plots: newPlots },
          };
        }),

      harvestPlant: (plotId: string) => {
        const state = get();
        const plotIndex = state.garden.plots.findIndex((p) => p.id === plotId);
        if (plotIndex === -1) return null;

        const plot = state.garden.plots[plotIndex];
        if (!plot.plant || !plot.plant.isHarvestable) return null;

        const harvestedPlant = plot.plant;

        set((state) => {
          const newPlots = [...state.garden.plots];
          newPlots[plotIndex] = { ...plot, plant: null };

          return {
            garden: { ...state.garden, plots: newPlots },
          };
        });

        return harvestedPlant;
      },

      setActiveChallenge: (challengeId: string | null, plantId: string | null = null) =>
        set({ activeChallengeId: challengeId, currentPlantId: plantId }),

      expandGarden: () =>
        set((state) => {
          const newSize = state.garden.size + 6;
          const existingPlots = state.garden.plots;
          const newPlots: Plot[] = [];

          for (let i = state.garden.size; i < newSize; i++) {
            newPlots.push({
              id: `plot-${i}`,
              position: i,
              plant: null,
            });
          }

          return {
            garden: {
              ...state.garden,
              size: newSize,
              plots: [...existingPlots, ...newPlots],
            },
          };
        }),
    }),
    {
      name: 'syntax-gardens-garden',
    }
  )
);
