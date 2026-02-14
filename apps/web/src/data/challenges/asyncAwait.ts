import type { ChallengeDefinition } from '../../types';

export const asyncAwaitChallenges: ChallengeDefinition[] = [
  // Desafio 1: Criar Promise basica
  {
    id: 'async-1',
    title: 'Primeira Promise',
    description:
      'Promise representa um valor que pode estar disponivel agora, depois, ou nunca. Crie uma variavel promise que e uma new Promise que resolve com o valor "Planta regada".',
    difficulty: 1,
    difficultyTier: 'beginner',
    plantType: 'async',
    experienceReward: 10,
    starterCode: `// Crie uma Promise que resolve com "Planta regada"
// new Promise((resolve, reject) => { ... })

`,
    solution: `let promise = new Promise((resolve, reject) => {
  resolve("Planta regada");
});`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Planta regada',
        description: 'Promise deve resolver com "Planta regada"',
      },
    ],
    hints: [
      'new Promise recebe uma funcao com resolve e reject',
      'resolve(valor) resolve a promise',
      'Chame resolve("Planta regada") dentro da funcao',
    ],
    conceptsUsed: ['Promise', 'resolve'],
  },

  // Desafio 2: Promise.resolve e Promise.reject
  {
    id: 'async-2',
    title: 'Promise.resolve e reject',
    description:
      'Promise.resolve e Promise.reject criam promises ja resolvidas/rejeitadas. Crie resolved com Promise.resolve(42) e rejected com Promise.reject("erro").',
    difficulty: 1,
    difficultyTier: 'beginner',
    plantType: 'async',
    experienceReward: 10,
    starterCode: `// Crie resolved = Promise.resolve(42)
// Crie rejected = Promise.reject("erro")

`,
    solution: `let resolved = Promise.resolve(42);
let rejected = Promise.reject("erro");`,
    testCases: [
      {
        input: null,
        expectedOutput: { resolvedValue: 42, rejectedReason: 'erro' },
        description: 'Promises devem ter valores corretos',
      },
    ],
    hints: [
      'Promise.resolve(valor) cria promise resolvida',
      'Promise.reject(motivo) cria promise rejeitada',
      'Sao atalhos para new Promise(...)',
    ],
    conceptsUsed: ['Promise.resolve', 'Promise.reject'],
  },

  // Desafio 3: .then() e .catch()
  {
    id: 'async-3',
    title: 'Then e Catch',
    description:
      '.then() executa quando a promise resolve, .catch() quando rejeita. Crie funcao handlePromise(p) que retorna p.then(v => v * 2).catch(e => 0).',
    difficulty: 2,
    difficultyTier: 'beginner',
    plantType: 'async',
    experienceReward: 10,
    starterCode: `// Crie handlePromise(p)
// Retorna p.then(v => v * 2).catch(e => 0)

`,
    solution: `function handlePromise(p) {
  return p.then(v => v * 2).catch(e => 0);
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { resolved: 20, rejected: 0 },
        description: 'then deve dobrar, catch deve retornar 0',
      },
    ],
    hints: [
      '.then(callback) recebe o valor resolvido',
      '.catch(callback) recebe o motivo da rejeicao',
      'Pode encadear .then().catch()',
    ],
    conceptsUsed: ['then', 'catch'],
  },

  // Desafio 4: Encadear .then()
  {
    id: 'async-4',
    title: 'Encadear Then',
    description:
      'Voce pode encadear multiplos .then(). Crie funcao processWater(p) que retorna p.then(v => v + 5).then(v => v * 2).then(v => "Total: " + v).',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'async',
    experienceReward: 20,
    starterCode: `// Crie processWater(p)
// p.then(+5).then(*2).then(formatar)

`,
    solution: `function processWater(p) {
  return p.then(v => v + 5).then(v => v * 2).then(v => "Total: " + v);
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Total: 30',
        description: '10 + 5 = 15, 15 * 2 = 30',
      },
    ],
    hints: [
      'Cada .then() recebe o resultado do anterior',
      'O valor passa por cada transformacao',
      '10 -> 15 -> 30 -> "Total: 30"',
    ],
    conceptsUsed: ['then', 'encadeamento'],
  },

  // Desafio 5: Async function basica
  {
    id: 'async-5',
    title: 'Async Function',
    description:
      'async transforma uma funcao para retornar Promise. Crie async function getPlantName() que retorna "Rosa". O retorno vira Promise automaticamente.',
    difficulty: 2,
    difficultyTier: 'beginner',
    plantType: 'async',
    experienceReward: 10,
    starterCode: `// Crie async function getPlantName()
// Retorne "Rosa"

`,
    solution: `async function getPlantName() {
  return "Rosa";
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Rosa',
        description: 'Async function deve retornar "Rosa"',
      },
    ],
    hints: [
      'Adicione async antes de function',
      'O return vira Promise.resolve automaticamente',
      'async function sempre retorna Promise',
    ],
    conceptsUsed: ['async'],
  },

  // Desafio 6: Await basico
  {
    id: 'async-6',
    title: 'Await Basico',
    description:
      'await pausa a execucao ate a Promise resolver. Crie async function getWater() que faz await Promise.resolve(10) e retorna o valor + 5.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'async',
    experienceReward: 20,
    starterCode: `// Crie async function getWater()
// let water = await Promise.resolve(10)
// return water + 5

`,
    solution: `async function getWater() {
  let water = await Promise.resolve(10);
  return water + 5;
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 15,
        description: 'await deve esperar e retornar 15',
      },
    ],
    hints: [
      'await so funciona dentro de async function',
      'await "desembrulha" a Promise',
      'O codigo continua apos a Promise resolver',
    ],
    conceptsUsed: ['async', 'await'],
  },

  // Desafio 7: Try/catch com async/await
  {
    id: 'async-7',
    title: 'Try/Catch Async',
    description:
      'Use try/catch para capturar erros em async/await. Crie async function safeFetch(promise) que em try faz await promise, em catch retorna "erro".',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'async',
    experienceReward: 20,
    starterCode: `// Crie async function safeFetch(promise)
// try: return await promise
// catch: return "erro"

`,
    solution: `async function safeFetch(promise) {
  try {
    return await promise;
  } catch (e) {
    return "erro";
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { success: 'dados', error: 'erro' },
        description: 'Deve retornar valor ou "erro"',
      },
    ],
    hints: [
      'try/catch funciona normalmente com await',
      'Se a promise rejeitar, vai para catch',
      'Mais legivel que .then().catch()',
    ],
    conceptsUsed: ['async', 'await', 'try', 'catch'],
  },

  // Desafio 8: Finally com async
  {
    id: 'async-8',
    title: 'Finally Async',
    description:
      'finally executa sempre, com ou sem erro. Crie async function withCleanup(promise) que tem try/catch/finally. Finally define cleanup = true. Retorne { result, cleanup }.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'async',
    experienceReward: 20,
    starterCode: `// Crie async function withCleanup(promise)
// let cleanup = false
// try: result = await promise
// catch: result = "erro"
// finally: cleanup = true
// return { result, cleanup }

`,
    solution: `async function withCleanup(promise) {
  let cleanup = false;
  let result;
  try {
    result = await promise;
  } catch (e) {
    result = "erro";
  } finally {
    cleanup = true;
  }
  return { result: result, cleanup: cleanup };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { successCase: { result: 'ok', cleanup: true }, errorCase: { result: 'erro', cleanup: true } },
        description: 'finally deve sempre executar',
      },
    ],
    hints: [
      'finally executa apos try ou catch',
      'Use para limpar recursos',
      'cleanup sera true em ambos os casos',
    ],
    conceptsUsed: ['async', 'await', 'finally'],
  },

  // Desafio 9: Promise.all
  {
    id: 'async-9',
    title: 'Promise.all',
    description:
      'Promise.all espera todas as promises resolverem. Crie async function getAllWater() que faz await Promise.all([Promise.resolve(5), Promise.resolve(10), Promise.resolve(15)]) e retorna a soma.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'async',
    experienceReward: 20,
    starterCode: `// Crie async function getAllWater()
// let waters = await Promise.all([...])
// return soma dos valores

`,
    solution: `async function getAllWater() {
  let waters = await Promise.all([
    Promise.resolve(5),
    Promise.resolve(10),
    Promise.resolve(15)
  ]);
  return waters[0] + waters[1] + waters[2];
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 30,
        description: 'Soma deve ser 30',
      },
    ],
    hints: [
      'Promise.all recebe array de promises',
      'Retorna array com todos os valores',
      'Se uma falhar, todas falham',
    ],
    conceptsUsed: ['Promise.all', 'await'],
  },

  // Desafio 10: Promise.race
  {
    id: 'async-10',
    title: 'Promise.race',
    description:
      'Promise.race retorna a primeira promise a resolver/rejeitar. Crie funcao race(p1, p2) que retorna Promise.race([p1, p2]).',
    difficulty: 4,
    difficultyTier: 'practitioner',
    plantType: 'async',
    experienceReward: 20,
    starterCode: `// Crie function race(p1, p2)
// return Promise.race([p1, p2])

`,
    solution: `function race(p1, p2) {
  return Promise.race([p1, p2]);
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'primeira',
        description: 'Deve retornar a primeira a resolver',
      },
    ],
    hints: [
      'race retorna a mais rapida',
      'Nao importa se resolve ou rejeita',
      'Util para timeouts',
    ],
    conceptsUsed: ['Promise.race'],
  },

  // Desafio 11: Promise.allSettled
  {
    id: 'async-11',
    title: 'Promise.allSettled',
    description:
      'allSettled espera todas completarem, sem falhar. Crie async function checkAll(promises) que retorna await Promise.allSettled(promises) e conta quantas foram fulfilled.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'async',
    experienceReward: 35,
    starterCode: `// Crie async function checkAll(promises)
// let results = await Promise.allSettled(promises)
// return quantidade de results com status "fulfilled"

`,
    solution: `async function checkAll(promises) {
  let results = await Promise.allSettled(promises);
  return results.filter(r => r.status === "fulfilled").length;
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 2,
        description: 'Deve contar fulfilled corretamente',
      },
    ],
    hints: [
      'allSettled nunca rejeita',
      'Cada resultado tem { status, value/reason }',
      'status e "fulfilled" ou "rejected"',
    ],
    conceptsUsed: ['Promise.allSettled'],
  },

  // Desafio 12: Promise.any
  {
    id: 'async-12',
    title: 'Promise.any',
    description:
      'Promise.any retorna a primeira promise a resolver com sucesso (ignora rejeicoes). Crie funcao firstSuccess(promises) que retorna Promise.any(promises).',
    difficulty: 4,
    difficultyTier: 'practitioner',
    plantType: 'async',
    experienceReward: 20,
    starterCode: `// Crie function firstSuccess(promises)
// return Promise.any(promises)

`,
    solution: `function firstSuccess(promises) {
  return Promise.any(promises);
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'sucesso',
        description: 'Deve retornar primeiro sucesso',
      },
    ],
    hints: [
      'any ignora promises rejeitadas',
      'Retorna a primeira a resolver com sucesso',
      'So falha se TODAS falharem',
    ],
    conceptsUsed: ['Promise.any'],
  },

  // Desafio 13: Async em loops
  {
    id: 'async-13',
    title: 'Async em Loop',
    description:
      'Use for...of com await para processar sequencialmente. Crie async function sumWaters(promises) que faz loop for...of, await cada promise e soma os valores.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'async',
    experienceReward: 35,
    starterCode: `// Crie async function sumWaters(promises)
// let total = 0
// for (let p of promises): total += await p
// return total

`,
    solution: `async function sumWaters(promises) {
  let total = 0;
  for (let p of promises) {
    total += await p;
  }
  return total;
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 30,
        description: 'Soma sequencial deve ser 30',
      },
    ],
    hints: [
      'for...of permite await dentro do loop',
      'Cada iteracao espera a anterior',
      'Diferente de Promise.all (paralelo)',
    ],
    conceptsUsed: ['async', 'await', 'for...of'],
  },

  // Desafio 14: Paralelo vs Sequencial
  {
    id: 'async-14',
    title: 'Paralelo vs Sequencial',
    description:
      'Crie duas funcoes: sequential(p1, p2) que await p1, depois await p2 e retorna array; parallel(p1, p2) que usa Promise.all. Ambas retornam [result1, result2].',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'async',
    experienceReward: 35,
    starterCode: `// Crie async function sequential(p1, p2)
// r1 = await p1, r2 = await p2, return [r1, r2]

// Crie async function parallel(p1, p2)
// return await Promise.all([p1, p2])

`,
    solution: `async function sequential(p1, p2) {
  let r1 = await p1;
  let r2 = await p2;
  return [r1, r2];
}

async function parallel(p1, p2) {
  return await Promise.all([p1, p2]);
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { sequential: [1, 2], parallel: [1, 2] },
        description: 'Ambas devem retornar [1, 2]',
      },
    ],
    hints: [
      'Sequential: uma de cada vez',
      'Parallel: todas ao mesmo tempo',
      'Promise.all e mais rapido se independentes',
    ],
    conceptsUsed: ['async', 'await', 'Promise.all'],
  },

  // Desafio 15: Sistema de rega assincrono (combinado)
  {
    id: 'async-15',
    title: 'Sistema de Rega Async',
    description:
      'Crie async function waterGarden(plants) que para cada planta: await fetchWater(plant), adiciona water ao total. Retorna { totalWater, plantsWatered }. fetchWater retorna Promise com plant.water.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'async',
    experienceReward: 35,
    starterCode: `// Funcao auxiliar
function fetchWater(plant) {
  return Promise.resolve(plant.water);
}

// Crie async function waterGarden(plants)
// Para cada planta, await fetchWater e soma
// Retorne { totalWater, plantsWatered: plants.length }

`,
    solution: `function fetchWater(plant) {
  return Promise.resolve(plant.water);
}

async function waterGarden(plants) {
  let totalWater = 0;
  for (let plant of plants) {
    let water = await fetchWater(plant);
    totalWater += water;
  }
  return { totalWater: totalWater, plantsWatered: plants.length };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { totalWater: 30, plantsWatered: 3 },
        description: 'Deve somar agua de todas plantas',
      },
    ],
    hints: [
      'Use for...of para iterar plants',
      'await fetchWater(plant) retorna plant.water',
      'Conte plants.length para plantsWatered',
    ],
    conceptsUsed: ['async', 'await', 'for...of', 'Promise'],
  },
];

export const getAsyncAwaitChallengeById = (id: string): ChallengeDefinition | undefined => {
  return asyncAwaitChallenges.find((c) => c.id === id);
};
