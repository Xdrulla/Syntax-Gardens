import type { ChallengeDefinition } from '../../types';

export const loopChallenges: ChallengeDefinition[] = [
  {
    id: 'loop-1',
    plantType: 'loop',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Primeiro Loop',
    description: 'Use um loop para regar varias plantas.',
    instructions: `Crie uma variavel 'total' iniciando em 0.
Use um loop 'for' para somar os numeros de 1 a 5 em 'total'.

Resultado esperado: total = 15 (1+2+3+4+5)`,
    starterCode: `let total = 0;

// Use um loop for para somar 1 a 5
`,
    testCases: [
      {
        input: null,
        expectedOutput: 15,
        description: 'total deve ser 15',
      },
    ],
    hints: [
      'for (let i = 1; i <= 5; i++) { ... }',
      'Dentro do loop, some i ao total',
      'total = total + i; ou total += i;',
    ],
    solution: `let total = 0;
for (let i = 1; i <= 5; i++) {
  total += i;
}`,
    experienceReward: 20,
  },
  {
    id: 'loop-2',
    plantType: 'loop',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Loop While',
    description: 'Aprenda outro tipo de loop.',
    instructions: `Crie uma variavel 'waterLevel' iniciando em 100.
Use um loop 'while' para subtrair 10 enquanto waterLevel for maior que 30.

Resultado esperado: waterLevel = 30`,
    starterCode: `let waterLevel = 100;

// Use um loop while para drenar ate 30
`,
    testCases: [
      {
        input: null,
        expectedOutput: 30,
        description: 'waterLevel deve ser 30',
      },
    ],
    hints: [
      'while (condicao) { ... }',
      'A condicao e: waterLevel > 30',
      'Dentro do loop: waterLevel -= 10;',
    ],
    solution: `let waterLevel = 100;
while (waterLevel > 30) {
  waterLevel -= 10;
}`,
    experienceReward: 20,
  },
  {
    id: 'loop-3',
    plantType: 'loop',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Contando Plantas',
    description: 'Use um loop para contar elementos.',
    instructions: `Dado um array de plantas, conte quantas estao prontas para colheita.
Uma planta esta pronta quando seu valor e true.

const plants = [true, false, true, true, false];
Crie 'readyCount' com o total de plantas prontas (true).`,
    starterCode: `const plants = [true, false, true, true, false];
let readyCount = 0;

// Conte as plantas prontas
`,
    testCases: [
      {
        input: null,
        expectedOutput: 3,
        description: 'readyCount deve ser 3',
      },
    ],
    hints: [
      'Use for (let i = 0; i < plants.length; i++)',
      'Verifique se plants[i] e true',
      'Se for true, incremente readyCount',
    ],
    solution: `const plants = [true, false, true, true, false];
let readyCount = 0;
for (let i = 0; i < plants.length; i++) {
  if (plants[i]) {
    readyCount++;
  }
}`,
    experienceReward: 25,
  },
  {
    id: 'loop-4',
    plantType: 'loop',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'For...of Loop',
    description: 'Aprenda a forma moderna de iterar arrays.',
    instructions: `Use o loop for...of para somar todos os numeros do array.

const waterAmounts = [10, 20, 15, 25];
Crie 'totalWater' com a soma de todos os valores.`,
    starterCode: `const waterAmounts = [10, 20, 15, 25];
let totalWater = 0;

// Use for...of para somar
`,
    testCases: [
      {
        input: null,
        expectedOutput: 70,
        description: 'totalWater deve ser 70',
      },
    ],
    hints: [
      'for (const item of array) { ... }',
      'O item representa cada valor do array',
      'totalWater += item;',
    ],
    solution: `const waterAmounts = [10, 20, 15, 25];
let totalWater = 0;
for (const amount of waterAmounts) {
  totalWater += amount;
}`,
    experienceReward: 25,
  },
  {
    id: 'loop-5',
    plantType: 'loop',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Loop Aninhado',
    description: 'Use loops dentro de loops.',
    instructions: `Voce tem um jardim 3x3 (3 linhas, 3 colunas).
Cada celula consome 2 unidades de agua.
Calcule o total de agua para regar todo o jardim.

Crie 'totalWater' usando dois loops aninhados.`,
    starterCode: `const rows = 3;
const cols = 3;
const waterPerCell = 2;
let totalWater = 0;

// Use loops aninhados para calcular
`,
    testCases: [
      {
        input: null,
        expectedOutput: 18,
        description: 'totalWater deve ser 18 (3x3x2)',
      },
    ],
    hints: [
      'Um loop externo para linhas: for (let r = 0; r < rows; r++)',
      'Um loop interno para colunas: for (let c = 0; c < cols; c++)',
      'Dentro do loop interno: totalWater += waterPerCell;',
    ],
    solution: `const rows = 3;
const cols = 3;
const waterPerCell = 2;
let totalWater = 0;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    totalWater += waterPerCell;
  }
}`,
    experienceReward: 30,
  },
];
