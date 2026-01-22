import type { PlantDefinition } from '../../types';

export const seasonalPlants: PlantDefinition[] = [
  {
    id: 'spring-blossom',
    type: 'variable',
    tier: 2,
    name: 'Spring Blossom',
    displayName: 'Flor da Primavera',
    description: 'Uma flor delicada que so aparece na primavera. Cresce rapidamente nesta estacao.',
    sprite: '/sprites/plants/spring-blossom.png',
    growthStages: {
      seed: '/sprites/stages/spring-seed.png',
      sprout: '/sprites/stages/spring-sprout.png',
      growing: '/sprites/stages/spring-growing.png',
      mature: '/sprites/stages/spring-mature.png',
    },
    growthTime: 3,
    value: 35,
    experienceGain: 20,
    shopPrice: 25,
    unlockRequirement: {
      level: 3,
      season: 'spring',
    },
    challenges: ['var-1', 'var-2', 'var-3'],
  },
  {
    id: 'summer-sunflower',
    type: 'function',
    tier: 2,
    name: 'Summer Sunflower',
    displayName: 'Girassol de Verao',
    description: 'Um girassol vibrante que prospera no calor do verao. Da bonus de XP.',
    sprite: '/sprites/plants/summer-sunflower.png',
    growthStages: {
      seed: '/sprites/stages/summer-seed.png',
      sprout: '/sprites/stages/summer-sprout.png',
      growing: '/sprites/stages/summer-growing.png',
      mature: '/sprites/stages/summer-mature.png',
    },
    growthTime: 4,
    value: 40,
    experienceGain: 30,
    shopPrice: 30,
    unlockRequirement: {
      level: 3,
      season: 'summer',
    },
    challenges: ['func-1', 'func-2', 'func-3'],
  },
  {
    id: 'autumn-maple',
    type: 'loop',
    tier: 2,
    name: 'Autumn Maple',
    displayName: 'Bordo de Outono',
    description: 'Uma arvore com folhas douradas do outono. Produz muitas moedas.',
    sprite: '/sprites/plants/autumn-maple.png',
    growthStages: {
      seed: '/sprites/stages/autumn-seed.png',
      sprout: '/sprites/stages/autumn-sprout.png',
      growing: '/sprites/stages/autumn-growing.png',
      mature: '/sprites/stages/autumn-mature.png',
    },
    growthTime: 5,
    value: 60,
    experienceGain: 20,
    shopPrice: 35,
    unlockRequirement: {
      level: 4,
      season: 'autumn',
    },
    challenges: ['loop-1', 'loop-2', 'loop-3'],
  },
  {
    id: 'winter-frost',
    type: 'object',
    tier: 3,
    name: 'Winter Frost',
    displayName: 'Cristal de Inverno',
    description: 'Uma planta rara que so cresce no inverno. Recompensa muito XP.',
    sprite: '/sprites/plants/winter-frost.png',
    growthStages: {
      seed: '/sprites/stages/winter-seed.png',
      sprout: '/sprites/stages/winter-sprout.png',
      growing: '/sprites/stages/winter-growing.png',
      mature: '/sprites/stages/winter-mature.png',
    },
    growthTime: 6,
    value: 45,
    experienceGain: 50,
    shopPrice: 40,
    unlockRequirement: {
      level: 5,
      season: 'winter',
    },
    challenges: ['obj-1', 'obj-2', 'obj-3'],
  },
];

export const getSeasonalPlantById = (id: string): PlantDefinition | undefined => {
  return seasonalPlants.find((plant) => plant.id === id);
};

export const getPlantsBySeason = (season: string): PlantDefinition[] => {
  return seasonalPlants.filter(
    (plant) => plant.unlockRequirement?.season === season
  );
};
