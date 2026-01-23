import type { Challenge } from '../../types/challenge';

export const destructuringChallenges: Challenge[] = [
  // Desafio 1: Destructuring básico de array
  {
    id: 'destr-1',
    title: 'Destructuring de Array Básico',
    description: 'Destructuring permite extrair valores de arrays em variáveis separadas.',
    instructions: 'Use destructuring para extrair os dois primeiros elementos do array `coordinates` em `x` e `y`.',
    difficulty: 'beginner',
    concept: 'destructuring',
    starterCode: `const coordinates = [10, 20, 30];
// Extraia x e y usando destructuring
const [x, y] = `,
    expectedOutput: { x: 10, y: 20 },
    testCases: [
      { input: null, expected: { x: 10, y: 20 }, description: 'x deve ser 10 e y deve ser 20' }
    ],
    hints: [
      'Use colchetes do lado esquerdo do =',
      '[variavel1, variavel2] = array',
      'const [x, y] = coordinates;'
    ],
    experienceReward: 15,
  },
  // Desafio 2: Pular elementos em array
  {
    id: 'destr-2',
    title: 'Pular Elementos no Destructuring',
    description: 'Você pode pular elementos usando vírgulas extras.',
    instructions: 'Extraia apenas o primeiro e terceiro elementos do array `seasons` em `first` e `third`.',
    difficulty: 'beginner',
    concept: 'destructuring',
    starterCode: `const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
// Extraia primeiro e terceiro (pule o segundo)
const [first, , third] = `,
    expectedOutput: { first: 'Primavera', third: 'Outono' },
    testCases: [
      { input: null, expected: { first: 'Primavera', third: 'Outono' }, description: 'first e third corretos' }
    ],
    hints: [
      'Use uma vírgula extra para pular um elemento',
      '[a, , c] pula o segundo elemento',
      'const [first, , third] = seasons;'
    ],
    experienceReward: 15,
  },
  // Desafio 3: Rest em array
  {
    id: 'destr-3',
    title: 'Rest em Array Destructuring',
    description: 'O operador rest (...) captura os elementos restantes.',
    instructions: 'Extraia o primeiro elemento em `leader` e os demais em `followers`.',
    difficulty: 'beginner',
    concept: 'destructuring',
    starterCode: `const plants = ['Rosa', 'Tulipa', 'Girassol', 'Margarida'];
// Extraia o líder e os seguidores
const [leader, ...followers] = `,
    expectedOutput: { leader: 'Rosa', followers: ['Tulipa', 'Girassol', 'Margarida'] },
    testCases: [
      { input: null, expected: { leader: 'Rosa', followers: ['Tulipa', 'Girassol', 'Margarida'] }, description: 'leader e followers corretos' }
    ],
    hints: [
      '...rest captura todos os elementos restantes',
      'O rest deve ser o último elemento',
      'const [leader, ...followers] = plants;'
    ],
    experienceReward: 20,
  },
  // Desafio 4: Default values em array
  {
    id: 'destr-4',
    title: 'Valores Padrão em Array',
    description: 'Você pode definir valores padrão caso o elemento não exista.',
    instructions: 'Extraia os três primeiros elementos, usando "Desconhecido" como padrão para elementos faltantes.',
    difficulty: 'beginner',
    concept: 'destructuring',
    starterCode: `const plants = ['Rosa', 'Tulipa'];
// Extraia três elementos com valor padrão
const [plant1, plant2, plant3 = 'Desconhecido'] = `,
    expectedOutput: { plant1: 'Rosa', plant2: 'Tulipa', plant3: 'Desconhecido' },
    testCases: [
      { input: null, expected: { plant1: 'Rosa', plant2: 'Tulipa', plant3: 'Desconhecido' }, description: 'Valores padrão aplicados' }
    ],
    hints: [
      'Use = para definir valor padrão',
      '[a, b, c = "padrão"] = array',
      'O valor padrão é usado se o índice não existir'
    ],
    experienceReward: 20,
  },
  // Desafio 5: Swap de variáveis
  {
    id: 'destr-5',
    title: 'Swap com Destructuring',
    description: 'Destructuring permite trocar valores de variáveis facilmente.',
    instructions: 'Troque os valores de `a` e `b` usando destructuring.',
    difficulty: 'beginner',
    concept: 'destructuring',
    starterCode: `let a = 'Rosa';
let b = 'Tulipa';
// Troque os valores de a e b
[a, b] = `,
    expectedOutput: { a: 'Tulipa', b: 'Rosa' },
    testCases: [
      { input: null, expected: { a: 'Tulipa', b: 'Rosa' }, description: 'Valores trocados corretamente' }
    ],
    hints: [
      'Não precisa de variável temporária',
      '[a, b] = [b, a] troca os valores',
      'Use let, não const, para permitir reatribuição'
    ],
    experienceReward: 20,
  },
  // Desafio 6: Destructuring básico de objeto
  {
    id: 'destr-6',
    title: 'Destructuring de Objeto Básico',
    description: 'Extraia propriedades de objetos diretamente em variáveis.',
    instructions: 'Extraia `name` e `water` do objeto `plant`.',
    difficulty: 'beginner',
    concept: 'destructuring',
    starterCode: `const plant = { name: 'Rosa', water: 50, health: 80 };
// Extraia name e water
const { name, water } = `,
    expectedOutput: { name: 'Rosa', water: 50 },
    testCases: [
      { input: null, expected: { name: 'Rosa', water: 50 }, description: 'name e water extraídos' }
    ],
    hints: [
      'Use chaves {} para objetos',
      'Os nomes devem corresponder às propriedades',
      'const { name, water } = plant;'
    ],
    experienceReward: 15,
  },
  // Desafio 7: Renomear propriedades
  {
    id: 'destr-7',
    title: 'Renomear no Destructuring',
    description: 'Você pode renomear propriedades durante a extração.',
    instructions: 'Extraia `name` como `plantName` e `water` como `waterLevel`.',
    difficulty: 'intermediate',
    concept: 'destructuring',
    starterCode: `const plant = { name: 'Girassol', water: 75 };
// Extraia com novos nomes
const { name: plantName, water: waterLevel } = `,
    expectedOutput: { plantName: 'Girassol', waterLevel: 75 },
    testCases: [
      { input: null, expected: { plantName: 'Girassol', waterLevel: 75 }, description: 'Propriedades renomeadas' }
    ],
    hints: [
      'Use : para renomear: { original: novoNome }',
      'A variável criada será novoNome',
      'const { name: plantName } = obj'
    ],
    experienceReward: 20,
  },
  // Desafio 8: Default values em objeto
  {
    id: 'destr-8',
    title: 'Valores Padrão em Objeto',
    description: 'Defina valores padrão para propriedades inexistentes.',
    instructions: 'Extraia `name`, `water` e `fertilizer` (padrão: 0) do objeto.',
    difficulty: 'intermediate',
    concept: 'destructuring',
    starterCode: `const plant = { name: 'Tulipa', water: 60 };
// Extraia com valor padrão para fertilizer
const { name, water, fertilizer = 0 } = `,
    expectedOutput: { name: 'Tulipa', water: 60, fertilizer: 0 },
    testCases: [
      { input: null, expected: { name: 'Tulipa', water: 60, fertilizer: 0 }, description: 'fertilizer com valor padrão' }
    ],
    hints: [
      'Use = para valor padrão: { prop = valor }',
      'O padrão só é usado se a propriedade for undefined',
      '{ fertilizer = 0 } define 0 como padrão'
    ],
    experienceReward: 20,
  },
  // Desafio 9: Destructuring aninhado
  {
    id: 'destr-9',
    title: 'Destructuring Aninhado',
    description: 'Você pode desestruturar objetos dentro de objetos.',
    instructions: 'Extraia `city` de dentro de `location` em uma única operação.',
    difficulty: 'intermediate',
    concept: 'destructuring',
    starterCode: `const garden = {
  name: 'Jardim Botânico',
  location: {
    city: 'São Paulo',
    country: 'Brasil'
  }
};
// Extraia o name do jardim e city da location
const { name, location: { city } } = `,
    expectedOutput: { name: 'Jardim Botânico', city: 'São Paulo' },
    testCases: [
      { input: null, expected: { name: 'Jardim Botânico', city: 'São Paulo' }, description: 'Destructuring aninhado correto' }
    ],
    hints: [
      'Aninhando: { prop: { subProp } }',
      'location: { city } extrai city de location',
      'A variável location não será criada, apenas city'
    ],
    experienceReward: 25,
  },
  // Desafio 10: Destructuring em parâmetros de função
  {
    id: 'destr-10',
    title: 'Destructuring em Parâmetros',
    description: 'Desestruture objetos diretamente nos parâmetros da função.',
    instructions: 'Complete a função `displayPlant` que recebe um objeto e usa destructuring para extrair `name` e `water`.',
    difficulty: 'intermediate',
    concept: 'destructuring',
    starterCode: `// Complete a função usando destructuring no parâmetro
function displayPlant({ name, water }) {
  return name + ': ' + water + 'ml';
}

const result = displayPlant({ name: 'Rosa', water: 50, health: 80 });
const output = `,
    expectedOutput: 'Rosa: 50ml',
    testCases: [
      { input: null, expected: 'Rosa: 50ml', description: 'Função com destructuring funciona' }
    ],
    hints: [
      'O destructuring já está no parâmetro',
      'A função extrai name e water automaticamente',
      'const output = result;'
    ],
    experienceReward: 25,
  },
  // Desafio 11: Destructuring com rest em objeto
  {
    id: 'destr-11',
    title: 'Rest em Objeto Destructuring',
    description: 'Use rest para capturar propriedades restantes.',
    instructions: 'Extraia `id` separadamente e agrupe as demais propriedades em `plantData`.',
    difficulty: 'intermediate',
    concept: 'destructuring',
    starterCode: `const plant = { id: 1, name: 'Rosa', water: 50, health: 80 };
// Extraia id e agrupe o resto
const { id, ...plantData } = `,
    expectedOutput: { id: 1, plantData: { name: 'Rosa', water: 50, health: 80 } },
    testCases: [
      { input: null, expected: { id: 1, plantData: { name: 'Rosa', water: 50, health: 80 } }, description: 'Rest em objeto funciona' }
    ],
    hints: [
      '...rest captura propriedades restantes',
      'Cria um novo objeto com as propriedades não extraídas',
      'const { id, ...plantData } = plant;'
    ],
    experienceReward: 25,
  },
  // Desafio 12: Destructuring em loops
  {
    id: 'destr-12',
    title: 'Destructuring em Loops',
    description: 'Use destructuring para extrair propriedades em loops.',
    instructions: 'Use for...of com destructuring para criar um array apenas com os nomes das plantas.',
    difficulty: 'intermediate',
    concept: 'destructuring',
    starterCode: `const plants = [
  { name: 'Rosa', water: 50 },
  { name: 'Tulipa', water: 60 },
  { name: 'Girassol', water: 40 }
];

const names = [];
for (const { name } of plants) {
  names.push(name);
}

const result = `,
    expectedOutput: ['Rosa', 'Tulipa', 'Girassol'],
    testCases: [
      { input: null, expected: ['Rosa', 'Tulipa', 'Girassol'], description: 'Nomes extraídos no loop' }
    ],
    hints: [
      'for (const { prop } of array) desestrutura cada item',
      'A variável name é criada para cada iteração',
      'const result = names;'
    ],
    experienceReward: 25,
  },
  // Desafio 13: Destructuring de arrays retornados
  {
    id: 'destr-13',
    title: 'Destructuring de Retorno de Função',
    description: 'Desestruture diretamente o retorno de funções.',
    instructions: 'A função `getCoordinates` retorna um array. Use destructuring para extrair os valores em `lat` e `lng`.',
    difficulty: 'intermediate',
    concept: 'destructuring',
    starterCode: `function getCoordinates() {
  return [-23.55, -46.63];
}

// Desestruture o retorno da função
const [lat, lng] = `,
    expectedOutput: { lat: -23.55, lng: -46.63 },
    testCases: [
      { input: null, expected: { lat: -23.55, lng: -46.63 }, description: 'Coordenadas extraídas' }
    ],
    hints: [
      'Chame a função diretamente após o =',
      'const [a, b] = funcao()',
      'const [lat, lng] = getCoordinates();'
    ],
    experienceReward: 20,
  },
  // Desafio 14: Destructuring de objetos retornados
  {
    id: 'destr-14',
    title: 'Destructuring de Objeto Retornado',
    description: 'Desestruture objetos retornados por funções.',
    instructions: 'A função `getPlantInfo` retorna um objeto. Extraia `name` e `status` do retorno.',
    difficulty: 'intermediate',
    concept: 'destructuring',
    starterCode: `function getPlantInfo() {
  return { name: 'Orquídea', water: 70, status: 'saudável' };
}

// Desestruture o retorno
const { name, status } = `,
    expectedOutput: { name: 'Orquídea', status: 'saudável' },
    testCases: [
      { input: null, expected: { name: 'Orquídea', status: 'saudável' }, description: 'Propriedades extraídas do retorno' }
    ],
    hints: [
      'Funciona igual a arrays, mas com {}',
      'const { prop } = funcao()',
      'const { name, status } = getPlantInfo();'
    ],
    experienceReward: 20,
  },
  // Desafio 15: Desafio combinado - processar dados de plantas
  {
    id: 'destr-15',
    title: 'Processamento Completo com Destructuring',
    description: 'Use destructuring em várias situações para processar dados.',
    instructions: 'Processe os dados da planta: extraia `name` e `stats`, de stats extraia `water` e `health`, e crie um relatório.',
    difficulty: 'advanced',
    concept: 'destructuring',
    starterCode: `const plantData = {
  id: 1,
  name: 'Rosa Imperial',
  stats: {
    water: 85,
    health: 92,
    growth: 75
  },
  tags: ['rara', 'florida', 'perfumada']
};

// Extraia name, e de stats extraia water e health
const { name, stats: { water, health } } = plantData;
// Extraia a primeira tag e as demais
const [firstTag, ...otherTags] = plantData.tags;

const report = {
  plantName: name,
  waterLevel: water,
  healthLevel: health,
  mainTag: firstTag,
  additionalTags: otherTags
};

const result = `,
    expectedOutput: {
      plantName: 'Rosa Imperial',
      waterLevel: 85,
      healthLevel: 92,
      mainTag: 'rara',
      additionalTags: ['florida', 'perfumada']
    },
    testCases: [
      { input: null, expected: {
        plantName: 'Rosa Imperial',
        waterLevel: 85,
        healthLevel: 92,
        mainTag: 'rara',
        additionalTags: ['florida', 'perfumada']
      }, description: 'Relatório completo gerado' }
    ],
    hints: [
      'O código já está quase pronto',
      'Apenas atribua report a result',
      'const result = report;'
    ],
    experienceReward: 35,
  },
];
