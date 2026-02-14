import type { ChallengeDefinition } from '../../types';

export const closuresChallenges: ChallengeDefinition[] = [
  // Desafio 1: Entender escopo de bloco
  {
    id: 'closure-1',
    title: 'Escopo de Bloco',
    description:
      'let e const tem escopo de bloco - existem apenas dentro das chaves {}. Crie um bloco que declara let water = 10 dentro, e fora declare let water = 5. Retorne o water externo em result.',
    difficulty: 1,
    difficultyTier: 'beginner',
    plantType: 'closure',
    experienceReward: 10,
    starterCode: `// Declare let water = 5 fora do bloco
// Crie um bloco { } com let water = 10 dentro
// result deve ser o water externo (5)

`,
    solution: `let water = 5;
{
  let water = 10;
}
let result = water;`,
    testCases: [
      {
        input: null,
        expectedOutput: 5,
        description: 'result deve ser 5 (water externo)',
      },
    ],
    hints: [
      'let tem escopo de bloco',
      'O water interno nao afeta o externo',
      'Blocos sao criados com { }',
    ],
    conceptsUsed: ['let', 'block scope'],
  },

  // Desafio 2: Escopo de funcao (var)
  {
    id: 'closure-2',
    title: 'Escopo de Funcao',
    description:
      'var tem escopo de funcao, nao de bloco. Crie uma funcao getWater() que tem um if(true) com var water = 10 dentro, e retorna water fora do if.',
    difficulty: 1,
    difficultyTier: 'beginner',
    plantType: 'closure',
    experienceReward: 10,
    starterCode: `// Crie funcao getWater
// Dentro: if(true) { var water = 10; }
// Retorne water (fora do if)

`,
    solution: `function getWater() {
  if (true) {
    var water = 10;
  }
  return water;
}
let result = getWater();`,
    testCases: [
      {
        input: null,
        expectedOutput: 10,
        description: 'var deve estar acessivel fora do bloco if',
      },
    ],
    hints: [
      'var ignora blocos if/for/while',
      'var so respeita escopo de funcao',
      'water esta disponivel em toda a funcao',
    ],
    conceptsUsed: ['var', 'function scope'],
  },

  // Desafio 3: Lexical scope basico
  {
    id: 'closure-3',
    title: 'Escopo Lexico',
    description:
      'Funcoes internas acessam variaveis externas. Crie let plantName = "Rosa" e uma funcao inner() que retorna plantName. Chame inner() e armazene em result.',
    difficulty: 2,
    difficultyTier: 'beginner',
    plantType: 'closure',
    experienceReward: 10,
    starterCode: `// Declare let plantName = "Rosa"
// Crie funcao inner() que retorna plantName
// result = inner()

`,
    solution: `let plantName = "Rosa";

function inner() {
  return plantName;
}

let result = inner();`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Rosa',
        description: 'inner() deve acessar plantName externo',
      },
    ],
    hints: [
      'Funcoes "enxergam" variaveis do escopo pai',
      'Isso se chama escopo lexico',
      'inner pode usar plantName mesmo sem receber como parametro',
    ],
    conceptsUsed: ['lexical scope', 'funcoes'],
  },

  // Desafio 4: Closure simples
  {
    id: 'closure-4',
    title: 'Closure Simples',
    description:
      'Closure e quando uma funcao "lembra" variaveis do escopo onde foi criada. Crie uma funcao createGreeter(name) que retorna uma funcao que retorna "Ola, " + name.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'closure',
    experienceReward: 20,
    starterCode: `// Crie createGreeter(name)
// Retorna uma funcao que retorna "Ola, " + name

`,
    solution: `function createGreeter(name) {
  return function() {
    return "Ola, " + name;
  };
}`,
    testCases: [
      {
        input: 'Rosa',
        expectedOutput: 'Ola, Rosa',
        description: 'createGreeter("Rosa")() deve retornar "Ola, Rosa"',
      },
    ],
    hints: [
      'A funcao interna "lembra" o parametro name',
      'Retorne uma funcao anonima',
      'return function() { return "Ola, " + name; }',
    ],
    conceptsUsed: ['closure', 'funcao retornando funcao'],
  },

  // Desafio 5: Closure com variavel privada
  {
    id: 'closure-5',
    title: 'Variavel Privada',
    description:
      'Closures podem criar variaveis "privadas". Crie createCounter() que retorna um objeto com metodo increment() que incrementa e retorna um contador interno.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'closure',
    experienceReward: 20,
    starterCode: `// Crie createCounter()
// let count = 0 interno
// Retorna { increment: funcao que incrementa e retorna count }

`,
    solution: `function createCounter() {
  let count = 0;
  return {
    increment: function() {
      count++;
      return count;
    }
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { first: 1, second: 2, third: 3 },
        description: 'increment() deve incrementar contador privado',
      },
    ],
    hints: [
      'let count = 0 e a variavel privada',
      'O objeto retornado tem acesso a count via closure',
      'Cada chamada de increment() modifica count',
    ],
    conceptsUsed: ['closure', 'private variable', 'modulo'],
  },

  // Desafio 6: Counter completo
  {
    id: 'closure-6',
    title: 'Counter com Closure',
    description:
      'Crie createWaterTank(initial) que retorna um objeto com: add(amount), remove(amount), e getLevel(). O nivel nao pode ficar negativo.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'closure',
    experienceReward: 20,
    starterCode: `// Crie createWaterTank(initial)
// let level = initial
// Retorna { add, remove, getLevel }
// remove nao deixa level ficar < 0

`,
    solution: `function createWaterTank(initial) {
  let level = initial;
  return {
    add: function(amount) {
      level += amount;
      return level;
    },
    remove: function(amount) {
      level = Math.max(0, level - amount);
      return level;
    },
    getLevel: function() {
      return level;
    }
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { afterAdd: 15, afterRemove: 5, afterBigRemove: 0 },
        description: 'Tank deve gerenciar nivel corretamente',
      },
    ],
    hints: [
      'Math.max(0, value) garante minimo de 0',
      'Cada metodo acessa level via closure',
      'level e "privado" - so acessivel pelos metodos',
    ],
    conceptsUsed: ['closure', 'encapsulamento'],
  },

  // Desafio 7: Factory function
  {
    id: 'closure-7',
    title: 'Factory Function',
    description:
      'Factory functions criam objetos com closures. Crie createPlant(name) que retorna objeto com getName(), water(amount), e getWater(). Comeca com waterLevel = 0.',
    difficulty: 4,
    difficultyTier: 'practitioner',
    plantType: 'closure',
    experienceReward: 20,
    starterCode: `// Crie createPlant(name)
// waterLevel = 0 interno
// Retorna { getName, water, getWater }

`,
    solution: `function createPlant(name) {
  let waterLevel = 0;
  return {
    getName: function() {
      return name;
    },
    water: function(amount) {
      waterLevel += amount;
    },
    getWater: function() {
      return waterLevel;
    }
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Rosa', water: 15 },
        description: 'Factory deve criar planta funcional',
      },
    ],
    hints: [
      'name vem do parametro (closure)',
      'waterLevel e variavel local (closure)',
      'Cada metodo forma uma closure sobre estas variaveis',
    ],
    conceptsUsed: ['closure', 'factory function'],
  },

  // Desafio 8: Module pattern
  {
    id: 'closure-8',
    title: 'Module Pattern',
    description:
      'O module pattern usa IIFE + closure. Crie gardenModule como IIFE que tem plants = [] interno, e retorna { addPlant, getPlants, getCount }.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'closure',
    experienceReward: 35,
    starterCode: `// Crie gardenModule como IIFE
// (function() { ... })()
// plants = [] interno
// Retorna { addPlant(name), getPlants(), getCount() }

`,
    solution: `const gardenModule = (function() {
  let plants = [];
  return {
    addPlant: function(name) {
      plants.push(name);
    },
    getPlants: function() {
      return [...plants];
    },
    getCount: function() {
      return plants.length;
    }
  };
})();`,
    testCases: [
      {
        input: null,
        expectedOutput: { plants: ['Rosa', 'Tulipa'], count: 2 },
        description: 'Module deve encapsular plants',
      },
    ],
    hints: [
      'IIFE: (function() { ... })()',
      '[...plants] retorna copia do array',
      'O modulo e executado imediatamente',
    ],
    conceptsUsed: ['closure', 'IIFE', 'module pattern'],
  },

  // Desafio 9: IIFE
  {
    id: 'closure-9',
    title: 'IIFE',
    description:
      'IIFE (Immediately Invoked Function Expression) executa imediatamente. Crie result usando IIFE que declara let secret = 42 e retorna secret * 2.',
    difficulty: 4,
    difficultyTier: 'practitioner',
    plantType: 'closure',
    experienceReward: 20,
    starterCode: `// Crie result usando IIFE
// let result = (function() { ... })()
// Dentro: let secret = 42, return secret * 2

`,
    solution: `let result = (function() {
  let secret = 42;
  return secret * 2;
})();`,
    testCases: [
      {
        input: null,
        expectedOutput: 84,
        description: 'IIFE deve retornar 84',
      },
    ],
    hints: [
      'A funcao e definida e chamada ao mesmo tempo',
      '(function() { })() - note os () no final',
      'secret so existe dentro da IIFE',
    ],
    conceptsUsed: ['IIFE', 'closure'],
  },

  // Desafio 10: Closure em loops (problema classico)
  {
    id: 'closure-10',
    title: 'Closure em Loops',
    description:
      'O problema classico de closure em loops. Crie createFunctions() que retorna array de 3 funcoes. Cada funcao deve retornar seu indice (0, 1, 2). Use let no for.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'closure',
    experienceReward: 35,
    starterCode: `// Crie createFunctions()
// Retorna array de 3 funcoes
// Cada funcao retorna seu indice
// Use: for (let i = 0; i < 3; i++)

`,
    solution: `function createFunctions() {
  let funcs = [];
  for (let i = 0; i < 3; i++) {
    funcs.push(function() {
      return i;
    });
  }
  return funcs;
}`,
    testCases: [
      {
        input: null,
        expectedOutput: [0, 1, 2],
        description: 'Cada funcao deve retornar seu indice',
      },
    ],
    hints: [
      'let cria novo escopo por iteracao',
      'Com var, todas retornariam 3',
      'let i = 0 e a chave para funcionar',
    ],
    conceptsUsed: ['closure', 'let', 'loop'],
  },

  // Desafio 11: Closure em event handlers
  {
    id: 'closure-11',
    title: 'Closure em Callbacks',
    description:
      'Callbacks usam closure para acessar dados externos. Crie createLogger(prefix) que retorna uma funcao log(message) que retorna prefix + ": " + message.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'closure',
    experienceReward: 20,
    starterCode: `// Crie createLogger(prefix)
// Retorna funcao log(message)
// log retorna: prefix + ": " + message

`,
    solution: `function createLogger(prefix) {
  return function log(message) {
    return prefix + ": " + message;
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { info: 'INFO: Planta regada', error: 'ERROR: Sem agua' },
        description: 'Logger deve usar prefix via closure',
      },
    ],
    hints: [
      'prefix e capturado pela closure',
      'Cada logger tem seu proprio prefix',
      'A funcao retornada pode ter nome (log)',
    ],
    conceptsUsed: ['closure', 'callback'],
  },

  // Desafio 12: Memoization
  {
    id: 'closure-12',
    title: 'Memoization',
    description:
      'Memoization cacheia resultados para evitar recalculos. Crie memoizedDouble(n) que cacheia resultados. Use um objeto cache interno.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'closure',
    experienceReward: 35,
    starterCode: `// Crie createMemoizedDouble()
// cache = {} interno
// Retorna funcao que dobra n, usando cache

`,
    solution: `function createMemoizedDouble() {
  let cache = {};
  return function(n) {
    if (cache[n] !== undefined) {
      return cache[n];
    }
    cache[n] = n * 2;
    return cache[n];
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { first: 10, second: 10, cached: true },
        description: 'Memoize deve cachear resultados',
      },
    ],
    hints: [
      'Verifique se cache[n] ja existe',
      'Se existir, retorne do cache',
      'Se nao, calcule, armazene e retorne',
    ],
    conceptsUsed: ['closure', 'memoization', 'cache'],
  },

  // Desafio 13: Debounce simplificado
  {
    id: 'closure-13',
    title: 'Contador com Delay',
    description:
      'Crie createDelayedCounter() com count = 0 interno. Retorna objeto com increment() que incrementa count, e getCount(). Usado para entender closure em async.',
    difficulty: 4,
    difficultyTier: 'practitioner',
    plantType: 'closure',
    experienceReward: 20,
    starterCode: `// Crie createDelayedCounter()
// count = 0 interno
// Retorna { increment, getCount }

`,
    solution: `function createDelayedCounter() {
  let count = 0;
  return {
    increment: function() {
      count++;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { afterFirst: 1, afterThird: 3 },
        description: 'Counter deve manter estado via closure',
      },
    ],
    hints: [
      'count e mantido entre chamadas',
      'Cada increment() modifica o mesmo count',
      'A closure "lembra" count',
    ],
    conceptsUsed: ['closure', 'state'],
  },

  // Desafio 14: Closure vs This
  {
    id: 'closure-14',
    title: 'Closure vs This',
    description:
      'Closures capturam variaveis, nao this. Crie createPlantWithClosure(name) que usa closure (let _name = name) e retorna { getName } usando _name, nao this.',
    difficulty: 4,
    difficultyTier: 'master',
    plantType: 'closure',
    experienceReward: 35,
    starterCode: `// Crie createPlantWithClosure(name)
// let _name = name (closure)
// Retorna { getName() } que retorna _name

`,
    solution: `function createPlantWithClosure(name) {
  let _name = name;
  return {
    getName: function() {
      return _name;
    }
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Rosa',
        description: 'getName deve usar closure, nao this',
      },
    ],
    hints: [
      'Closure captura _name diretamente',
      'Nao depende de como a funcao e chamada',
      'Mais seguro que usar this.name',
    ],
    conceptsUsed: ['closure', 'this', 'comparacao'],
  },

  // Desafio 15: Sistema de cache de crescimento (combinado)
  {
    id: 'closure-15',
    title: 'Sistema de Cache',
    description:
      'Crie createGrowthCache() que retorna objeto com: calculate(days, water) que retorna days * water, getFromCache(key), e getCacheSize(). Cache usa string "days-water" como chave.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'closure',
    experienceReward: 35,
    starterCode: `// Crie createGrowthCache()
// cache = {} interno
// calculate(days, water): cacheia e retorna days * water
// getFromCache(key): retorna cache[key]
// getCacheSize(): retorna Object.keys(cache).length

`,
    solution: `function createGrowthCache() {
  let cache = {};
  return {
    calculate: function(days, water) {
      let key = days + "-" + water;
      if (cache[key] === undefined) {
        cache[key] = days * water;
      }
      return cache[key];
    },
    getFromCache: function(key) {
      return cache[key];
    },
    getCacheSize: function() {
      return Object.keys(cache).length;
    }
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { result1: 50, result2: 30, cacheSize: 2, cached: 50 },
        description: 'Cache deve armazenar calculos',
      },
    ],
    hints: [
      'Chave do cache: days + "-" + water',
      'Verifique se ja existe antes de calcular',
      'Object.keys(cache).length conta entradas',
    ],
    conceptsUsed: ['closure', 'cache', 'memoization', 'modulo'],
  },
];

export const getClosureChallengeById = (id: string): ChallengeDefinition | undefined => {
  return closuresChallenges.find((c) => c.id === id);
};
