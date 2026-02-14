import type { ChallengeDefinition } from '../../types';

export const objectChallenges: ChallengeDefinition[] = [
  {
    id: 'obj-1',
    plantType: 'object',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Primeiro Objeto',
    description: 'Crie um objeto para representar uma planta.',
    instructions: `Crie um objeto chamado 'plant' com as seguintes propriedades:
- name: "Girassol"
- height: 50
- isWatered: true`,
    starterCode: `// Crie o objeto plant aqui
`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Girassol', height: 50, isWatered: true },
        description: 'plant deve ter as propriedades corretas',
      },
    ],
    hints: [
      'Use chaves para criar objetos: { }',
      'Propriedades sao pares chave: valor',
      'const plant = { name: "Girassol", height: 50, isWatered: true };',
    ],
    solution: `const plant = {
  name: "Girassol",
  height: 50,
  isWatered: true
};`,
    experienceReward: 25,
  },
  {
    id: 'obj-2',
    plantType: 'object',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Acessando Propriedades',
    description: 'Aprenda a acessar dados de objetos.',
    instructions: `Dado o objeto 'garden', crie uma variavel 'info' que contenha
uma string no formato: "{name} tem {plotCount} canteiros".

const garden = { name: "Meu Jardim", plotCount: 9, season: "Primavera" };`,
    starterCode: `const garden = { name: "Meu Jardim", plotCount: 9, season: "Primavera" };

// Crie a variavel info aqui
`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Meu Jardim tem 9 canteiros',
        description: 'info deve ser "Meu Jardim tem 9 canteiros"',
      },
    ],
    hints: [
      'Acesse propriedades com ponto: objeto.propriedade',
      'Use concatenacao ou template strings',
      'garden.name + " tem " + garden.plotCount + " canteiros"',
    ],
    solution: `const garden = { name: "Meu Jardim", plotCount: 9, season: "Primavera" };
const info = garden.name + " tem " + garden.plotCount + " canteiros";`,
    experienceReward: 25,
  },
  {
    id: 'obj-3',
    plantType: 'object',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Modificando Objetos',
    description: 'Aprenda a modificar propriedades de objetos.',
    instructions: `Dado o objeto 'seedBag', faca as seguintes modificacoes:
1. Aumente 'quantity' em 5
2. Mude 'isSelected' para true
3. Adicione uma nova propriedade 'lastUsed' com valor "hoje"

const seedBag = { type: "Girassol", quantity: 10, isSelected: false };`,
    starterCode: `const seedBag = { type: "Girassol", quantity: 10, isSelected: false };

// Modifique o objeto seedBag
`,
    testCases: [
      {
        input: null,
        expectedOutput: { type: 'Girassol', quantity: 15, isSelected: true, lastUsed: 'hoje' },
        description: 'seedBag deve ter as modificacoes corretas',
      },
    ],
    hints: [
      'Use objeto.propriedade = novoValor para modificar',
      'seedBag.quantity += 5;',
      'Novas propriedades sao adicionadas da mesma forma',
    ],
    solution: `const seedBag = { type: "Girassol", quantity: 10, isSelected: false };
seedBag.quantity += 5;
seedBag.isSelected = true;
seedBag.lastUsed = "hoje";`,
    experienceReward: 30,
  },
  {
    id: 'obj-4',
    plantType: 'object',
    difficulty: 4,
    difficultyTier: 'master',
    title: 'Objetos Aninhados',
    description: 'Trabalhe com objetos dentro de objetos.',
    instructions: `Crie um objeto 'plot' com a seguinte estrutura:
- id: 1
- plant: um objeto com { name: "Rosa", stage: "growing" }
- position: um objeto com { row: 0, col: 0 }`,
    starterCode: `// Crie o objeto plot aqui
`,
    testCases: [
      {
        input: null,
        expectedOutput: {
          id: 1,
          plant: { name: 'Rosa', stage: 'growing' },
          position: { row: 0, col: 0 },
        },
        description: 'plot deve ter a estrutura aninhada correta',
      },
    ],
    hints: [
      'Objetos podem conter outros objetos como valores',
      'plant: { name: "Rosa", stage: "growing" }',
      'Crie cada objeto aninhado dentro do objeto principal',
    ],
    solution: `const plot = {
  id: 1,
  plant: { name: "Rosa", stage: "growing" },
  position: { row: 0, col: 0 }
};`,
    experienceReward: 35,
  },
  {
    id: 'obj-5',
    plantType: 'object',
    difficulty: 4,
    difficultyTier: 'master',
    title: 'Metodos de Objeto',
    description: 'Adicione funcoes aos seus objetos.',
    instructions: `Crie um objeto 'wateringCan' com:
- capacity: 100
- current: 60
- pour: uma funcao que retorna a quantidade atual (current)
- refill: uma funcao que define current = capacity e retorna capacity

Depois de criar, chame wateringCan.refill() e armazene em 'result'.`,
    starterCode: `// Crie o objeto wateringCan com metodos
`,
    testCases: [
      {
        input: null,
        expectedOutput: 100,
        description: 'result deve ser 100 (apos refill)',
      },
    ],
    hints: [
      'Metodos sao funcoes dentro de objetos',
      'pour() { return this.current; }',
      'Use "this" para acessar propriedades do proprio objeto',
    ],
    solution: `const wateringCan = {
  capacity: 100,
  current: 60,
  pour() {
    return this.current;
  },
  refill() {
    this.current = this.capacity;
    return this.capacity;
  }
};
const result = wateringCan.refill();`,
    experienceReward: 40,
  },
];
