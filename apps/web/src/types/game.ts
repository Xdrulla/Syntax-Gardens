import type { PlantInstance } from './plant';

export interface Plot {
  id: string;
  position: number;
  plant: PlantInstance | null;
}

export interface Garden {
  id: string;
  size: number;
  plots: Plot[];
}

export interface InventoryItem {
  id: string;
  itemType: 'seed' | 'tool' | 'decoration';
  itemId: string;
  quantity: number;
}

export interface GameState {
  garden: Garden;
  inventory: InventoryItem[];
  selectedPlotId: string | null;
  selectedSeedId: string | null;
  isPlanting: boolean;
  activeChallengeId: string | null;
}
