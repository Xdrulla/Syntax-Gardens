import { variableChallenges, getChallengeById as getVarChallenge } from './variables';
import { functionChallenges } from './functions';
import { loopChallenges } from './loops';
import { objectChallenges } from './objects';
import { arrayChallenges } from './arrays';
import { conditionalChallenges } from './conditionals';
import { stringChallenges } from './strings';
import { mathChallenges } from './math';
import type { ChallengeDefinition } from '../../types';

export const allChallenges: ChallengeDefinition[] = [
  ...variableChallenges,
  ...functionChallenges,
  ...loopChallenges,
  ...objectChallenges,
  ...arrayChallenges,
  ...conditionalChallenges,
  ...stringChallenges,
  ...mathChallenges,
];

export const getChallengeById = (id: string): ChallengeDefinition | undefined => {
  return allChallenges.find((c) => c.id === id);
};

export const getChallengesByPlantType = (plantType: string): ChallengeDefinition[] => {
  return allChallenges.filter((c) => c.plantType === plantType);
};

export {
  variableChallenges,
  functionChallenges,
  loopChallenges,
  objectChallenges,
  arrayChallenges,
  conditionalChallenges,
  stringChallenges,
  mathChallenges,
  getVarChallenge,
};
