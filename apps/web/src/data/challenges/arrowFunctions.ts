import type { ChallengeDefinition } from '../../types';

export const arrowFunctionsChallenges: ChallengeDefinition[] = [
  // Desafio 1: Implicit return simples
  {
    id: 'arrow-1',
    plantType: 'arrow-functions',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Arrow Function com Implicit Return',
    description: 'Arrow functions podem retornar valores implicitamente (sem a palavra return).',
    instructions: 'Crie uma arrow function `double` que recebe um número e retorna o dobro.',
    starterCode: `// Crie a arrow function com implicit return
const double = x => x * 2;

const result = double(5);
const output = `,
    testCases: [
      { input: null, expectedOutput: 10, description: 'double(5) deve retornar 10' }
    ],
    hints: [
      'x => expressão retorna automaticamente',
      'Não precisa de {} nem return',
      'const output = result;'
    ],
    solution: `const double = x => x * 2;

const result = double(5);
const output = result;`,
    experienceReward: 15,
  },
  // Desafio 2: Implicit return de objeto
  {
    id: 'arrow-2',
    plantType: 'arrow-functions',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Retornar Objeto com Arrow',
    description: 'Para retornar um objeto implicitamente, envolva-o em parênteses.',
    instructions: 'Crie uma arrow function `createPlant` que recebe nome e retorna um objeto { name, water: 50 }.',
    starterCode: `// Retorne um objeto com parênteses
const createPlant = name => ({ name, water: 50 });

const rose = createPlant('Rosa');
const result = `,
    testCases: [
      { input: null, expectedOutput: { name: 'Rosa', water: 50 }, description: 'Objeto criado corretamente' }
    ],
    hints: [
      'Use parênteses para retornar objeto: => ({ })',
      'Sem parênteses, {} seria o corpo da função',
      'const result = rose;'
    ],
    solution: `const createPlant = name => ({ name, water: 50 });

const rose = createPlant('Rosa');
const result = rose;`,
    experienceReward: 20,
  },
  // Desafio 3: Arrow function sem parâmetros
  {
    id: 'arrow-3',
    plantType: 'arrow-functions',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Arrow Sem Parâmetros',
    description: 'Quando não há parâmetros, use parênteses vazios.',
    instructions: 'Crie uma arrow function `getWelcome` que retorna "Bem-vindo ao jardim!".',
    starterCode: `// Arrow function sem parâmetros
const getWelcome = () => 'Bem-vindo ao jardim!';

const message = getWelcome();
const result = `,
    testCases: [
      { input: null, expectedOutput: 'Bem-vindo ao jardim!', description: 'Mensagem retornada' }
    ],
    hints: [
      '() => indica função sem parâmetros',
      'O retorno é implícito',
      'const result = message;'
    ],
    solution: `const getWelcome = () => 'Bem-vindo ao jardim!';

const message = getWelcome();
const result = message;`,
    experienceReward: 15,
  },
  // Desafio 4: Arrow function com um parâmetro
  {
    id: 'arrow-4',
    plantType: 'arrow-functions',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Arrow com Um Parâmetro',
    description: 'Com um único parâmetro, os parênteses são opcionais.',
    instructions: 'Crie uma arrow function `addWater` que adiciona 10 ao valor recebido.',
    starterCode: `// Parênteses são opcionais com um parâmetro
const addWater = water => water + 10;

const newLevel = addWater(40);
const result = `,
    testCases: [
      { input: null, expectedOutput: 50, description: 'Água adicionada corretamente' }
    ],
    hints: [
      'x => é o mesmo que (x) =>',
      'Parênteses são opcionais com um parâmetro',
      'const result = newLevel;'
    ],
    solution: `const addWater = water => water + 10;

const newLevel = addWater(40);
const result = newLevel;`,
    experienceReward: 15,
  },
  // Desafio 5: Arrow function com múltiplos parâmetros
  {
    id: 'arrow-5',
    plantType: 'arrow-functions',
    difficulty: 1,
    difficultyTier: 'beginner',
    title: 'Arrow com Múltiplos Parâmetros',
    description: 'Com múltiplos parâmetros, os parênteses são obrigatórios.',
    instructions: 'Crie uma arrow function `add` que soma dois números.',
    starterCode: `// Parênteses obrigatórios com múltiplos parâmetros
const add = (a, b) => a + b;

const sum = add(25, 30);
const result = `,
    testCases: [
      { input: null, expectedOutput: 55, description: 'Soma correta' }
    ],
    hints: [
      '(a, b) => precisa de parênteses',
      'A expressão após => é retornada',
      'const result = sum;'
    ],
    solution: `const add = (a, b) => a + b;

const sum = add(25, 30);
const result = sum;`,
    experienceReward: 15,
  },
  // Desafio 6: Arrow function em map
  {
    id: 'arrow-6',
    plantType: 'arrow-functions',
    difficulty: 2,
    difficultyTier: 'practitioner',
    title: 'Arrow em map()',
    description: 'Arrow functions são perfeitas para callbacks curtos.',
    instructions: 'Use map com arrow function para dobrar cada valor do array.',
    starterCode: `const waterLevels = [10, 20, 30, 40, 50];

// Dobre cada valor usando arrow function
const doubled = waterLevels.map(x => x * 2);

const result = `,
    testCases: [
      { input: null, expectedOutput: [20, 40, 60, 80, 100], description: 'Valores dobrados' }
    ],
    hints: [
      'map recebe uma função callback',
      'x => x * 2 dobra cada elemento',
      'const result = doubled;'
    ],
    solution: `const waterLevels = [10, 20, 30, 40, 50];

const doubled = waterLevels.map(x => x * 2);

const result = doubled;`,
    experienceReward: 20,
  },
  // Desafio 7: Arrow function em filter
  {
    id: 'arrow-7',
    plantType: 'arrow-functions',
    difficulty: 2,
    difficultyTier: 'practitioner',
    title: 'Arrow em filter()',
    description: 'Use arrow functions para filtrar elementos.',
    instructions: 'Filtre apenas plantas com water > 30 usando arrow function.',
    starterCode: `const plants = [
  { name: 'Rosa', water: 20 },
  { name: 'Tulipa', water: 50 },
  { name: 'Girassol', water: 35 },
  { name: 'Margarida', water: 25 }
];

// Filtre plantas com water > 30
const hydrated = plants.filter(p => p.water > 30);

const result = `,
    testCases: [
      { input: null, expectedOutput: [
        { name: 'Tulipa', water: 50 },
        { name: 'Girassol', water: 35 }
      ], description: 'Plantas filtradas corretamente' }
    ],
    hints: [
      'filter mantém elementos que retornam true',
      'p => p.water > 30 é a condição',
      'const result = hydrated;'
    ],
    solution: `const plants = [
  { name: 'Rosa', water: 20 },
  { name: 'Tulipa', water: 50 },
  { name: 'Girassol', water: 35 },
  { name: 'Margarida', water: 25 }
];

const hydrated = plants.filter(p => p.water > 30);

const result = hydrated;`,
    experienceReward: 20,
  },
  // Desafio 8: Arrow function em reduce
  {
    id: 'arrow-8',
    plantType: 'arrow-functions',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Arrow em reduce()',
    description: 'Arrow functions funcionam bem com reduce também.',
    instructions: 'Use reduce com arrow function para somar todos os valores.',
    starterCode: `const waterAmounts = [15, 25, 35, 25];

// Some todos os valores
const total = waterAmounts.reduce((acc, val) => acc + val, 0);

const result = `,
    testCases: [
      { input: null, expectedOutput: 100, description: 'Total correto' }
    ],
    hints: [
      'reduce acumula valores',
      '(acc, val) => acc + val soma ao acumulador',
      'const result = total;'
    ],
    solution: `const waterAmounts = [15, 25, 35, 25];

const total = waterAmounts.reduce((acc, val) => acc + val, 0);

const result = total;`,
    experienceReward: 25,
  },
  // Desafio 9: Arrow function em sort
  {
    id: 'arrow-9',
    plantType: 'arrow-functions',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Arrow em sort()',
    description: 'Use arrow functions para definir ordenação customizada.',
    instructions: 'Ordene as plantas por water (menor para maior) usando arrow function.',
    starterCode: `const plants = [
  { name: 'Rosa', water: 50 },
  { name: 'Tulipa', water: 20 },
  { name: 'Girassol', water: 80 },
  { name: 'Margarida', water: 35 }
];

// Ordene por water (crescente)
const sorted = [...plants].sort((a, b) => a.water - b.water);

const result = `,
    testCases: [
      { input: null, expectedOutput: [
        { name: 'Tulipa', water: 20 },
        { name: 'Margarida', water: 35 },
        { name: 'Rosa', water: 50 },
        { name: 'Girassol', water: 80 }
      ], description: 'Plantas ordenadas por água' }
    ],
    hints: [
      'sort((a, b) => a.prop - b.prop) ordena crescente',
      'Copie o array antes de sort',
      'const result = sorted;'
    ],
    solution: `const plants = [
  { name: 'Rosa', water: 50 },
  { name: 'Tulipa', water: 20 },
  { name: 'Girassol', water: 80 },
  { name: 'Margarida', water: 35 }
];

const sorted = [...plants].sort((a, b) => a.water - b.water);

const result = sorted;`,
    experienceReward: 25,
  },
  // Desafio 10: Arrow function como callback
  {
    id: 'arrow-10',
    plantType: 'arrow-functions',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Arrow como Callback',
    description: 'Arrow functions são ideais para callbacks inline.',
    instructions: 'Use setTimeout com arrow function para criar uma mensagem após delay simulado.',
    starterCode: `// Simule um callback (sem realmente esperar)
const getDelayedMessage = (callback) => {
  const message = 'Planta regada!';
  callback(message);
};

let receivedMessage = '';
getDelayedMessage(msg => {
  receivedMessage = msg;
});

const result = `,
    testCases: [
      { input: null, expectedOutput: 'Planta regada!', description: 'Callback executado' }
    ],
    hints: [
      'A arrow function recebe msg como parâmetro',
      'Ela atribui msg a receivedMessage',
      'const result = receivedMessage;'
    ],
    solution: `const getDelayedMessage = (callback) => {
  const message = 'Planta regada!';
  callback(message);
};

let receivedMessage = '';
getDelayedMessage(msg => {
  receivedMessage = msg;
});

const result = receivedMessage;`,
    experienceReward: 25,
  },
  // Desafio 11: This binding - comparar arrow vs function
  {
    id: 'arrow-11',
    plantType: 'arrow-functions',
    difficulty: 4,
    difficultyTier: 'master',
    title: 'This em Arrow Functions',
    description: 'Arrow functions não têm seu próprio "this" - usam o do escopo pai.',
    instructions: 'Observe a diferença entre arrow e function regular no contexto de this.',
    starterCode: `const garden = {
  name: 'Meu Jardim',
  plants: ['Rosa', 'Tulipa'],

  // Arrow function usa o this do escopo externo
  showPlantsArrow: function() {
    return this.plants.map(plant => this.name + ': ' + plant);
  }
};

const messages = garden.showPlantsArrow();
const result = `,
    testCases: [
      { input: null, expectedOutput: ['Meu Jardim: Rosa', 'Meu Jardim: Tulipa'], description: 'Arrow preserva this' }
    ],
    hints: [
      'Arrow function herda this do escopo pai',
      'Dentro de showPlantsArrow, this é garden',
      'const result = messages;'
    ],
    solution: `const garden = {
  name: 'Meu Jardim',
  plants: ['Rosa', 'Tulipa'],

  showPlantsArrow: function() {
    return this.plants.map(plant => this.name + ': ' + plant);
  }
};

const messages = garden.showPlantsArrow();
const result = messages;`,
    experienceReward: 30,
  },
  // Desafio 12: Arrow em métodos de objeto - quando NÃO usar
  {
    id: 'arrow-12',
    plantType: 'arrow-functions',
    difficulty: 4,
    difficultyTier: 'master',
    title: 'Quando NÃO Usar Arrow',
    description: 'Não use arrow functions como métodos de objeto se precisar de this.',
    instructions: 'Observe por que arrow function como método pode dar problema.',
    starterCode: `// Método correto com function regular
const plant = {
  name: 'Rosa',
  water: 50,

  // Use function regular para métodos
  getStatus: function() {
    return this.name + ' tem ' + this.water + 'ml de água';
  }
};

const status = plant.getStatus();
const result = `,
    testCases: [
      { input: null, expectedOutput: 'Rosa tem 50ml de água', description: 'Método funciona com this' }
    ],
    hints: [
      'Arrow function não teria o this correto',
      'Use function regular para métodos de objeto',
      'const result = status;'
    ],
    solution: `const plant = {
  name: 'Rosa',
  water: 50,

  getStatus: function() {
    return this.name + ' tem ' + this.water + 'ml de água';
  }
};

const status = plant.getStatus();
const result = status;`,
    experienceReward: 30,
  },
  // Desafio 13: Currying com arrows
  {
    id: 'arrow-13',
    plantType: 'arrow-functions',
    difficulty: 4,
    difficultyTier: 'master',
    title: 'Currying com Arrow Functions',
    description: 'Currying é quando uma função retorna outra função.',
    instructions: 'Crie uma função curried que multiplica dois números em duas chamadas.',
    starterCode: `// Currying: função retorna função
const multiply = x => y => x * y;

// Uso: multiply(2)(5) = 10
const double = multiply(2);
const triple = multiply(3);

const result1 = double(5);
const result2 = triple(5);

const result = `,
    testCases: [
      { input: null, expectedOutput: { result1: 10, result2: 15 }, description: 'Currying funciona' }
    ],
    hints: [
      'x => y => é uma função que retorna função',
      'multiply(2) retorna y => 2 * y',
      'const result = { result1, result2 };'
    ],
    solution: `const multiply = x => y => x * y;

const double = multiply(2);
const triple = multiply(3);

const result1 = double(5);
const result2 = triple(5);

const result = { result1, result2 };`,
    experienceReward: 30,
  },
  // Desafio 14: Higher-order function retornando arrow
  {
    id: 'arrow-14',
    plantType: 'arrow-functions',
    difficulty: 4,
    difficultyTier: 'master',
    title: 'Higher-Order Function',
    description: 'Funções que retornam outras funções são chamadas higher-order.',
    instructions: 'Crie uma função que gera filtros customizados para plantas.',
    starterCode: `// Factory de filtros
const createFilter = (minWater) => {
  return plant => plant.water >= minWater;
};

const plants = [
  { name: 'Rosa', water: 30 },
  { name: 'Tulipa', water: 50 },
  { name: 'Girassol', water: 70 }
];

const filterAbove40 = createFilter(40);
const filtered = plants.filter(filterAbove40);

const result = `,
    testCases: [
      { input: null, expectedOutput: [
        { name: 'Tulipa', water: 50 },
        { name: 'Girassol', water: 70 }
      ], description: 'Filtro customizado funciona' }
    ],
    hints: [
      'createFilter retorna uma função de filtro',
      'Essa função é usada no filter',
      'const result = filtered;'
    ],
    solution: `const createFilter = (minWater) => {
  return plant => plant.water >= minWater;
};

const plants = [
  { name: 'Rosa', water: 30 },
  { name: 'Tulipa', water: 50 },
  { name: 'Girassol', water: 70 }
];

const filterAbove40 = createFilter(40);
const filtered = plants.filter(filterAbove40);

const result = filtered;`,
    experienceReward: 30,
  },
  // Desafio 15: Desafio combinado - pipeline de transformações
  {
    id: 'arrow-15',
    plantType: 'arrow-functions',
    difficulty: 5,
    difficultyTier: 'master',
    title: 'Pipeline de Transformações',
    description: 'Combine múltiplas arrow functions para criar um pipeline de dados.',
    instructions: 'Crie um pipeline que filtra, transforma e reduz dados de plantas.',
    starterCode: `const plants = [
  { name: 'Rosa', water: 30, health: 80 },
  { name: 'Tulipa', water: 50, health: 60 },
  { name: 'Girassol', water: 70, health: 90 },
  { name: 'Margarida', water: 20, health: 40 }
];

// Pipeline: filtre saudáveis (health > 50), extraia nomes, junte com vírgula
const pipeline = plants
  .filter(p => p.health > 50)
  .map(p => p.name)
  .reduce((acc, name) => acc ? acc + ', ' + name : name, '');

const result = `,
    testCases: [
      { input: null, expectedOutput: 'Rosa, Tulipa, Girassol', description: 'Pipeline completo' }
    ],
    hints: [
      'filter -> map -> reduce em sequência',
      'Cada arrow function faz uma tarefa',
      'const result = pipeline;'
    ],
    solution: `const plants = [
  { name: 'Rosa', water: 30, health: 80 },
  { name: 'Tulipa', water: 50, health: 60 },
  { name: 'Girassol', water: 70, health: 90 },
  { name: 'Margarida', water: 20, health: 40 }
];

const pipeline = plants
  .filter(p => p.health > 50)
  .map(p => p.name)
  .reduce((acc, name) => acc ? acc + ', ' + name : name, '');

const result = pipeline;`,
    experienceReward: 35,
  },
];
