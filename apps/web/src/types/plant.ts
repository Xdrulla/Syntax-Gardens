export type PlantType = 'variable' | 'function' | 'loop' | 'object' | 'array' | 'async' | 'conditional' | 'string' | 'math' | 'array-methods' | 'destructuring' | 'spread-rest' | 'arrow-functions' | 'class' | 'closure' | 'error-handling';

export type PlantTier = 1 | 2 | 3 | 4 | 5;

export type GrowthStage = 'seed' | 'sprout' | 'growing' | 'mature';

export interface PlantSprites {
  seed: string;
  sprout: string;
  growing: string;
  mature: string;
}

export interface PlantUnlockRequirement {
  level?: number;
  season?: string;
  prerequisitePlants?: string[];
}

export interface PlantDefinition {
  id: string;
  type: PlantType;
  tier: PlantTier;
  name: string;
  displayName: string;
  description: string;
  sprite: string;
  growthStages: PlantSprites;
  growthTime: number;
  value: number;
  experienceGain: number;
  shopPrice: number;
  unlockRequirement?: PlantUnlockRequirement;
  challenges: string[];
}

export interface PlantInstance {
  id: string;
  plantDefinitionId: string;
  plantedAt: Date;
  wateredCount: number;
  growthStage: GrowthStage;
  growthProgress: number;
  isHarvestable: boolean;
}
