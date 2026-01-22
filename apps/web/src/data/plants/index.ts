export * from './basic';
export * from './seasonal';

import { basicPlants } from './basic';
import { seasonalPlants } from './seasonal';
import type { PlantDefinition } from '../../types';

export const allPlants: PlantDefinition[] = [...basicPlants, ...seasonalPlants];

export const getAnyPlantById = (id: string): PlantDefinition | undefined => {
  return allPlants.find((plant) => plant.id === id);
};
