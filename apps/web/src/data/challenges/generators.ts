import type { ChallengeDefinition } from '../../types';

export const generatorChallenges: ChallengeDefinition[] = [
  // Desafio 1: function* syntax basica
  {
    id: 'gen-1',
    plantType: 'generator',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Primeira Generator Function',
    description: 'Crie sua primeira funcao geradora.',
    instructions: `Generators sao funcoes especiais que podem pausar e retomar sua execucao.
Elas sao declaradas com function* (asterisco apos function).

Crie uma generator function chamada 'plantGenerator' que usa yield para produzir os valores "semente", "broto", "planta" em sequencia.`,
    starterCode: `// Crie a generator function plantGenerator
// Use yield para cada estagio

`,
    testCases: [
      {
        input: null,
        expectedOutput: ['semente', 'broto', 'planta'],
        description: 'Generator deve produzir os tres estagios',
      },
    ],
    hints: [
      'Use function* para declarar um generator',
      'yield "valor" pausa e retorna o valor',
      'Cada yield produz um valor na sequencia',
    ],
    solution: `function* plantGenerator() {
  yield "semente";
  yield "broto";
  yield "planta";
}`,
    experienceReward: 20,
  },

  // Desafio 2: yield simples
  {
    id: 'gen-2',
    plantType: 'generator',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Usando yield',
    description: 'Entenda como yield pausa a execucao.',
    instructions: `yield pausa o generator e retorna um valor.
Quando next() e chamado novamente, a execucao continua de onde parou.

Crie um generator 'wateringCycle' que:
1. yield "Verificando solo"
2. yield "Regando"
3. yield "Drenando excesso"
4. return "Ciclo completo"

Note: return termina o generator com done: true`,
    starterCode: `// Crie wateringCycle generator

`,
    testCases: [
      {
        input: null,
        expectedOutput: { values: ['Verificando solo', 'Regando', 'Drenando excesso'], final: 'Ciclo completo' },
        description: 'Generator deve produzir todos os passos',
      },
    ],
    hints: [
      'Cada yield e um ponto de pausa',
      'return finaliza o generator',
      'done sera true apos o return',
    ],
    solution: `function* wateringCycle() {
  yield "Verificando solo";
  yield "Regando";
  yield "Drenando excesso";
  return "Ciclo completo";
}`,
    experienceReward: 25,
  },

  // Desafio 3: next() e value
  {
    id: 'gen-3',
    plantType: 'generator',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Metodo next()',
    description: 'Use next() para consumir valores do generator.',
    instructions: `Chamar um generator retorna um iterator.
O metodo next() retorna { value: ..., done: boolean }.

Crie um generator 'countPlants' que yield 1, 2, 3.
Crie uma funcao 'consumeAll' que recebe um generator e retorna um array com todos os values ate done ser true.`,
    starterCode: `// Crie countPlants generator

// Crie consumeAll(gen) que coleta todos os valores

`,
    testCases: [
      {
        input: null,
        expectedOutput: [1, 2, 3],
        description: 'consumeAll deve coletar todos os valores',
      },
    ],
    hints: [
      'next() retorna { value, done }',
      'Use while (!result.done) para iterar',
      'Adicione result.value ao array a cada iteracao',
    ],
    solution: `function* countPlants() {
  yield 1;
  yield 2;
  yield 3;
}

function consumeAll(gen) {
  const values = [];
  let result = gen.next();
  while (!result.done) {
    values.push(result.value);
    result = gen.next();
  }
  return values;
}`,
    experienceReward: 30,
  },

  // Desafio 4: Generator que retorna valores finitos
  {
    id: 'gen-4',
    plantType: 'generator',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Generator Finito',
    description: 'Crie um generator que produz uma quantidade finita de valores.',
    instructions: `Generators podem usar loops para produzir valores.

Crie um generator 'growthStages' que recebe um numero 'count' e yield os estagios de crescimento de 1 ate count.
Cada yield deve ser "Estagio " + numero.

Exemplo: growthStages(3) produz "Estagio 1", "Estagio 2", "Estagio 3"`,
    starterCode: `// Crie growthStages(count) generator

`,
    testCases: [
      {
        input: null,
        expectedOutput: ['Estagio 1', 'Estagio 2', 'Estagio 3', 'Estagio 4'],
        description: 'growthStages(4) deve produzir 4 estagios',
      },
    ],
    hints: [
      'Use for loop dentro do generator',
      'yield pode estar dentro de loops',
      'for (let i = 1; i <= count; i++) { yield ... }',
    ],
    solution: `function* growthStages(count) {
  for (let i = 1; i <= count; i++) {
    yield "Estagio " + i;
  }
}`,
    experienceReward: 25,
  },

  // Desafio 5: Generator infinito
  {
    id: 'gen-5',
    plantType: 'generator',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Generator Infinito',
    description: 'Crie um generator que produz valores infinitamente.',
    instructions: `Generators podem ser infinitos porque so produzem valores quando solicitados (lazy evaluation).

Crie um generator 'infiniteWater' que comeca em 0 e incrementa infinitamente.
Cada yield deve ser "Gota " + numero.

Cuidado: nunca consuma todo um generator infinito! Use take() para limitar.

Crie tambem 'take(gen, n)' que retorna os primeiros n valores de um generator.`,
    starterCode: `// Crie infiniteWater generator (infinito!)

// Crie take(gen, n) para pegar n valores

`,
    testCases: [
      {
        input: null,
        expectedOutput: ['Gota 0', 'Gota 1', 'Gota 2'],
        description: 'take(infiniteWater(), 3) deve retornar 3 gotas',
      },
    ],
    hints: [
      'while (true) cria um loop infinito',
      'yield dentro do loop produz valores sob demanda',
      'take() deve parar apos n iteracoes',
    ],
    solution: `function* infiniteWater() {
  let count = 0;
  while (true) {
    yield "Gota " + count;
    count++;
  }
}

function take(gen, n) {
  const values = [];
  for (let i = 0; i < n; i++) {
    const result = gen.next();
    if (result.done) break;
    values.push(result.value);
  }
  return values;
}`,
    experienceReward: 35,
  },

  // Desafio 6: yield* para delegar
  {
    id: 'gen-6',
    plantType: 'generator',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'yield* Delegacao',
    description: 'Delegue para outro generator ou iteravel com yield*.',
    instructions: `yield* delega para outro iteravel, produzindo todos os seus valores.

Crie generator 'seeds' que yield "semente1", "semente2".
Crie generator 'flowers' que yield "flor1", "flor2".
Crie generator 'garden' que usa yield* para produzir primeiro todas as sementes, depois todas as flores.`,
    starterCode: `// Crie seeds generator

// Crie flowers generator

// Crie garden que delega para ambos

`,
    testCases: [
      {
        input: null,
        expectedOutput: ['semente1', 'semente2', 'flor1', 'flor2'],
        description: 'garden deve produzir sementes e depois flores',
      },
    ],
    hints: [
      'yield* seeds() delega para o generator seeds',
      'yield* tambem funciona com arrays: yield* [1, 2, 3]',
      'A execucao continua apos yield* terminar',
    ],
    solution: `function* seeds() {
  yield "semente1";
  yield "semente2";
}

function* flowers() {
  yield "flor1";
  yield "flor2";
}

function* garden() {
  yield* seeds();
  yield* flowers();
}`,
    experienceReward: 35,
  },

  // Desafio 7: Passar valores para next()
  {
    id: 'gen-7',
    plantType: 'generator',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Comunicacao Bidirecional',
    description: 'Passe valores para dentro do generator via next().',
    instructions: `next(value) pode passar um valor para o generator.
O valor passado se torna o resultado da expressao yield.

Crie um generator 'plantConversation' que:
1. yield "Qual e o nome da planta?" e recebe o nome
2. yield "Quanto de agua? (em ml)" e recebe a quantidade
3. return { name: nome, water: quantidade }

A primeira chamada next() inicia o generator, as seguintes passam valores.`,
    starterCode: `// Crie plantConversation generator
// Use o valor retornado por yield

`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Rosa', water: 100 },
        description: 'Generator deve coletar e retornar os dados',
      },
    ],
    hints: [
      'const name = yield "pergunta" captura o valor passado',
      'Primeiro next() inicia, segundo next("Rosa") passa o nome',
      'return finaliza com { name, water }',
    ],
    solution: `function* plantConversation() {
  const name = yield "Qual e o nome da planta?";
  const water = yield "Quanto de agua? (em ml)";
  return { name, water };
}`,
    experienceReward: 40,
  },

  // Desafio 8: return() em generator
  {
    id: 'gen-8',
    plantType: 'generator',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Metodo return()',
    description: 'Finalize um generator prematuramente com return().',
    instructions: `gen.return(value) finaliza o generator e retorna { value, done: true }.
Qualquer bloco finally sera executado antes de finalizar.

Crie um generator 'gardenTour' com try/finally que:
- try: yield "Entrada", "Rosas", "Tulipas", "Saida"
- finally: yield "Limpando jardim"

Se return() for chamado apos "Rosas", deve executar finally antes de terminar.`,
    starterCode: `// Crie gardenTour generator com try/finally

`,
    testCases: [
      {
        input: null,
        expectedOutput: { beforeReturn: ['Entrada', 'Rosas'], afterReturn: 'Limpando jardim' },
        description: 'return() deve executar finally',
      },
    ],
    hints: [
      'try { yield ... } finally { yield ... }',
      'finally sempre executa, mesmo com return()',
      'return("valor") define o valor final',
    ],
    solution: `function* gardenTour() {
  try {
    yield "Entrada";
    yield "Rosas";
    yield "Tulipas";
    yield "Saida";
  } finally {
    yield "Limpando jardim";
  }
}`,
    experienceReward: 40,
  },

  // Desafio 9: throw() em generator
  {
    id: 'gen-9',
    plantType: 'generator',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Metodo throw()',
    description: 'Lance excecoes dentro do generator com throw().',
    instructions: `gen.throw(error) lanca uma excecao no ponto do yield atual.
Se o generator tiver try/catch, pode capturar o erro.

Crie um generator 'resilientPlant' com try/catch que:
- yield "Crescendo"
- Se receber erro via throw(), catch yield "Recuperando de: " + error.message
- yield "Florescendo"

O generator deve continuar apos capturar o erro!`,
    starterCode: `// Crie resilientPlant generator com try/catch

`,
    testCases: [
      {
        input: null,
        expectedOutput: ['Crescendo', 'Recuperando de: Seca!', 'Florescendo'],
        description: 'Generator deve se recuperar do erro',
      },
    ],
    hints: [
      'Use try { yield... } catch (e) { yield... }',
      'O catch pode usar yield para continuar produzindo',
      'throw() lanca o erro no ponto do yield',
    ],
    solution: `function* resilientPlant() {
  try {
    yield "Crescendo";
  } catch (e) {
    yield "Recuperando de: " + e.message;
  }
  yield "Florescendo";
}`,
    experienceReward: 40,
  },

  // Desafio 10: Iterator protocol - Symbol.iterator
  {
    id: 'gen-10',
    plantType: 'generator',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Iterator Protocol',
    description: 'Implemente o protocolo iterator em um objeto.',
    instructions: `Objetos podem ser iteraveis implementando [Symbol.iterator].
Este metodo deve retornar um iterator com metodo next().

Crie um objeto 'plantCollection' com:
- plants: ["Rosa", "Tulipa", "Lirio"]
- [Symbol.iterator]: um generator que yield cada planta

Isso permite usar for...of com plantCollection!`,
    starterCode: `// Crie plantCollection com Symbol.iterator

`,
    testCases: [
      {
        input: null,
        expectedOutput: ['Rosa', 'Tulipa', 'Lirio'],
        description: 'for...of deve iterar sobre plantCollection',
      },
    ],
    hints: [
      '[Symbol.iterator] pode ser um generator method',
      '*[Symbol.iterator]() { ... } define um generator',
      'Use for...of this.plants e yield cada item',
    ],
    solution: `const plantCollection = {
  plants: ["Rosa", "Tulipa", "Lirio"],
  *[Symbol.iterator]() {
    for (const plant of this.plants) {
      yield plant;
    }
  }
};`,
    experienceReward: 45,
  },

  // Desafio 11: Criar iterador customizado
  {
    id: 'gen-11',
    plantType: 'generator',
    difficulty: 5,
    difficultyTier: 'master',
    title: 'Iterador Customizado',
    description: 'Crie uma classe com iterador customizado.',
    instructions: `Crie uma classe 'GardenBed' que:
- Constructor recebe um array de plantas
- Tem metodo add(plant) para adicionar plantas
- Implementa [Symbol.iterator] como generator
- O iterator filtra e retorna apenas plantas com length > 4

Exemplo: new GardenBed(["Rosa", "Samambaia", "Ipe"])
Iterando: apenas "Samambaia" (length 9 > 4)`,
    starterCode: `// Crie a classe GardenBed com iterador customizado

`,
    testCases: [
      {
        input: null,
        expectedOutput: ['Samambaia', 'Orquidea'],
        description: 'Deve iterar apenas plantas com nome > 4 caracteres',
      },
    ],
    hints: [
      'class GardenBed { *[Symbol.iterator]() { ... } }',
      'Filtre com if (plant.length > 4) yield plant',
      'Use for...of this.plants no iterator',
    ],
    solution: `class GardenBed {
  constructor(plants = []) {
    this.plants = plants;
  }

  add(plant) {
    this.plants.push(plant);
  }

  *[Symbol.iterator]() {
    for (const plant of this.plants) {
      if (plant.length > 4) {
        yield plant;
      }
    }
  }
}`,
    experienceReward: 50,
  },

  // Desafio 12: Generator para Fibonacci
  {
    id: 'gen-12',
    plantType: 'generator',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Generator Fibonacci',
    description: 'Crie um generator que produz a sequencia de Fibonacci.',
    instructions: `A sequencia de Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13...
Cada numero e a soma dos dois anteriores.

Crie um generator 'fibonacci' infinito.
Crie 'takeFib(n)' que retorna os primeiros n numeros de Fibonacci.

Exemplo: takeFib(7) retorna [0, 1, 1, 2, 3, 5, 8]`,
    starterCode: `// Crie fibonacci generator (infinito)

// Crie takeFib(n) para pegar n numeros

`,
    testCases: [
      {
        input: null,
        expectedOutput: [0, 1, 1, 2, 3, 5, 8],
        description: 'takeFib(7) deve retornar os 7 primeiros Fibonacci',
      },
    ],
    hints: [
      'Comece com a = 0, b = 1',
      'Cada iteracao: yield a, [a, b] = [b, a + b]',
      'while (true) para generator infinito',
    ],
    solution: `function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function takeFib(n) {
  const fib = fibonacci();
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(fib.next().value);
  }
  return result;
}`,
    experienceReward: 45,
  },

  // Desafio 13: Sequencia de crescimento (combinado)
  {
    id: 'gen-13',
    plantType: 'generator',
    difficulty: 5,
    difficultyTier: 'master',
    title: 'Sequencia de Crescimento',
    description: 'Crie um sistema completo de simulacao de crescimento.',
    instructions: `Crie um sistema de simulacao de crescimento de plantas usando generators:

1. Generator 'growthSimulator(plantName, maxDays)' que:
   - Simula dias de crescimento de 1 ate maxDays
   - Cada dia yield um objeto: { day, height, status }
   - height comeca em 1 e dobra a cada dia
   - status: "semente" (day 1-2), "broto" (day 3-4), "crescendo" (day 5-6), "maduro" (day 7+)

2. Generator 'multiPlantGarden' que:
   - Recebe array de { name, days }
   - Usa yield* para delegar para growthSimulator de cada planta
   - Antes de cada planta, yield { event: "plantando", name }

3. Funcao 'simulateGarden(plants)' que coleta todos os eventos em um array.`,
    starterCode: `// Crie growthSimulator(plantName, maxDays) generator

// Crie multiPlantGarden(plants) generator

// Crie simulateGarden(plants) que coleta eventos

`,
    testCases: [
      {
        input: null,
        expectedOutput: {
          totalEvents: 5,
          firstEvent: { event: 'plantando', name: 'Rosa' },
          lastHeight: 4,
        },
        description: 'Sistema deve simular crescimento corretamente',
      },
    ],
    hints: [
      'height = Math.pow(2, day - 1) ou 1 << (day - 1)',
      'yield* growthSimulator(p.name, p.days) delega',
      'Determine status baseado no numero do dia',
    ],
    solution: `function* growthSimulator(plantName, maxDays) {
  for (let day = 1; day <= maxDays; day++) {
    const height = Math.pow(2, day - 1);
    let status;
    if (day <= 2) status = "semente";
    else if (day <= 4) status = "broto";
    else if (day <= 6) status = "crescendo";
    else status = "maduro";

    yield { day, height, status, plant: plantName };
  }
}

function* multiPlantGarden(plants) {
  for (const p of plants) {
    yield { event: "plantando", name: p.name };
    yield* growthSimulator(p.name, p.days);
  }
}

function simulateGarden(plants) {
  const events = [];
  for (const event of multiPlantGarden(plants)) {
    events.push(event);
  }
  return events;
}`,
    experienceReward: 75,
  },
];

export const getGeneratorChallengeById = (id: string): ChallengeDefinition | undefined => {
  return generatorChallenges.find((c) => c.id === id);
};
