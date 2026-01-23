import type { Challenge } from '../../types/challenge';

export const arrayMethodsChallenges: Challenge[] = [
  // Desafio 1: reduce() básico - somar valores
  {
    id: 'arr-adv-1',
    title: 'Reduce Básico - Soma',
    description: 'O método reduce() é poderoso para transformar um array em um único valor.',
    instructions: 'Use reduce() para somar todos os valores do array `waterAmounts`. Guarde o resultado em `totalWater`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const waterAmounts = [10, 25, 15, 30, 20];
// Use reduce para somar todos os valores
const totalWater = `,
    expectedOutput: 100,
    testCases: [
      { input: null, expected: 100, description: 'totalWater deve ser 100' }
    ],
    hints: [
      'reduce() recebe uma função com (acumulador, valorAtual)',
      'O segundo parâmetro do reduce é o valor inicial (use 0)',
      'arr.reduce((acc, val) => acc + val, 0)'
    ],
    experienceReward: 25,
  },
  // Desafio 2: reduce() com objeto - agrupar dados
  {
    id: 'arr-adv-2',
    title: 'Reduce com Objeto',
    description: 'reduce() pode criar objetos a partir de arrays.',
    instructions: 'Use reduce() para contar quantas plantas de cada tipo existem no array `plants`. Resultado em `plantCount`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const plants = ['rosa', 'tulipa', 'rosa', 'girassol', 'tulipa', 'rosa'];
// Conte quantas plantas de cada tipo
const plantCount = `,
    expectedOutput: { rosa: 3, tulipa: 2, girassol: 1 },
    testCases: [
      { input: null, expected: { rosa: 3, tulipa: 2, girassol: 1 }, description: 'plantCount deve contar cada tipo' }
    ],
    hints: [
      'O acumulador inicial deve ser um objeto vazio {}',
      'Para cada planta, incremente o contador no objeto',
      'Use acc[plant] = (acc[plant] || 0) + 1'
    ],
    experienceReward: 30,
  },
  // Desafio 3: reduce() para flatten - achatar array
  {
    id: 'arr-adv-3',
    title: 'Reduce para Flatten',
    description: 'reduce() pode achatar arrays aninhados.',
    instructions: 'Use reduce() para achatar o array `nestedSeeds` em um único array `allSeeds`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const nestedSeeds = [['rosa', 'tulipa'], ['girassol'], ['margarida', 'violeta']];
// Achate o array em um único nível
const allSeeds = `,
    expectedOutput: ['rosa', 'tulipa', 'girassol', 'margarida', 'violeta'],
    testCases: [
      { input: null, expected: ['rosa', 'tulipa', 'girassol', 'margarida', 'violeta'], description: 'allSeeds deve ser um array achatado' }
    ],
    hints: [
      'Use reduce com um array vazio como valor inicial',
      'Concatene cada sub-array ao acumulador',
      'acc.concat(curr) ou [...acc, ...curr]'
    ],
    experienceReward: 30,
  },
  // Desafio 4: find() - encontrar primeiro elemento
  {
    id: 'arr-adv-4',
    title: 'Método find()',
    description: 'find() retorna o primeiro elemento que satisfaz a condição.',
    instructions: 'Use find() para encontrar a primeira planta com mais de 50 de água em `plants`. Guarde em `thirstyPlant`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const plants = [
  { name: 'Rosa', water: 30 },
  { name: 'Tulipa', water: 60 },
  { name: 'Girassol', water: 80 },
  { name: 'Margarida', water: 25 }
];
// Encontre a primeira planta com water > 50
const thirstyPlant = `,
    expectedOutput: { name: 'Tulipa', water: 60 },
    testCases: [
      { input: null, expected: { name: 'Tulipa', water: 60 }, description: 'thirstyPlant deve ser Tulipa' }
    ],
    hints: [
      'find() recebe uma função que retorna true/false',
      'Retorne true quando water > 50',
      'plants.find(p => p.water > 50)'
    ],
    experienceReward: 20,
  },
  // Desafio 5: findIndex() - encontrar índice do primeiro elemento
  {
    id: 'arr-adv-5',
    title: 'Método findIndex()',
    description: 'findIndex() retorna o índice do primeiro elemento que satisfaz a condição.',
    instructions: 'Use findIndex() para encontrar o índice da primeira planta madura (`mature: true`). Guarde em `matureIndex`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const plants = [
  { name: 'Rosa', mature: false },
  { name: 'Tulipa', mature: false },
  { name: 'Girassol', mature: true },
  { name: 'Margarida', mature: true }
];
// Encontre o índice da primeira planta madura
const matureIndex = `,
    expectedOutput: 2,
    testCases: [
      { input: null, expected: 2, description: 'matureIndex deve ser 2' }
    ],
    hints: [
      'findIndex() funciona como find(), mas retorna o índice',
      'Retorna -1 se não encontrar',
      'plants.findIndex(p => p.mature)'
    ],
    experienceReward: 20,
  },
  // Desafio 6: findLast() e findLastIndex()
  {
    id: 'arr-adv-6',
    title: 'findLast e findLastIndex',
    description: 'findLast() e findLastIndex() buscam do final para o início.',
    instructions: 'Use findLast() para encontrar a última planta com água < 40 em `lastDry`. Use findLastIndex() para o índice em `lastDryIndex`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const plants = [
  { name: 'Rosa', water: 30 },
  { name: 'Tulipa', water: 60 },
  { name: 'Girassol', water: 35 },
  { name: 'Margarida', water: 80 }
];
// Encontre a última planta com water < 40
const lastDry = plants.findLast(p => p.water < 40);
const lastDryIndex = `,
    expectedOutput: { lastDry: { name: 'Girassol', water: 35 }, lastDryIndex: 2 },
    testCases: [
      { input: null, expected: { lastDry: { name: 'Girassol', water: 35 }, lastDryIndex: 2 }, description: 'Deve encontrar Girassol no índice 2' }
    ],
    hints: [
      'findLastIndex() funciona igual findLast() mas retorna índice',
      'A condição é water < 40',
      'plants.findLastIndex(p => p.water < 40)'
    ],
    experienceReward: 25,
  },
  // Desafio 7: some() - verificar se algum satisfaz condição
  {
    id: 'arr-adv-7',
    title: 'Método some()',
    description: 'some() retorna true se ALGUM elemento satisfaz a condição.',
    instructions: 'Use some() para verificar se alguma planta precisa de água (water < 20). Guarde em `needsWater`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const plants = [
  { name: 'Rosa', water: 50 },
  { name: 'Tulipa', water: 15 },
  { name: 'Girassol', water: 80 }
];
// Verifique se alguma planta precisa de água
const needsWater = `,
    expectedOutput: true,
    testCases: [
      { input: null, expected: true, description: 'needsWater deve ser true' }
    ],
    hints: [
      'some() retorna true se pelo menos um passa no teste',
      'A condição é water < 20',
      'plants.some(p => p.water < 20)'
    ],
    experienceReward: 20,
  },
  // Desafio 8: every() - verificar se todos satisfazem condição
  {
    id: 'arr-adv-8',
    title: 'Método every()',
    description: 'every() retorna true se TODOS os elementos satisfazem a condição.',
    instructions: 'Use every() para verificar se todas as plantas estão saudáveis (health > 50). Guarde em `allHealthy`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const plants = [
  { name: 'Rosa', health: 80 },
  { name: 'Tulipa', health: 65 },
  { name: 'Girassol', health: 90 }
];
// Verifique se todas estão saudáveis
const allHealthy = `,
    expectedOutput: true,
    testCases: [
      { input: null, expected: true, description: 'allHealthy deve ser true' }
    ],
    hints: [
      'every() só retorna true se TODOS passarem',
      'A condição é health > 50',
      'plants.every(p => p.health > 50)'
    ],
    experienceReward: 20,
  },
  // Desafio 9: sort() com números
  {
    id: 'arr-adv-9',
    title: 'Sort com Números',
    description: 'sort() precisa de uma função comparadora para números.',
    instructions: 'Ordene o array `waterLevels` em ordem crescente e guarde em `sortedAsc`. Depois ordene em decrescente em `sortedDesc`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const waterLevels = [50, 10, 80, 30, 60];
// Ordene crescente (faça uma cópia primeiro!)
const sortedAsc = [...waterLevels].sort((a, b) => a - b);
// Ordene decrescente
const sortedDesc = `,
    expectedOutput: { sortedAsc: [10, 30, 50, 60, 80], sortedDesc: [80, 60, 50, 30, 10] },
    testCases: [
      { input: null, expected: { sortedAsc: [10, 30, 50, 60, 80], sortedDesc: [80, 60, 50, 30, 10] }, description: 'Arrays devem estar ordenados corretamente' }
    ],
    hints: [
      'Para decrescente, inverta a comparação: b - a',
      'Sempre copie o array antes de sort() para não mutar o original',
      '[...waterLevels].sort((a, b) => b - a)'
    ],
    experienceReward: 25,
  },
  // Desafio 10: sort() com strings
  {
    id: 'arr-adv-10',
    title: 'Sort com Strings',
    description: 'Strings são ordenadas alfabeticamente por padrão com sort().',
    instructions: 'Ordene o array `plantNames` alfabeticamente em `sortedNames`. Depois ordene inversamente em `reverseSorted`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const plantNames = ['Girassol', 'Rosa', 'Tulipa', 'Margarida', 'Bromélia'];
// Ordene alfabeticamente
const sortedNames = [...plantNames].sort();
// Ordene inversamente (Z-A)
const reverseSorted = `,
    expectedOutput: { sortedNames: ['Bromélia', 'Girassol', 'Margarida', 'Rosa', 'Tulipa'], reverseSorted: ['Tulipa', 'Rosa', 'Margarida', 'Girassol', 'Bromélia'] },
    testCases: [
      { input: null, expected: { sortedNames: ['Bromélia', 'Girassol', 'Margarida', 'Rosa', 'Tulipa'], reverseSorted: ['Tulipa', 'Rosa', 'Margarida', 'Girassol', 'Bromélia'] }, description: 'Strings devem estar ordenadas' }
    ],
    hints: [
      'Para inverter, use localeCompare invertido',
      'sort((a, b) => b.localeCompare(a))',
      'Ou ordene normal e depois use reverse()'
    ],
    experienceReward: 25,
  },
  // Desafio 11: sort() com comparador customizado
  {
    id: 'arr-adv-11',
    title: 'Sort com Comparador Custom',
    description: 'Você pode ordenar objetos por qualquer propriedade.',
    instructions: 'Ordene as plantas por nível de água (do menor para o maior). Guarde em `sortedByWater`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const plants = [
  { name: 'Rosa', water: 50 },
  { name: 'Tulipa', water: 20 },
  { name: 'Girassol', water: 80 },
  { name: 'Margarida', water: 35 }
];
// Ordene por water (menor para maior)
const sortedByWater = `,
    expectedOutput: [
      { name: 'Tulipa', water: 20 },
      { name: 'Margarida', water: 35 },
      { name: 'Rosa', water: 50 },
      { name: 'Girassol', water: 80 }
    ],
    testCases: [
      { input: null, expected: [
        { name: 'Tulipa', water: 20 },
        { name: 'Margarida', water: 35 },
        { name: 'Rosa', water: 50 },
        { name: 'Girassol', water: 80 }
      ], description: 'Plantas ordenadas por água' }
    ],
    hints: [
      'Acesse a propriedade water na comparação',
      'sort((a, b) => a.water - b.water)',
      'Lembre de copiar o array primeiro'
    ],
    experienceReward: 25,
  },
  // Desafio 12: reverse()
  {
    id: 'arr-adv-12',
    title: 'Método reverse()',
    description: 'reverse() inverte a ordem dos elementos.',
    instructions: 'Inverta a ordem do array `seasons`. Guarde em `reversedSeasons`.',
    difficulty: 'beginner',
    concept: 'array-methods',
    starterCode: `const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
// Inverta a ordem
const reversedSeasons = `,
    expectedOutput: ['Inverno', 'Outono', 'Verão', 'Primavera'],
    testCases: [
      { input: null, expected: ['Inverno', 'Outono', 'Verão', 'Primavera'], description: 'Array deve estar invertido' }
    ],
    hints: [
      'reverse() modifica o array original',
      'Copie primeiro: [...seasons]',
      '[...seasons].reverse()'
    ],
    experienceReward: 15,
  },
  // Desafio 13: flat()
  {
    id: 'arr-adv-13',
    title: 'Método flat()',
    description: 'flat() achata arrays aninhados em um único nível.',
    instructions: 'Achate o array `nestedGarden` com profundidade 1 em `flatGarden`. Depois achate completamente em `deepFlat`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const nestedGarden = [['Rosa'], [['Tulipa', 'Girassol']], ['Margarida']];
// Achate um nível
const flatGarden = nestedGarden.flat();
// Achate completamente (profundidade infinita)
const deepFlat = `,
    expectedOutput: { flatGarden: ['Rosa', ['Tulipa', 'Girassol'], 'Margarida'], deepFlat: ['Rosa', 'Tulipa', 'Girassol', 'Margarida'] },
    testCases: [
      { input: null, expected: { flatGarden: ['Rosa', ['Tulipa', 'Girassol'], 'Margarida'], deepFlat: ['Rosa', 'Tulipa', 'Girassol', 'Margarida'] }, description: 'Arrays achatados corretamente' }
    ],
    hints: [
      'flat() sem argumento achata 1 nível',
      'flat(2) achata 2 níveis',
      'flat(Infinity) achata todos os níveis'
    ],
    experienceReward: 25,
  },
  // Desafio 14: flatMap()
  {
    id: 'arr-adv-14',
    title: 'Método flatMap()',
    description: 'flatMap() combina map() e flat() em uma operação.',
    instructions: 'Use flatMap() para duplicar cada número em `seeds` (cada número vira [n, n]). Guarde em `duplicated`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const seeds = [1, 2, 3];
// Duplique cada número: 1 -> [1, 1], 2 -> [2, 2], etc.
const duplicated = `,
    expectedOutput: [1, 1, 2, 2, 3, 3],
    testCases: [
      { input: null, expected: [1, 1, 2, 2, 3, 3], description: 'Cada número deve aparecer duas vezes' }
    ],
    hints: [
      'flatMap retorna um array para cada elemento',
      'O array retornado é automaticamente achatado',
      'seeds.flatMap(n => [n, n])'
    ],
    experienceReward: 25,
  },
  // Desafio 15: includes()
  {
    id: 'arr-adv-15',
    title: 'Método includes()',
    description: 'includes() verifica se um elemento existe no array.',
    instructions: 'Verifique se "Rosa" existe em `garden` (guarde em `hasRosa`). Verifique se "Orquídea" existe (guarde em `hasOrquidea`).',
    difficulty: 'beginner',
    concept: 'array-methods',
    starterCode: `const garden = ['Tulipa', 'Rosa', 'Girassol', 'Margarida'];
// Verifique se existe Rosa
const hasRosa = garden.includes('Rosa');
// Verifique se existe Orquídea
const hasOrquidea = `,
    expectedOutput: { hasRosa: true, hasOrquidea: false },
    testCases: [
      { input: null, expected: { hasRosa: true, hasOrquidea: false }, description: 'hasRosa true, hasOrquidea false' }
    ],
    hints: [
      'includes() retorna true ou false',
      'A comparação é case-sensitive',
      'garden.includes("Orquídea")'
    ],
    experienceReward: 15,
  },
  // Desafio 16: indexOf() e lastIndexOf()
  {
    id: 'arr-adv-16',
    title: 'indexOf e lastIndexOf',
    description: 'indexOf() encontra a primeira posição, lastIndexOf() a última.',
    instructions: 'Encontre a primeira posição de "Rosa" em `firstRosa` e a última em `lastRosa`.',
    difficulty: 'beginner',
    concept: 'array-methods',
    starterCode: `const garden = ['Rosa', 'Tulipa', 'Rosa', 'Girassol', 'Rosa'];
// Primeira posição de Rosa
const firstRosa = garden.indexOf('Rosa');
// Última posição de Rosa
const lastRosa = `,
    expectedOutput: { firstRosa: 0, lastRosa: 4 },
    testCases: [
      { input: null, expected: { firstRosa: 0, lastRosa: 4 }, description: 'Posições corretas de Rosa' }
    ],
    hints: [
      'indexOf() retorna -1 se não encontrar',
      'lastIndexOf() busca do final',
      'garden.lastIndexOf("Rosa")'
    ],
    experienceReward: 15,
  },
  // Desafio 17: slice() vs splice()
  {
    id: 'arr-adv-17',
    title: 'slice() vs splice()',
    description: 'slice() extrai sem modificar, splice() modifica o array original.',
    instructions: 'Use slice() para extrair elementos do índice 1 ao 3 em `sliced`. Crie uma cópia do array e use splice() para remover 2 elementos a partir do índice 1, guardando os removidos em `spliced`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `const plants = ['Rosa', 'Tulipa', 'Girassol', 'Margarida', 'Bromélia'];
// Extraia índice 1 até 3 (sem incluir 3)
const sliced = plants.slice(1, 3);
// Remova 2 elementos a partir do índice 1 (em uma cópia)
const plantsCopy = [...plants];
const spliced = `,
    expectedOutput: { sliced: ['Tulipa', 'Girassol'], spliced: ['Tulipa', 'Girassol'] },
    testCases: [
      { input: null, expected: { sliced: ['Tulipa', 'Girassol'], spliced: ['Tulipa', 'Girassol'] }, description: 'slice e splice corretos' }
    ],
    hints: [
      'slice(start, end) não inclui end',
      'splice(start, count) retorna os removidos',
      'plantsCopy.splice(1, 2)'
    ],
    experienceReward: 25,
  },
  // Desafio 18: concat()
  {
    id: 'arr-adv-18',
    title: 'Método concat()',
    description: 'concat() junta dois ou mais arrays sem modificar os originais.',
    instructions: 'Junte os arrays `flowers` e `trees` em `allPlants`. Depois adicione `shrubs` também em `garden`.',
    difficulty: 'beginner',
    concept: 'array-methods',
    starterCode: `const flowers = ['Rosa', 'Tulipa'];
const trees = ['Carvalho', 'Pinheiro'];
const shrubs = ['Azaleia'];
// Junte flowers e trees
const allPlants = flowers.concat(trees);
// Junte todos os três
const garden = `,
    expectedOutput: { allPlants: ['Rosa', 'Tulipa', 'Carvalho', 'Pinheiro'], garden: ['Rosa', 'Tulipa', 'Carvalho', 'Pinheiro', 'Azaleia'] },
    testCases: [
      { input: null, expected: { allPlants: ['Rosa', 'Tulipa', 'Carvalho', 'Pinheiro'], garden: ['Rosa', 'Tulipa', 'Carvalho', 'Pinheiro', 'Azaleia'] }, description: 'Arrays concatenados corretamente' }
    ],
    hints: [
      'concat() pode receber múltiplos arrays',
      'flowers.concat(trees, shrubs)',
      'Ou encadeie: flowers.concat(trees).concat(shrubs)'
    ],
    experienceReward: 15,
  },
  // Desafio 19: Array.from()
  {
    id: 'arr-adv-19',
    title: 'Array.from()',
    description: 'Array.from() cria arrays a partir de iteráveis ou com uma função de mapeamento.',
    instructions: 'Crie um array de 5 elementos (0 a 4) usando Array.from() em `numbers`. Depois crie um array de 5 elementos onde cada um é o dobro do índice em `doubled`.',
    difficulty: 'intermediate',
    concept: 'array-methods',
    starterCode: `// Crie [0, 1, 2, 3, 4]
const numbers = Array.from({ length: 5 }, (_, i) => i);
// Crie [0, 2, 4, 6, 8] (dobro do índice)
const doubled = `,
    expectedOutput: { numbers: [0, 1, 2, 3, 4], doubled: [0, 2, 4, 6, 8] },
    testCases: [
      { input: null, expected: { numbers: [0, 1, 2, 3, 4], doubled: [0, 2, 4, 6, 8] }, description: 'Arrays criados corretamente' }
    ],
    hints: [
      '{ length: n } cria um iterável de tamanho n',
      'O segundo argumento é uma função de mapeamento',
      '(_, i) => i * 2 dobra o índice'
    ],
    experienceReward: 25,
  },
  // Desafio 20: Array.isArray()
  {
    id: 'arr-adv-20',
    title: 'Array.isArray()',
    description: 'Array.isArray() verifica se um valor é um array.',
    instructions: 'Verifique se cada valor é um array e guarde os resultados em `isArr1`, `isArr2` e `isArr3`.',
    difficulty: 'beginner',
    concept: 'array-methods',
    starterCode: `const value1 = ['Rosa', 'Tulipa'];
const value2 = 'Rosa, Tulipa';
const value3 = { 0: 'Rosa', 1: 'Tulipa' };

const isArr1 = Array.isArray(value1);
const isArr2 = Array.isArray(value2);
const isArr3 = `,
    expectedOutput: { isArr1: true, isArr2: false, isArr3: false },
    testCases: [
      { input: null, expected: { isArr1: true, isArr2: false, isArr3: false }, description: 'Verificações corretas' }
    ],
    hints: [
      'Apenas arrays retornam true',
      'Strings e objetos retornam false',
      'Array.isArray(value3)'
    ],
    experienceReward: 15,
  },
  // Desafio 21: Encadeamento filter + map + reduce
  {
    id: 'arr-adv-21',
    title: 'Encadeamento: filter + map + reduce',
    description: 'Métodos de array podem ser encadeados para operações complexas.',
    instructions: 'Filtre plantas com water > 30, multiplique cada water por 2, depois some tudo. Guarde em `totalDoubledWater`.',
    difficulty: 'advanced',
    concept: 'array-methods',
    starterCode: `const plants = [
  { name: 'Rosa', water: 20 },
  { name: 'Tulipa', water: 50 },
  { name: 'Girassol', water: 40 },
  { name: 'Margarida', water: 25 }
];
// Filtre water > 30, dobre cada valor, some tudo
const totalDoubledWater = `,
    expectedOutput: 180,
    testCases: [
      { input: null, expected: 180, description: 'Total deve ser 180 ((50*2) + (40*2))' }
    ],
    hints: [
      'Primeiro filter: p => p.water > 30',
      'Depois map: p => p.water * 2',
      'Por fim reduce: (acc, val) => acc + val, 0'
    ],
    experienceReward: 35,
  },
  // Desafio 22: Encadeamento sort + slice - top N elementos
  {
    id: 'arr-adv-22',
    title: 'Encadeamento: Top N Elementos',
    description: 'Combine sort() e slice() para pegar os N melhores elementos.',
    instructions: 'Ordene as plantas por pontos (maior primeiro) e pegue as 3 melhores. Guarde em `top3`.',
    difficulty: 'advanced',
    concept: 'array-methods',
    starterCode: `const plants = [
  { name: 'Rosa', points: 85 },
  { name: 'Tulipa', points: 92 },
  { name: 'Girassol', points: 78 },
  { name: 'Margarida', points: 95 },
  { name: 'Bromélia', points: 88 }
];
// Pegue as 3 plantas com mais pontos
const top3 = `,
    expectedOutput: [
      { name: 'Margarida', points: 95 },
      { name: 'Tulipa', points: 92 },
      { name: 'Bromélia', points: 88 }
    ],
    testCases: [
      { input: null, expected: [
        { name: 'Margarida', points: 95 },
        { name: 'Tulipa', points: 92 },
        { name: 'Bromélia', points: 88 }
      ], description: 'Top 3 plantas por pontos' }
    ],
    hints: [
      'Primeiro ordene decrescente por points',
      'sort((a, b) => b.points - a.points)',
      'Depois use slice(0, 3)'
    ],
    experienceReward: 30,
  },
  // Desafio 23: Desafio combinado - análise de jardim completo
  {
    id: 'arr-adv-23',
    title: 'Análise Completa do Jardim',
    description: 'Use múltiplos métodos de array para analisar um jardim completo.',
    instructions: 'Crie um objeto `analysis` com: `totalPlants` (total), `healthyCount` (health > 50), `avgWater` (média de water), `plantNames` (array de nomes ordenados).',
    difficulty: 'advanced',
    concept: 'array-methods',
    starterCode: `const garden = [
  { name: 'Rosa', water: 60, health: 80 },
  { name: 'Tulipa', water: 40, health: 45 },
  { name: 'Girassol', water: 80, health: 90 },
  { name: 'Margarida', water: 30, health: 70 },
  { name: 'Bromélia', water: 50, health: 55 }
];

const analysis = {
  totalPlants: garden.length,
  healthyCount: garden.filter(p => p.health > 50).length,
  avgWater: garden.reduce((acc, p) => acc + p.water, 0) / garden.length,
  plantNames: `,
    expectedOutput: {
      totalPlants: 5,
      healthyCount: 4,
      avgWater: 52,
      plantNames: ['Bromélia', 'Girassol', 'Margarida', 'Rosa', 'Tulipa']
    },
    testCases: [
      { input: null, expected: {
        totalPlants: 5,
        healthyCount: 4,
        avgWater: 52,
        plantNames: ['Bromélia', 'Girassol', 'Margarida', 'Rosa', 'Tulipa']
      }, description: 'Análise completa do jardim' }
    ],
    hints: [
      'Use map() para extrair os nomes',
      'Depois sort() para ordenar alfabeticamente',
      'garden.map(p => p.name).sort()'
    ],
    experienceReward: 40,
  },
];
