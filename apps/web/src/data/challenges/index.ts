import { variableChallenges, getChallengeById as getVarChallenge } from './variables';
import { functionChallenges } from './functions';
import { loopChallenges } from './loops';
import { objectChallenges } from './objects';
import { arrayChallenges } from './arrays';
import { conditionalChallenges } from './conditionals';
import { stringChallenges } from './strings';
import { mathChallenges } from './math';
import { arrayMethodsChallenges } from './arrayMethods';
import { destructuringChallenges } from './destructuring';
import { spreadRestChallenges } from './spreadRest';
import { arrowFunctionsChallenges } from './arrowFunctions';
// Fase 2.3 - Conceitos Avancados
import { classesChallenges } from './classes';
import { asyncAwaitChallenges } from './asyncAwait';
import { closuresChallenges } from './closures';
import { errorHandlingChallenges } from './errorHandling';
// Fase 2.4 - Conceitos Expert
import { prototypeChallenges } from './prototypes';
import { generatorChallenges } from './generators';
import { proxyChallenges } from './proxies';
import { weakCollectionChallenges } from './weakCollections';
// Fase 2.5 - Desafios Combinados
import { crossConceptChallenges, getCrossConceptRequirements, CROSS_CONCEPT_REQUIREMENTS } from './crossConcept';
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
  ...arrayMethodsChallenges,
  ...destructuringChallenges,
  ...spreadRestChallenges,
  ...arrowFunctionsChallenges,
  // Fase 2.3 - Conceitos Avancados
  ...classesChallenges,
  ...asyncAwaitChallenges,
  ...closuresChallenges,
  ...errorHandlingChallenges,
  // Fase 2.4 - Conceitos Expert
  ...prototypeChallenges,
  ...generatorChallenges,
  ...proxyChallenges,
  ...weakCollectionChallenges,
  // Fase 2.5 - Desafios Combinados
  ...crossConceptChallenges,
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
  arrayMethodsChallenges,
  destructuringChallenges,
  spreadRestChallenges,
  arrowFunctionsChallenges,
  // Fase 2.3 - Conceitos Avancados
  classesChallenges,
  asyncAwaitChallenges,
  closuresChallenges,
  errorHandlingChallenges,
  // Fase 2.4 - Conceitos Expert
  prototypeChallenges,
  generatorChallenges,
  proxyChallenges,
  weakCollectionChallenges,
  // Fase 2.5 - Desafios Combinados
  crossConceptChallenges,
  getCrossConceptRequirements,
  CROSS_CONCEPT_REQUIREMENTS,
  getVarChallenge,
};
