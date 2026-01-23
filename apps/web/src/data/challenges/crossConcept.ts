import type { ChallengeDefinition } from '../../types';

// Desafios combinados que misturam múltiplos conceitos
// Recompensas 2x maiores (XP e moedas)
// Desbloqueiam após dominar conceitos individuais

export const crossConceptChallenges: ChallengeDefinition[] = [
  // Tier 1: Básico (requer 2 conceitos básicos)
  {
    id: 'cross-1',
    plantType: 'cross-concept',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Validador de Dados',
    description: 'Combine variáveis, condicionais e strings para criar um validador de dados de planta.',
    instructions: `Crie uma função 'validatePlant' que recebe um objeto com 'name' e 'water'.
Retorne:
- "Válido" se name não estiver vazio E water > 0
- "Nome inválido" se name estiver vazio
- "Água insuficiente" se water <= 0

Exemplo:
validatePlant({ name: "Rosa", water: 5 }) → "Válido"
validatePlant({ name: "", water: 5 }) → "Nome inválido"
validatePlant({ name: "Rosa", water: 0 }) → "Água insuficiente"`,
    starterCode: `function validatePlant(plant) {
  // Seu código aqui
}`,
    testCases: [
      { input: [{ name: 'Rosa', water: 5 }], expectedOutput: 'Válido', description: 'Planta válida' },
      { input: [{ name: '', water: 5 }], expectedOutput: 'Nome inválido', description: 'Nome vazio' },
      { input: [{ name: 'Rosa', water: 0 }], expectedOutput: 'Água insuficiente', description: 'Sem água' },
      { input: [{ name: 'Tulipa', water: 10 }], expectedOutput: 'Válido', description: 'Outra planta válida' },
    ],
    hints: [
      'Primeiro verifique se o name está vazio com !plant.name ou plant.name === ""',
      'Use if/else if/else para retornar a mensagem correta',
      'Lembre-se de verificar water <= 0 para água insuficiente',
    ],
    solution: `function validatePlant(plant) {
  if (!plant.name || plant.name === '') {
    return 'Nome inválido';
  }
  if (plant.water <= 0) {
    return 'Água insuficiente';
  }
  return 'Válido';
}`,
    experienceReward: 30, // 2x do normal
  },
  {
    id: 'cross-2',
    plantType: 'cross-concept',
    difficulty: 2,
    difficultyTier: 'beginner',
    title: 'Calculadora de Crescimento',
    description: 'Combine loops, arrays e matemática para calcular estatísticas de crescimento.',
    instructions: `Crie uma função 'growthStats' que recebe um array de números (taxas de crescimento diárias).
Retorne um objeto com:
- total: soma de todos os valores
- average: média arredondada para baixo (Math.floor)
- days: quantidade de dias

Exemplo:
growthStats([5, 10, 15]) → { total: 30, average: 10, days: 3 }`,
    starterCode: `function growthStats(rates) {
  // Seu código aqui
}`,
    testCases: [
      { input: [[5, 10, 15]], expectedOutput: { total: 30, average: 10, days: 3 }, description: 'Array básico' },
      { input: [[2, 4, 6, 8]], expectedOutput: { total: 20, average: 5, days: 4 }, description: '4 dias' },
      { input: [[7]], expectedOutput: { total: 7, average: 7, days: 1 }, description: 'Um dia' },
      { input: [[3, 5, 7, 9, 11]], expectedOutput: { total: 35, average: 7, days: 5 }, description: '5 dias' },
    ],
    hints: [
      'Use um loop for para somar todos os valores',
      'A média é total dividido pela quantidade de elementos',
      'Use Math.floor() para arredondar para baixo',
    ],
    solution: `function growthStats(rates) {
  let total = 0;
  for (let i = 0; i < rates.length; i++) {
    total += rates[i];
  }
  return {
    total: total,
    average: Math.floor(total / rates.length),
    days: rates.length
  };
}`,
    experienceReward: 30,
  },

  // Tier 2: Intermediário (requer conceitos intermediários)
  {
    id: 'cross-3',
    plantType: 'cross-concept',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Filtro de Jardim Avançado',
    description: 'Combine array methods, destructuring e arrow functions para filtrar plantas.',
    instructions: `Crie uma função 'filterHealthyPlants' que recebe um array de plantas.
Cada planta tem: { name, water, sunlight, isHealthy }

Use filter + arrow function + destructuring para:
1. Filtrar apenas plantas com water >= 5 E sunlight >= 3
2. Retornar array com os nomes das plantas saudáveis

Exemplo:
filterHealthyPlants([
  { name: "Rosa", water: 10, sunlight: 5, isHealthy: true },
  { name: "Cacto", water: 2, sunlight: 8, isHealthy: false },
  { name: "Tulipa", water: 7, sunlight: 4, isHealthy: true }
]) → ["Rosa", "Tulipa"]`,
    starterCode: `const filterHealthyPlants = (plants) => {
  // Seu código aqui
};`,
    testCases: [
      {
        input: [[
          { name: 'Rosa', water: 10, sunlight: 5 },
          { name: 'Cacto', water: 2, sunlight: 8 },
          { name: 'Tulipa', water: 7, sunlight: 4 },
        ]],
        expectedOutput: ['Rosa', 'Tulipa'],
        description: 'Filtrar plantas saudáveis',
      },
      {
        input: [[
          { name: 'Orquídea', water: 5, sunlight: 3 },
          { name: 'Girassol', water: 4, sunlight: 10 },
        ]],
        expectedOutput: ['Orquídea'],
        description: 'Limite exato',
      },
      {
        input: [[
          { name: 'Murcha', water: 1, sunlight: 1 },
        ]],
        expectedOutput: [],
        description: 'Nenhuma saudável',
      },
    ],
    hints: [
      'Use filter() com arrow function: plants.filter(p => ...)',
      'Use destructuring no parâmetro: ({ water, sunlight }) => ...',
      'Depois do filter, use map() para extrair apenas os nomes',
    ],
    solution: `const filterHealthyPlants = (plants) => {
  return plants
    .filter(({ water, sunlight }) => water >= 5 && sunlight >= 3)
    .map(({ name }) => name);
};`,
    experienceReward: 50,
  },
  {
    id: 'cross-4',
    plantType: 'cross-concept',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Processador de Colheita',
    description: 'Combine reduce, spread operator e objetos para processar colheitas.',
    instructions: `Crie uma função 'processHarvest' que recebe um array de colheitas.
Cada colheita tem: { type, quantity, value }

Retorne um objeto com:
- totalItems: soma de todas as quantities
- totalValue: soma de (quantity * value) de cada item
- types: array único de todos os types

Exemplo:
processHarvest([
  { type: "flower", quantity: 5, value: 10 },
  { type: "fruit", quantity: 3, value: 20 },
  { type: "flower", quantity: 2, value: 10 }
]) → { totalItems: 10, totalValue: 130, types: ["flower", "fruit"] }`,
    starterCode: `const processHarvest = (harvests) => {
  // Seu código aqui
};`,
    testCases: [
      {
        input: [[
          { type: 'flower', quantity: 5, value: 10 },
          { type: 'fruit', quantity: 3, value: 20 },
          { type: 'flower', quantity: 2, value: 10 },
        ]],
        expectedOutput: { totalItems: 10, totalValue: 130, types: ['flower', 'fruit'] },
        description: 'Colheita mista',
      },
      {
        input: [[{ type: 'seed', quantity: 10, value: 5 }]],
        expectedOutput: { totalItems: 10, totalValue: 50, types: ['seed'] },
        description: 'Único tipo',
      },
    ],
    hints: [
      'Use reduce() para acumular totalItems e totalValue',
      'Use Set ou filter para obter tipos únicos',
      'Spread operator pode ajudar: [...new Set(types)]',
    ],
    solution: `const processHarvest = (harvests) => {
  return harvests.reduce((acc, { type, quantity, value }) => {
    return {
      totalItems: acc.totalItems + quantity,
      totalValue: acc.totalValue + (quantity * value),
      types: acc.types.includes(type) ? acc.types : [...acc.types, type]
    };
  }, { totalItems: 0, totalValue: 0, types: [] });
};`,
    experienceReward: 50,
  },

  // Tier 3: Avançado (requer conceitos avançados)
  {
    id: 'cross-5',
    plantType: 'cross-concept',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Sistema de Rega Assíncrono',
    description: 'Combine async/await, classes e error handling para criar um sistema de rega.',
    instructions: `Crie uma classe 'WateringSystem' com:
- constructor(capacity): define capacidade máxima de água
- async water(amount): retorna Promise que resolve após 100ms
  - Se amount > capacity, throw new Error("Excede capacidade")
  - Senão, retorna "Regado: {amount}L"

Use try/catch para testar:
const system = new WateringSystem(10);
await system.water(5) → "Regado: 5L"
await system.water(15) → Error: "Excede capacidade"`,
    starterCode: `class WateringSystem {
  // Seu código aqui
}`,
    testCases: [
      {
        input: [5],
        expectedOutput: 'Regado: 5L',
        description: 'Rega normal',
      },
      {
        input: [10],
        expectedOutput: 'Regado: 10L',
        description: 'Capacidade máxima',
      },
    ],
    hints: [
      'Use constructor(capacity) { this.capacity = capacity; }',
      'O método water deve ser async e usar await com setTimeout',
      'Crie uma Promise com setTimeout para simular delay',
    ],
    solution: `class WateringSystem {
  constructor(capacity) {
    this.capacity = capacity;
  }

  async water(amount) {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (amount > this.capacity) {
      throw new Error("Excede capacidade");
    }
    return \`Regado: \${amount}L\`;
  }
}`,
    experienceReward: 70,
  },
  {
    id: 'cross-6',
    plantType: 'cross-concept',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Factory de Plantas com Closure',
    description: 'Combine closures, higher-order functions e objetos para criar uma factory.',
    instructions: `Crie uma função 'createPlantFactory' que:
1. Recebe um 'basePrice' como argumento
2. Retorna uma função que recebe (name, multiplier)
3. A função retornada cria objetos planta com:
   - name: o nome passado
   - price: basePrice * multiplier
   - getInfo(): retorna "{name} - {price} moedas"

const factory = createPlantFactory(10);
const rose = factory("Rosa", 2);
rose.getInfo() → "Rosa - 20 moedas"`,
    starterCode: `function createPlantFactory(basePrice) {
  // Seu código aqui
}`,
    testCases: [
      {
        input: ['Rosa', 2],
        expectedOutput: 'Rosa - 20 moedas',
        description: 'Rosa com multiplicador 2',
      },
      {
        input: ['Tulipa', 3],
        expectedOutput: 'Tulipa - 30 moedas',
        description: 'Tulipa com multiplicador 3',
      },
    ],
    hints: [
      'A função externa captura basePrice via closure',
      'Retorne uma função que recebe name e multiplier',
      'O objeto retornado precisa ter um método getInfo()',
    ],
    solution: `function createPlantFactory(basePrice) {
  return function(name, multiplier) {
    const price = basePrice * multiplier;
    return {
      name,
      price,
      getInfo() {
        return \`\${name} - \${price} moedas\`;
      }
    };
  };
}`,
    experienceReward: 70,
  },

  // Tier 4: Expert (requer conceitos expert)
  {
    id: 'cross-7',
    plantType: 'cross-concept',
    difficulty: 5,
    difficultyTier: 'master',
    title: 'Observable Garden com Proxy',
    description: 'Combine Proxy, classes e callbacks para criar um jardim observável.',
    instructions: `Crie uma função 'createObservableGarden' que:
1. Recebe um objeto garden inicial
2. Retorna um Proxy que:
   - Permite ler propriedades normalmente
   - Ao setar uma propriedade, chama onChange(prop, oldValue, newValue)

O garden deve ter uma propriedade 'onChange' que é uma função callback.

const garden = createObservableGarden({ water: 10 });
garden.onChange = (prop, old, newVal) => console.log(prop + ": " + old + " → " + newVal);
garden.water = 20; // Loga: "water: 10 → 20"`,
    starterCode: `function createObservableGarden(initial) {
  // Seu código aqui
}`,
    testCases: [
      {
        input: [{ water: 10 }, 'water', 20],
        expectedOutput: { prop: 'water', oldValue: 10, newValue: 20 },
        description: 'Observar mudança de water',
      },
    ],
    hints: [
      'Use new Proxy(target, handler)',
      'O handler precisa de um set trap',
      'Guarde o onChange como propriedade do target',
    ],
    solution: `function createObservableGarden(initial) {
  return new Proxy({ ...initial, onChange: null }, {
    set(target, prop, value) {
      if (prop === 'onChange') {
        target.onChange = value;
        return true;
      }
      const oldValue = target[prop];
      target[prop] = value;
      if (target.onChange && prop !== 'onChange') {
        target.onChange(prop, oldValue, value);
      }
      return true;
    }
  });
}`,
    experienceReward: 100,
  },
  {
    id: 'cross-8',
    plantType: 'cross-concept',
    difficulty: 5,
    difficultyTier: 'master',
    title: 'Gerador de Sequência de Crescimento',
    description: 'Combine generators, iterators e matemática para criar sequências de crescimento.',
    instructions: `Crie um generator 'growthSequence' que:
1. Recebe initialGrowth e growthRate
2. Gera infinitamente valores de crescimento
3. Cada valor é: anterior * growthRate, arredondado para baixo

function* growthSequence(initial, rate) { ... }

const seq = growthSequence(10, 1.5);
seq.next().value → 10
seq.next().value → 15 (10 * 1.5)
seq.next().value → 22 (15 * 1.5 = 22.5, floor = 22)`,
    starterCode: `function* growthSequence(initial, rate) {
  // Seu código aqui
}`,
    testCases: [
      {
        input: [10, 1.5, 3],
        expectedOutput: [10, 15, 22],
        description: 'Sequência com rate 1.5',
      },
      {
        input: [5, 2, 4],
        expectedOutput: [5, 10, 20, 40],
        description: 'Sequência com rate 2',
      },
    ],
    hints: [
      'Use yield para retornar cada valor',
      'Mantenha o valor atual em uma variável',
      'Use Math.floor() para arredondar',
    ],
    solution: `function* growthSequence(initial, rate) {
  let current = initial;
  while (true) {
    yield current;
    current = Math.floor(current * rate);
  }
}`,
    experienceReward: 100,
  },
];

// Mapeamento de conceitos requeridos para cada desafio combinado
export const CROSS_CONCEPT_REQUIREMENTS: Record<string, string[]> = {
  'cross-1': ['variable', 'conditional', 'string'],
  'cross-2': ['loop', 'array', 'math'],
  'cross-3': ['array-methods', 'destructuring', 'arrow-functions'],
  'cross-4': ['array-methods', 'spread-rest', 'object'],
  'cross-5': ['async', 'class', 'error-handling'],
  'cross-6': ['closure', 'function', 'object'],
  'cross-7': ['proxy', 'class', 'function'],
  'cross-8': ['generator', 'math', 'loop'],
};

export const getCrossConceptRequirements = (challengeId: string): string[] => {
  return CROSS_CONCEPT_REQUIREMENTS[challengeId] || [];
};
