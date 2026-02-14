import type { ChallengeDefinition } from '../../types';

export const variableChallenges: ChallengeDefinition[] = [
  {
    id: 'var-1',
    plantType: 'variable',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Primeira Variavel',
    description: 'Crie sua primeira variavel para regar a planta.',
    instructions: `Declare uma variavel chamada 'water' e atribua o valor 10 a ela.
Isso representa a quantidade de agua necessaria.

Dica: Use 'let' ou 'const' para declarar variaveis.`,
    starterCode: `// Declare a variavel 'water' aqui\n`,
    testCases: [
      {
        input: null,
        expectedOutput: 10,
        description: 'A variavel water deve ter valor 10',
      },
    ],
    hints: [
      'Use "let" ou "const" para declarar variaveis',
      'A sintaxe e: let nomeVariavel = valor;',
      'Exemplo: let water = 10;',
    ],
    solution: 'let water = 10;',
    experienceReward: 5,
  },
  {
    id: 'var-2',
    plantType: 'variable',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Calculando Crescimento',
    description: 'Use operadores para calcular quanto a planta cresceu.',
    instructions: `A planta comeca com altura 5cm.
A cada rega ela cresce 3cm.
Calcule a altura apos 2 regas e armazene em 'finalHeight'.`,
    starterCode: `let initialHeight = 5;
let growthPerWater = 3;
let timesWatered = 2;

// Calcule a altura final aqui
let finalHeight = `,
    testCases: [
      {
        input: null,
        expectedOutput: 11,
        description: 'finalHeight deve ser 11 (5 + 3*2)',
      },
    ],
    hints: [
      'Multiplique growthPerWater por timesWatered',
      'Depois some com initialHeight',
      'finalHeight = initialHeight + (growthPerWater * timesWatered)',
    ],
    solution: `let initialHeight = 5;
let growthPerWater = 3;
let timesWatered = 2;
let finalHeight = initialHeight + (growthPerWater * timesWatered);`,
    experienceReward: 10,
  },
  {
    id: 'var-3',
    plantType: 'variable',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Tipos de Dados',
    description: 'Aprenda sobre diferentes tipos de dados.',
    instructions: `Crie tres variaveis:
- 'plantName' com o valor "Rosa" (string)
- 'isWatered' com o valor true (boolean)
- 'waterAmount' com o valor 5.5 (number)`,
    starterCode: `// Crie as tres variaveis aqui
`,
    testCases: [
      {
        input: null,
        expectedOutput: { plantName: 'Rosa', isWatered: true, waterAmount: 5.5 },
        description: 'As tres variaveis devem ter os valores corretos',
      },
    ],
    hints: [
      'Strings sao textos entre aspas: "Rosa"',
      'Booleans sao true ou false',
      'Numbers podem ter decimais: 5.5',
    ],
    solution: `let plantName = "Rosa";
let isWatered = true;
let waterAmount = 5.5;`,
    experienceReward: 15,
  },
];

export const getChallengeById = (id: string): ChallengeDefinition | undefined => {
  return variableChallenges.find((challenge) => challenge.id === id);
};
