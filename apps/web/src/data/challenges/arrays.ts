import type { ChallengeDefinition } from '../../types';

export const arrayChallenges: ChallengeDefinition[] = [
  {
    id: 'arr-1',
    plantType: 'array',
    difficulty: 3,
    title: 'Primeiro Array',
    description: 'Crie um array para guardar suas plantas.',
    instructions: `Crie um array chamado 'plants' com os seguintes elementos:
"Rosa", "Girassol", "Tulipa"`,
    starterCode: `// Crie o array plants aqui
`,
    testCases: [
      {
        input: null,
        expectedOutput: ['Rosa', 'Girassol', 'Tulipa'],
        description: 'plants deve conter as tres plantas',
      },
    ],
    hints: [
      'Arrays usam colchetes: [ ]',
      'Elementos sao separados por virgula',
      'const plants = ["Rosa", "Girassol", "Tulipa"];',
    ],
    solution: `const plants = ["Rosa", "Girassol", "Tulipa"];`,
    experienceReward: 25,
  },
  {
    id: 'arr-2',
    plantType: 'array',
    difficulty: 3,
    title: 'Acessando Elementos',
    description: 'Aprenda a acessar elementos de um array.',
    instructions: `Dado o array de sementes, crie duas variaveis:
- 'first': primeiro elemento do array
- 'last': ultimo elemento do array

const seeds = ["Girassol", "Rosa", "Tulipa", "Margarida"];`,
    starterCode: `const seeds = ["Girassol", "Rosa", "Tulipa", "Margarida"];

// Crie first e last
`,
    testCases: [
      {
        input: null,
        expectedOutput: { first: 'Girassol', last: 'Margarida' },
        description: 'first deve ser "Girassol" e last deve ser "Margarida"',
      },
    ],
    hints: [
      'Indices comecam em 0: array[0] e o primeiro',
      'Use array.length - 1 para o ultimo indice',
      'seeds[seeds.length - 1] retorna o ultimo elemento',
    ],
    solution: `const seeds = ["Girassol", "Rosa", "Tulipa", "Margarida"];
const first = seeds[0];
const last = seeds[seeds.length - 1];`,
    experienceReward: 25,
  },
  {
    id: 'arr-3',
    plantType: 'array',
    difficulty: 3,
    title: 'Modificando Arrays',
    description: 'Aprenda a adicionar e remover elementos.',
    instructions: `Dado o array 'garden', faca as operacoes em ordem:
1. Adicione "Orquidea" no final
2. Remova o primeiro elemento
3. Armazene o array resultante em 'result'

const garden = ["Rosa", "Tulipa", "Girassol"];`,
    starterCode: `const garden = ["Rosa", "Tulipa", "Girassol"];

// Modifique o array e crie result
`,
    testCases: [
      {
        input: null,
        expectedOutput: ['Tulipa', 'Girassol', 'Orquidea'],
        description: 'result deve ser ["Tulipa", "Girassol", "Orquidea"]',
      },
    ],
    hints: [
      'Use push() para adicionar no final',
      'Use shift() para remover o primeiro',
      'garden.push("Orquidea"); garden.shift();',
    ],
    solution: `const garden = ["Rosa", "Tulipa", "Girassol"];
garden.push("Orquidea");
garden.shift();
const result = garden;`,
    experienceReward: 30,
  },
  {
    id: 'arr-4',
    plantType: 'array',
    difficulty: 4,
    title: 'Metodo Map',
    description: 'Transforme arrays com map.',
    instructions: `Dado um array de alturas de plantas em cm,
use map() para criar um novo array 'heightsInMeters'
com as alturas convertidas para metros (divida por 100).

const heightsCm = [150, 200, 75, 300];`,
    starterCode: `const heightsCm = [150, 200, 75, 300];

// Use map para criar heightsInMeters
`,
    testCases: [
      {
        input: null,
        expectedOutput: [1.5, 2, 0.75, 3],
        description: 'heightsInMeters deve ser [1.5, 2, 0.75, 3]',
      },
    ],
    hints: [
      'map() transforma cada elemento do array',
      'array.map((elemento) => transformacao)',
      'heightsCm.map((h) => h / 100)',
    ],
    solution: `const heightsCm = [150, 200, 75, 300];
const heightsInMeters = heightsCm.map((h) => h / 100);`,
    experienceReward: 35,
  },
  {
    id: 'arr-5',
    plantType: 'array',
    difficulty: 4,
    title: 'Metodo Filter',
    description: 'Filtre elementos de um array.',
    instructions: `Dado um array de objetos representando plantas,
use filter() para criar 'wateredPlants' contendo apenas
as plantas que ja foram regadas (isWatered: true).

const allPlants = [
  { name: "Rosa", isWatered: true },
  { name: "Tulipa", isWatered: false },
  { name: "Girassol", isWatered: true },
  { name: "Margarida", isWatered: false }
];`,
    starterCode: `const allPlants = [
  { name: "Rosa", isWatered: true },
  { name: "Tulipa", isWatered: false },
  { name: "Girassol", isWatered: true },
  { name: "Margarida", isWatered: false }
];

// Use filter para criar wateredPlants
`,
    testCases: [
      {
        input: null,
        expectedOutput: [
          { name: 'Rosa', isWatered: true },
          { name: 'Girassol', isWatered: true },
        ],
        description: 'wateredPlants deve conter apenas Rosa e Girassol',
      },
    ],
    hints: [
      'filter() retorna elementos que passam no teste',
      'array.filter((elemento) => condicao)',
      'allPlants.filter((plant) => plant.isWatered)',
    ],
    solution: `const allPlants = [
  { name: "Rosa", isWatered: true },
  { name: "Tulipa", isWatered: false },
  { name: "Girassol", isWatered: true },
  { name: "Margarida", isWatered: false }
];
const wateredPlants = allPlants.filter((plant) => plant.isWatered);`,
    experienceReward: 40,
  },
];
