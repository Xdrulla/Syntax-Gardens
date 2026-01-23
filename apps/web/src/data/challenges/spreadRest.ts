import type { Challenge } from '../../types/challenge';

export const spreadRestChallenges: Challenge[] = [
  // Desafio 1: Spread em arrays
  {
    id: 'spread-1',
    title: 'Spread em Arrays',
    description: 'O operador spread (...) expande elementos de um array.',
    instructions: 'Use spread para juntar `flowers` e `trees` em um único array `garden`.',
    difficulty: 'beginner',
    concept: 'spread-rest',
    starterCode: `const flowers = ['Rosa', 'Tulipa'];
const trees = ['Carvalho', 'Pinheiro'];
// Junte os dois arrays usando spread
const garden = `,
    expectedOutput: ['Rosa', 'Tulipa', 'Carvalho', 'Pinheiro'],
    testCases: [
      { input: null, expected: ['Rosa', 'Tulipa', 'Carvalho', 'Pinheiro'], description: 'Arrays combinados com spread' }
    ],
    hints: [
      'Use [...array1, ...array2]',
      'Spread expande os elementos dentro de um novo array',
      'const garden = [...flowers, ...trees];'
    ],
    experienceReward: 15,
  },
  // Desafio 2: Copiar array
  {
    id: 'spread-2',
    title: 'Copiar Array com Spread',
    description: 'Spread cria uma cópia superficial (shallow copy) do array.',
    instructions: 'Crie uma cópia do array `original` em `copy`. Modifique `copy` adicionando "Girassol" no final.',
    difficulty: 'beginner',
    concept: 'spread-rest',
    starterCode: `const original = ['Rosa', 'Tulipa'];
// Copie o array
const copy = [...original];
// Adicione Girassol à cópia
copy.push('Girassol');
// Verifique que original não foi modificado
const result = `,
    expectedOutput: { original: ['Rosa', 'Tulipa'], copy: ['Rosa', 'Tulipa', 'Girassol'] },
    testCases: [
      { input: null, expected: { original: ['Rosa', 'Tulipa'], copy: ['Rosa', 'Tulipa', 'Girassol'] }, description: 'Cópia independente do original' }
    ],
    hints: [
      '[...array] cria uma cópia',
      'Modificar a cópia não afeta o original',
      'const result = { original, copy };'
    ],
    experienceReward: 15,
  },
  // Desafio 3: Adicionar elementos com spread
  {
    id: 'spread-3',
    title: 'Adicionar Elementos com Spread',
    description: 'Use spread para adicionar elementos no início, meio ou fim.',
    instructions: 'Crie `withStart` adicionando "Início" no começo, e `withEnd` adicionando "Fim" no final.',
    difficulty: 'beginner',
    concept: 'spread-rest',
    starterCode: `const plants = ['Rosa', 'Tulipa'];
// Adicione "Início" no começo
const withStart = ['Início', ...plants];
// Adicione "Fim" no final
const withEnd = `,
    expectedOutput: { withStart: ['Início', 'Rosa', 'Tulipa'], withEnd: ['Rosa', 'Tulipa', 'Fim'] },
    testCases: [
      { input: null, expected: { withStart: ['Início', 'Rosa', 'Tulipa'], withEnd: ['Rosa', 'Tulipa', 'Fim'] }, description: 'Elementos adicionados corretamente' }
    ],
    hints: [
      'Para adicionar no fim: [...array, novoItem]',
      'Para adicionar no início: [novoItem, ...array]',
      'const withEnd = [...plants, "Fim"];'
    ],
    experienceReward: 15,
  },
  // Desafio 4: Spread em objetos
  {
    id: 'spread-4',
    title: 'Spread em Objetos',
    description: 'Spread também funciona com objetos para combinar propriedades.',
    instructions: 'Combine os objetos `baseStats` e `bonusStats` em `totalStats`.',
    difficulty: 'beginner',
    concept: 'spread-rest',
    starterCode: `const baseStats = { water: 50, health: 80 };
const bonusStats = { growth: 20, beauty: 90 };
// Combine os objetos
const totalStats = `,
    expectedOutput: { water: 50, health: 80, growth: 20, beauty: 90 },
    testCases: [
      { input: null, expected: { water: 50, health: 80, growth: 20, beauty: 90 }, description: 'Objetos combinados' }
    ],
    hints: [
      'Use {...obj1, ...obj2}',
      'As propriedades são copiadas para o novo objeto',
      'const totalStats = { ...baseStats, ...bonusStats };'
    ],
    experienceReward: 15,
  },
  // Desafio 5: Copiar objeto
  {
    id: 'spread-5',
    title: 'Copiar Objeto com Spread',
    description: 'Crie cópias de objetos sem modificar o original.',
    instructions: 'Copie `plant` para `plantCopy` e depois modifique o water da cópia para 100.',
    difficulty: 'beginner',
    concept: 'spread-rest',
    starterCode: `const plant = { name: 'Rosa', water: 50 };
// Copie o objeto
const plantCopy = { ...plant };
// Modifique a cópia
plantCopy.water = 100;
// Verifique que original não mudou
const result = `,
    expectedOutput: { plant: { name: 'Rosa', water: 50 }, plantCopy: { name: 'Rosa', water: 100 } },
    testCases: [
      { input: null, expected: { plant: { name: 'Rosa', water: 50 }, plantCopy: { name: 'Rosa', water: 100 } }, description: 'Cópia independente' }
    ],
    hints: [
      '{...obj} cria uma cópia superficial',
      'Modificar a cópia não afeta o original',
      'const result = { plant, plantCopy };'
    ],
    experienceReward: 15,
  },
  // Desafio 6: Merge de objetos com override
  {
    id: 'spread-6',
    title: 'Merge com Override',
    description: 'Propriedades posteriores sobrescrevem as anteriores.',
    instructions: 'Combine `defaults` com `userSettings`. As configurações do usuário devem prevalecer.',
    difficulty: 'intermediate',
    concept: 'spread-rest',
    starterCode: `const defaults = { theme: 'light', volume: 50, notifications: true };
const userSettings = { theme: 'dark', volume: 80 };
// Combine com userSettings prevalecendo
const finalSettings = `,
    expectedOutput: { theme: 'dark', volume: 80, notifications: true },
    testCases: [
      { input: null, expected: { theme: 'dark', volume: 80, notifications: true }, description: 'Configurações mescladas corretamente' }
    ],
    hints: [
      'A ordem importa: o último valor prevalece',
      '{...defaults, ...userSettings}',
      'userSettings sobrescreve defaults'
    ],
    experienceReward: 20,
  },
  // Desafio 7: Adicionar propriedades com spread
  {
    id: 'spread-7',
    title: 'Adicionar Propriedades',
    description: 'Use spread para criar objetos com propriedades adicionais.',
    instructions: 'Crie `plantWithId` que é uma cópia de `plant` com `id: 1` adicionado.',
    difficulty: 'beginner',
    concept: 'spread-rest',
    starterCode: `const plant = { name: 'Rosa', water: 50 };
// Adicione id ao objeto
const plantWithId = `,
    expectedOutput: { id: 1, name: 'Rosa', water: 50 },
    testCases: [
      { input: null, expected: { id: 1, name: 'Rosa', water: 50 }, description: 'id adicionado ao objeto' }
    ],
    hints: [
      '{ novaProp: valor, ...obj }',
      'Ou { ...obj, novaProp: valor }',
      'const plantWithId = { id: 1, ...plant };'
    ],
    experienceReward: 15,
  },
  // Desafio 8: Rest parameters em função
  {
    id: 'spread-8',
    title: 'Rest Parameters',
    description: 'Rest (...) em funções captura múltiplos argumentos em um array.',
    instructions: 'Complete a função `sumWater` que soma todas as quantidades de água recebidas.',
    difficulty: 'intermediate',
    concept: 'spread-rest',
    starterCode: `// Função que soma todas as quantidades de água
function sumWater(...amounts) {
  return amounts.reduce((total, amount) => total + amount, 0);
}

const total = sumWater(10, 20, 30, 40);
const result = `,
    expectedOutput: 100,
    testCases: [
      { input: null, expected: 100, description: 'Soma correta com rest parameters' }
    ],
    hints: [
      '...amounts captura todos os argumentos',
      'amounts é um array dentro da função',
      'const result = total;'
    ],
    experienceReward: 20,
  },
  // Desafio 9: Rest com outros parâmetros
  {
    id: 'spread-9',
    title: 'Rest com Parâmetros Fixos',
    description: 'Combine parâmetros fixos com rest para capturar o restante.',
    instructions: 'Complete a função que recebe o primeiro argumento separado e os demais em rest.',
    difficulty: 'intermediate',
    concept: 'spread-rest',
    starterCode: `// first é o primeiro, rest são os demais
function logPlants(first, ...rest) {
  return {
    leader: first,
    followers: rest
  };
}

const result = logPlants('Rosa', 'Tulipa', 'Girassol', 'Margarida');
const output = `,
    expectedOutput: { leader: 'Rosa', followers: ['Tulipa', 'Girassol', 'Margarida'] },
    testCases: [
      { input: null, expected: { leader: 'Rosa', followers: ['Tulipa', 'Girassol', 'Margarida'] }, description: 'Parâmetros separados corretamente' }
    ],
    hints: [
      'Rest deve ser o último parâmetro',
      'first recebe o primeiro argumento',
      'const output = result;'
    ],
    experienceReward: 20,
  },
  // Desafio 10: Spread em chamada de função
  {
    id: 'spread-10',
    title: 'Spread em Chamada de Função',
    description: 'Use spread para passar elementos de um array como argumentos.',
    instructions: 'Use spread para passar os elementos de `numbers` para Math.max.',
    difficulty: 'intermediate',
    concept: 'spread-rest',
    starterCode: `const numbers = [25, 10, 45, 30, 15];
// Use spread para encontrar o maior
const maxNumber = `,
    expectedOutput: 45,
    testCases: [
      { input: null, expected: 45, description: 'Math.max com spread' }
    ],
    hints: [
      'Math.max recebe argumentos separados, não array',
      'Math.max(...array) expande o array',
      'const maxNumber = Math.max(...numbers);'
    ],
    experienceReward: 20,
  },
  // Desafio 11: Spread com Math.max/min
  {
    id: 'spread-11',
    title: 'Spread com Math.max e Math.min',
    description: 'Encontre o maior e menor valor de um array usando spread.',
    instructions: 'Encontre o maior (`maxWater`) e menor (`minWater`) valor do array `waterLevels`.',
    difficulty: 'intermediate',
    concept: 'spread-rest',
    starterCode: `const waterLevels = [30, 85, 45, 20, 60];
// Encontre o maior
const maxWater = Math.max(...waterLevels);
// Encontre o menor
const minWater = `,
    expectedOutput: { maxWater: 85, minWater: 20 },
    testCases: [
      { input: null, expected: { maxWater: 85, minWater: 20 }, description: 'Max e min encontrados' }
    ],
    hints: [
      'Math.min funciona igual Math.max',
      'Math.min(...array)',
      'const minWater = Math.min(...waterLevels);'
    ],
    experienceReward: 20,
  },
  // Desafio 12: Clonar array aninhado (shallow vs deep)
  {
    id: 'spread-12',
    title: 'Cópia Superficial de Array',
    description: 'Spread faz cópia superficial - objetos internos ainda são referências.',
    instructions: 'Observe o comportamento: copie `plants` com spread, modifique o water do primeiro item da cópia.',
    difficulty: 'advanced',
    concept: 'spread-rest',
    starterCode: `const plants = [
  { name: 'Rosa', water: 50 },
  { name: 'Tulipa', water: 60 }
];

// Cópia superficial
const plantsCopy = [...plants];
// Modificar o objeto dentro da cópia
plantsCopy[0].water = 100;

// Ambos foram afetados! (shallow copy)
const result = `,
    expectedOutput: { originalWater: 100, copyWater: 100 },
    testCases: [
      { input: null, expected: { originalWater: 100, copyWater: 100 }, description: 'Shallow copy demonstrada' }
    ],
    hints: [
      'Spread só copia um nível',
      'Objetos internos são referências',
      'const result = { originalWater: plants[0].water, copyWater: plantsCopy[0].water };'
    ],
    experienceReward: 25,
  },
  // Desafio 13: Clonar objeto aninhado (shallow vs deep)
  {
    id: 'spread-13',
    title: 'Cópia Profunda com Spread',
    description: 'Para cópia profunda, você precisa copiar cada nível.',
    instructions: 'Faça uma cópia profunda de `plant` copiando também o objeto `stats` interno.',
    difficulty: 'advanced',
    concept: 'spread-rest',
    starterCode: `const plant = {
  name: 'Rosa',
  stats: { water: 50, health: 80 }
};

// Cópia profunda manual
const deepCopy = {
  ...plant,
  stats: { ...plant.stats }
};

// Modifique a cópia
deepCopy.stats.water = 100;

// Agora são independentes
const result = `,
    expectedOutput: { originalWater: 50, copyWater: 100 },
    testCases: [
      { input: null, expected: { originalWater: 50, copyWater: 100 }, description: 'Deep copy funciona' }
    ],
    hints: [
      'Copie o objeto interno também',
      'stats: { ...plant.stats }',
      'const result = { originalWater: plant.stats.water, copyWater: deepCopy.stats.water };'
    ],
    experienceReward: 25,
  },
  // Desafio 14: Spread para remover propriedade
  {
    id: 'spread-14',
    title: 'Remover Propriedade com Destructuring + Rest',
    description: 'Combine destructuring com rest para remover propriedades.',
    instructions: 'Remova a propriedade `password` do objeto e mantenha o resto em `safeUser`.',
    difficulty: 'advanced',
    concept: 'spread-rest',
    starterCode: `const user = {
  name: 'Jardineiro',
  email: 'jardineiro@garden.com',
  password: 'secret123',
  level: 10
};

// Remova password, mantenha o resto
const { password, ...safeUser } = user;

const result = `,
    expectedOutput: { name: 'Jardineiro', email: 'jardineiro@garden.com', level: 10 },
    testCases: [
      { input: null, expected: { name: 'Jardineiro', email: 'jardineiro@garden.com', level: 10 }, description: 'Password removido' }
    ],
    hints: [
      'Destructuring extrai password',
      'Rest captura todo o resto',
      'const result = safeUser;'
    ],
    experienceReward: 25,
  },
  // Desafio 15: Desafio combinado - sistema de merge de plantas
  {
    id: 'spread-15',
    title: 'Sistema de Merge de Plantas',
    description: 'Use spread e rest para criar um sistema de fusão de plantas.',
    instructions: 'Crie uma função que combina duas plantas: soma os stats, concatena tags, e usa o nome da primeira.',
    difficulty: 'advanced',
    concept: 'spread-rest',
    starterCode: `const plant1 = {
  name: 'Rosa',
  stats: { water: 50, health: 80 },
  tags: ['florida', 'perfumada']
};

const plant2 = {
  name: 'Orquídea',
  stats: { water: 40, health: 90 },
  tags: ['rara', 'exótica']
};

// Combine as plantas
const mergedPlant = {
  name: plant1.name + ' & ' + plant2.name,
  stats: {
    water: plant1.stats.water + plant2.stats.water,
    health: Math.round((plant1.stats.health + plant2.stats.health) / 2)
  },
  tags: [...plant1.tags, ...plant2.tags]
};

const result = `,
    expectedOutput: {
      name: 'Rosa & Orquídea',
      stats: { water: 90, health: 85 },
      tags: ['florida', 'perfumada', 'rara', 'exótica']
    },
    testCases: [
      { input: null, expected: {
        name: 'Rosa & Orquídea',
        stats: { water: 90, health: 85 },
        tags: ['florida', 'perfumada', 'rara', 'exótica']
      }, description: 'Plantas combinadas corretamente' }
    ],
    hints: [
      'O código já está pronto',
      'Apenas atribua mergedPlant a result',
      'const result = mergedPlant;'
    ],
    experienceReward: 35,
  },
];
