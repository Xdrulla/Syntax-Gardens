import type { ChallengeDefinition } from '../../types';

export const proxyChallenges: ChallengeDefinition[] = [
  // Desafio 1: new Proxy() basico
  {
    id: 'proxy-1',
    plantType: 'proxy',
    difficulty: 3,
    title: 'Primeiro Proxy',
    description: 'Crie seu primeiro Proxy em JavaScript.',
    instructions: `Proxy permite interceptar operacoes em objetos.
new Proxy(target, handler) cria um proxy para target usando handler.

Crie um objeto 'plant' com name: "Rosa" e water: 10.
Crie um proxy 'plantProxy' com handler vazio {} (sem traps).
O proxy se comportara exatamente como o objeto original.`,
    starterCode: `// Crie o objeto plant

// Crie plantProxy com handler vazio

`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Rosa', water: 10 },
        description: 'Proxy deve acessar propriedades normalmente',
      },
    ],
    hints: [
      'plant = { name: "Rosa", water: 10 }',
      'new Proxy(target, {}) cria proxy sem interceptacoes',
      'plantProxy.name funciona igual a plant.name',
    ],
    solution: `const plant = { name: "Rosa", water: 10 };
const plantProxy = new Proxy(plant, {});`,
    experienceReward: 20,
  },

  // Desafio 2: get trap - interceptar leitura
  {
    id: 'proxy-2',
    plantType: 'proxy',
    difficulty: 3,
    title: 'Get Trap',
    description: 'Intercepte leituras de propriedades.',
    instructions: `A trap 'get' intercepta leituras de propriedades.
get(target, property, receiver) e chamado quando acessamos proxy.propriedade.

Crie um proxy 'safePlant' para plant = { name: "Rosa", water: 10 } que:
- Se a propriedade existir, retorna seu valor
- Se nao existir, retorna "Propriedade nao encontrada"`,
    starterCode: `const plant = { name: "Rosa", water: 10 };

// Crie safePlant proxy com get trap

`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Rosa', unknown: 'Propriedade nao encontrada' },
        description: 'Get trap deve retornar valor padrao para props inexistentes',
      },
    ],
    hints: [
      'get(target, prop) intercepta target[prop]',
      'Verifique: if (prop in target) return target[prop]',
      'Senao, retorne a mensagem padrao',
    ],
    solution: `const plant = { name: "Rosa", water: 10 };

const safePlant = new Proxy(plant, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    return "Propriedade nao encontrada";
  }
});`,
    experienceReward: 25,
  },

  // Desafio 3: set trap - interceptar escrita
  {
    id: 'proxy-3',
    plantType: 'proxy',
    difficulty: 3,
    title: 'Set Trap',
    description: 'Intercepte escritas de propriedades.',
    instructions: `A trap 'set' intercepta atribuicoes de propriedades.
set(target, property, value, receiver) e chamado em proxy.prop = valor.
Deve retornar true para indicar sucesso.

Crie um proxy 'validatedPlant' para plant = { water: 10 } que:
- Permite apenas valores numericos para 'water'
- Se nao for numero, lanca TypeError
- Nao permite water negativo (usa 0 se for negativo)`,
    starterCode: `const plant = { water: 10 };

// Crie validatedPlant proxy com set trap

`,
    testCases: [
      {
        input: null,
        expectedOutput: { afterSet: 20, afterNegative: 0 },
        description: 'Set trap deve validar e corrigir valores',
      },
    ],
    hints: [
      'set(target, prop, value) intercepta target[prop] = value',
      'if (typeof value !== "number") throw new TypeError(...)',
      'target[prop] = value < 0 ? 0 : value; return true;',
    ],
    solution: `const plant = { water: 10 };

const validatedPlant = new Proxy(plant, {
  set(target, prop, value) {
    if (prop === "water") {
      if (typeof value !== "number") {
        throw new TypeError("water deve ser um numero");
      }
      target[prop] = value < 0 ? 0 : value;
    } else {
      target[prop] = value;
    }
    return true;
  }
});`,
    experienceReward: 30,
  },

  // Desafio 4: has trap - interceptar 'in' operator
  {
    id: 'proxy-4',
    plantType: 'proxy',
    difficulty: 4,
    title: 'Has Trap',
    description: 'Intercepte o operador "in".',
    instructions: `A trap 'has' intercepta o operador 'in' e Reflect.has().
has(target, property) retorna boolean.

Crie um proxy 'secretGarden' para garden = { rose: 10, tulip: 5, _secret: "tesouro" }.
O proxy deve esconder propriedades que comecam com '_':
- "rose" in secretGarden -> true
- "_secret" in secretGarden -> false`,
    starterCode: `const garden = { rose: 10, tulip: 5, _secret: "tesouro" };

// Crie secretGarden proxy com has trap

`,
    testCases: [
      {
        input: null,
        expectedOutput: { hasRose: true, hasSecret: false },
        description: 'Has trap deve esconder propriedades privadas',
      },
    ],
    hints: [
      'has(target, prop) intercepta "prop" in target',
      'Verifique se prop comeca com "_": prop.startsWith("_")',
      'Se comecar com _, retorne false',
    ],
    solution: `const garden = { rose: 10, tulip: 5, _secret: "tesouro" };

const secretGarden = new Proxy(garden, {
  has(target, prop) {
    if (typeof prop === "string" && prop.startsWith("_")) {
      return false;
    }
    return prop in target;
  }
});`,
    experienceReward: 35,
  },

  // Desafio 5: deleteProperty trap
  {
    id: 'proxy-5',
    plantType: 'proxy',
    difficulty: 4,
    title: 'DeleteProperty Trap',
    description: 'Intercepte delecoes de propriedades.',
    instructions: `A trap 'deleteProperty' intercepta o operador 'delete'.
deleteProperty(target, property) deve retornar boolean.

Crie um proxy 'protectedPlant' para plant = { name: "Rosa", water: 10, _id: 1 }.
O proxy deve:
- Permitir deletar propriedades normais
- Impedir delecao de propriedades que comecam com '_'
- Lancar Error se tentar deletar propriedade protegida`,
    starterCode: `const plant = { name: "Rosa", water: 10, _id: 1 };

// Crie protectedPlant proxy com deleteProperty trap

`,
    testCases: [
      {
        input: null,
        expectedOutput: { canDeleteName: true, stillHasId: true },
        description: 'deleteProperty deve proteger propriedades _',
      },
    ],
    hints: [
      'deleteProperty(target, prop) intercepta delete target[prop]',
      'Propriedades com _ sao protegidas',
      'Use delete target[prop] e return true para deletar',
    ],
    solution: `const plant = { name: "Rosa", water: 10, _id: 1 };

const protectedPlant = new Proxy(plant, {
  deleteProperty(target, prop) {
    if (typeof prop === "string" && prop.startsWith("_")) {
      throw new Error("Nao pode deletar propriedade protegida: " + prop);
    }
    delete target[prop];
    return true;
  }
});`,
    experienceReward: 35,
  },

  // Desafio 6: apply trap - interceptar chamadas de funcao
  {
    id: 'proxy-6',
    plantType: 'proxy',
    difficulty: 4,
    title: 'Apply Trap',
    description: 'Intercepte chamadas de funcao.',
    instructions: `A trap 'apply' intercepta chamadas de funcao.
apply(target, thisArg, argumentsList) e chamado em proxy(...args).

Crie uma funcao 'waterPlant' que recebe (name, amount) e retorna name + " regada com " + amount + "ml".
Crie um proxy 'loggedWater' que:
- Faz log "Regando: " + name antes de chamar
- Chama a funcao original
- Faz log "Concluido!" depois
- Retorna o resultado original`,
    starterCode: `function waterPlant(name, amount) {
  return name + " regada com " + amount + "ml";
}

// Crie loggedWater proxy com apply trap
// Use console.log para os logs

`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Rosa regada com 100ml',
        description: 'Apply trap deve chamar funcao e retornar resultado',
      },
    ],
    hints: [
      'apply(target, thisArg, args) intercepta target(...args)',
      'Reflect.apply(target, thisArg, args) chama a funcao',
      'args[0] e o primeiro argumento (name)',
    ],
    solution: `function waterPlant(name, amount) {
  return name + " regada com " + amount + "ml";
}

const loggedWater = new Proxy(waterPlant, {
  apply(target, thisArg, args) {
    console.log("Regando: " + args[0]);
    const result = Reflect.apply(target, thisArg, args);
    console.log("Concluido!");
    return result;
  }
});`,
    experienceReward: 40,
  },

  // Desafio 7: construct trap - interceptar 'new'
  {
    id: 'proxy-7',
    plantType: 'proxy',
    difficulty: 4,
    title: 'Construct Trap',
    description: 'Intercepte a criacao de instancias com new.',
    instructions: `A trap 'construct' intercepta o operador 'new'.
construct(target, argumentsList, newTarget) e chamado em new proxy(...args).

Crie uma classe 'Plant' com constructor(name) que define this.name e this.createdAt = new Date().
Crie um proxy 'TrackedPlant' que:
- Adiciona this._instanceId = Math.random() a cada instancia
- Conta quantas instancias foram criadas em TrackedPlant.count`,
    starterCode: `class Plant {
  constructor(name) {
    this.name = name;
    this.createdAt = new Date();
  }
}

// Crie TrackedPlant proxy com construct trap

`,
    testCases: [
      {
        input: null,
        expectedOutput: { hasInstanceId: true, count: 2 },
        description: 'Construct trap deve rastrear instancias',
      },
    ],
    hints: [
      'construct(target, args) intercepta new target(...args)',
      'Use Reflect.construct(target, args) para criar instancia',
      'Adicione propriedades ao objeto retornado',
    ],
    solution: `class Plant {
  constructor(name) {
    this.name = name;
    this.createdAt = new Date();
  }
}

let instanceCount = 0;

const TrackedPlant = new Proxy(Plant, {
  construct(target, args) {
    const instance = Reflect.construct(target, args);
    instance._instanceId = Math.random();
    instanceCount++;
    return instance;
  }
});

TrackedPlant.count = 0;
Object.defineProperty(TrackedPlant, 'count', {
  get() { return instanceCount; }
});`,
    experienceReward: 45,
  },

  // Desafio 8: Reflect API basico
  {
    id: 'proxy-8',
    plantType: 'proxy',
    difficulty: 3,
    title: 'Reflect API Basico',
    description: 'Use Reflect para operacoes em objetos.',
    instructions: `Reflect fornece metodos para operacoes de objetos.
E util em Proxies porque espelha as operacoes do handler.

Crie um objeto 'plant' com name: "Rosa", water: 10.
Use Reflect para:
- 'getName': Reflect.get(plant, "name")
- 'setResult': Reflect.set(plant, "water", 20) - retorna boolean
- 'hasWater': Reflect.has(plant, "water")
- 'keys': Reflect.ownKeys(plant)`,
    starterCode: `const plant = { name: "Rosa", water: 10 };

// Use Reflect para obter os valores

`,
    testCases: [
      {
        input: null,
        expectedOutput: { getName: 'Rosa', setResult: true, hasWater: true, keysLength: 2 },
        description: 'Reflect deve realizar operacoes corretamente',
      },
    ],
    hints: [
      'Reflect.get(obj, prop) e como obj[prop]',
      'Reflect.set(obj, prop, value) retorna true/false',
      'Reflect.ownKeys retorna array de chaves',
    ],
    solution: `const plant = { name: "Rosa", water: 10 };

const getName = Reflect.get(plant, "name");
const setResult = Reflect.set(plant, "water", 20);
const hasWater = Reflect.has(plant, "water");
const keys = Reflect.ownKeys(plant);`,
    experienceReward: 25,
  },

  // Desafio 9: Reflect.get/set
  {
    id: 'proxy-9',
    plantType: 'proxy',
    difficulty: 4,
    title: 'Reflect.get e Reflect.set',
    description: 'Use Reflect em traps de Proxy.',
    instructions: `Reflect e ideal para delegar operacoes dentro de traps.
Isso garante comportamento correto e permite encadear Proxies.

Crie um proxy 'uppercasePlant' para plant = { name: "rosa", type: "flor" } que:
- get: retorna valor em maiusculas se for string, senao Reflect.get normal
- set: converte para minusculas antes de salvar se for string

Use Reflect.get e Reflect.set para operacoes padrao.`,
    starterCode: `const plant = { name: "rosa", type: "flor" };

// Crie uppercasePlant proxy usando Reflect

`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'ROSA', setName: 'tulipa' },
        description: 'Proxy deve converter case corretamente',
      },
    ],
    hints: [
      'Em get: if (typeof value === "string") return value.toUpperCase()',
      'Em set: if (typeof value === "string") value = value.toLowerCase()',
      'Use Reflect.set(target, prop, value) para salvar',
    ],
    solution: `const plant = { name: "rosa", type: "flor" };

const uppercasePlant = new Proxy(plant, {
  get(target, prop) {
    const value = Reflect.get(target, prop);
    if (typeof value === "string") {
      return value.toUpperCase();
    }
    return value;
  },
  set(target, prop, value) {
    if (typeof value === "string") {
      value = value.toLowerCase();
    }
    return Reflect.set(target, prop, value);
  }
});`,
    experienceReward: 35,
  },

  // Desafio 10: Reflect.has e Reflect.deleteProperty
  {
    id: 'proxy-10',
    plantType: 'proxy',
    difficulty: 4,
    title: 'Reflect.has e deleteProperty',
    description: 'Use Reflect para verificacao e delecao.',
    instructions: `Reflect.has(obj, prop) e equivalente a 'prop in obj'.
Reflect.deleteProperty(obj, prop) e equivalente a 'delete obj[prop]'.

Crie uma funcao 'cleanupPlant(plant, propsToRemove)' que:
- Recebe um objeto plant e array de propriedades para remover
- Para cada propriedade em propsToRemove:
  - Verifica se existe com Reflect.has
  - Se existir, remove com Reflect.deleteProperty
- Retorna array de propriedades que foram realmente removidas`,
    starterCode: `// Crie cleanupPlant(plant, propsToRemove)

`,
    testCases: [
      {
        input: null,
        expectedOutput: ['temp', 'debug'],
        description: 'cleanupPlant deve remover e retornar props removidas',
      },
    ],
    hints: [
      'Reflect.has(plant, prop) verifica existencia',
      'Reflect.deleteProperty(plant, prop) remove',
      'Colete as props removidas em um array',
    ],
    solution: `function cleanupPlant(plant, propsToRemove) {
  const removed = [];
  for (const prop of propsToRemove) {
    if (Reflect.has(plant, prop)) {
      Reflect.deleteProperty(plant, prop);
      removed.push(prop);
    }
  }
  return removed;
}`,
    experienceReward: 35,
  },

  // Desafio 11: Reflect.apply
  {
    id: 'proxy-11',
    plantType: 'proxy',
    difficulty: 4,
    title: 'Reflect.apply',
    description: 'Use Reflect.apply para chamar funcoes.',
    instructions: `Reflect.apply(func, thisArg, args) chama func com thisArg e args.
E util para chamar funcoes com contexto especifico.

Crie um objeto 'garden' com:
- plants: ["Rosa", "Tulipa"]
- water: 100
- waterAll: function() { return this.plants.map(p => p + " regada"); }

Crie uma funcao 'callWithGarden(fn)' que usa Reflect.apply para chamar fn com garden como this.`,
    starterCode: `const garden = {
  plants: ["Rosa", "Tulipa"],
  water: 100,
  waterAll: function() {
    return this.plants.map(p => p + " regada");
  }
};

// Crie callWithGarden(fn)

`,
    testCases: [
      {
        input: null,
        expectedOutput: ['Rosa regada', 'Tulipa regada'],
        description: 'Reflect.apply deve chamar funcao com contexto correto',
      },
    ],
    hints: [
      'Reflect.apply(fn, thisArg, argumentsArray)',
      'thisArg sera o "this" dentro da funcao',
      'args pode ser array vazio [] se nao houver argumentos',
    ],
    solution: `const garden = {
  plants: ["Rosa", "Tulipa"],
  water: 100,
  waterAll: function() {
    return this.plants.map(p => p + " regada");
  }
};

function callWithGarden(fn) {
  return Reflect.apply(fn, garden, []);
}`,
    experienceReward: 35,
  },

  // Desafio 12: Proxy para validacao
  {
    id: 'proxy-12',
    plantType: 'proxy',
    difficulty: 5,
    title: 'Proxy para Validacao',
    description: 'Crie um sistema de validacao com Proxy.',
    instructions: `Crie uma funcao 'createValidatedObject(schema)' que retorna um Proxy.
O schema define regras para cada propriedade.

Schema exemplo:
{
  name: { type: "string", required: true },
  water: { type: "number", min: 0, max: 100 },
  active: { type: "boolean" }
}

O Proxy deve:
- Validar tipo no set (throw TypeError se invalido)
- Validar min/max para numeros (throw RangeError)
- Permitir propriedades nao definidas no schema`,
    starterCode: `// Crie createValidatedObject(schema)
// Retorne um Proxy com validacao no set

`,
    testCases: [
      {
        input: null,
        expectedOutput: { validSet: true, invalidTypeThrows: true, outOfRangeThrows: true },
        description: 'Validacao deve funcionar corretamente',
      },
    ],
    hints: [
      'No set trap, verifique se prop existe no schema',
      'typeof value === schema[prop].type para validar tipo',
      'Verifique min/max se definidos no schema',
    ],
    solution: `function createValidatedObject(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      const rule = schema[prop];

      if (rule) {
        if (rule.type && typeof value !== rule.type) {
          throw new TypeError(prop + " deve ser " + rule.type);
        }

        if (rule.type === "number") {
          if (rule.min !== undefined && value < rule.min) {
            throw new RangeError(prop + " deve ser >= " + rule.min);
          }
          if (rule.max !== undefined && value > rule.max) {
            throw new RangeError(prop + " deve ser <= " + rule.max);
          }
        }
      }

      target[prop] = value;
      return true;
    }
  });
}`,
    experienceReward: 50,
  },

  // Desafio 13: Proxy para logging
  {
    id: 'proxy-13',
    plantType: 'proxy',
    difficulty: 5,
    title: 'Proxy para Logging',
    description: 'Crie um sistema de logging automatico com Proxy.',
    instructions: `Crie uma funcao 'createLoggedObject(target, logFn)' que:
- Retorna um Proxy que intercepta get, set e deleteProperty
- Chama logFn com detalhes de cada operacao

logFn recebe objeto com:
- operation: "get" | "set" | "delete"
- property: nome da propriedade
- value: valor (para set)
- oldValue: valor anterior (para set e delete)
- timestamp: new Date().toISOString()`,
    starterCode: `// Crie createLoggedObject(target, logFn)
// Logue get, set e delete

`,
    testCases: [
      {
        input: null,
        expectedOutput: { operations: ['get', 'set', 'delete'], logCount: 3 },
        description: 'Logger deve capturar todas operacoes',
      },
    ],
    hints: [
      'Guarde oldValue antes de set/delete',
      'Use Reflect para operacoes padrao',
      'Cada trap chama logFn com info relevante',
    ],
    solution: `function createLoggedObject(target, logFn) {
  return new Proxy(target, {
    get(target, prop) {
      logFn({
        operation: "get",
        property: prop,
        timestamp: new Date().toISOString()
      });
      return Reflect.get(target, prop);
    },

    set(target, prop, value) {
      const oldValue = target[prop];
      logFn({
        operation: "set",
        property: prop,
        value: value,
        oldValue: oldValue,
        timestamp: new Date().toISOString()
      });
      return Reflect.set(target, prop, value);
    },

    deleteProperty(target, prop) {
      const oldValue = target[prop];
      logFn({
        operation: "delete",
        property: prop,
        oldValue: oldValue,
        timestamp: new Date().toISOString()
      });
      return Reflect.deleteProperty(target, prop);
    }
  });
}`,
    experienceReward: 50,
  },

  // Desafio 14: Sistema observavel de plantas (combinado)
  {
    id: 'proxy-14',
    plantType: 'proxy',
    difficulty: 5,
    title: 'Sistema Observavel de Plantas',
    description: 'Crie um sistema reativo completo com Proxy.',
    instructions: `Crie um sistema observavel para plantas:

1. Funcao 'createObservable(target)' que retorna { proxy, subscribe, notify }
   - proxy: Proxy do target
   - subscribe(callback): adiciona listener, retorna funcao unsubscribe
   - notify e chamado internamente quando propriedades mudam

2. O proxy deve:
   - Interceptar set e chamar todos callbacks com { prop, oldValue, newValue }
   - Interceptar deleteProperty e chamar callbacks com { prop, oldValue, deleted: true }
   - Suportar propriedades aninhadas (se valor for objeto, torna-lo observavel tambem)

3. Crie 'gardenObservable' para { plants: [], water: 100 }
   - Adicione subscriber que loga mudancas
   - Demonstre adicionando planta e mudando water`,
    starterCode: `// Crie createObservable(target)
// Retorne { proxy, subscribe }

// Crie gardenObservable e demonstre uso

`,
    testCases: [
      {
        input: null,
        expectedOutput: { notificationCount: 2, hasUnsubscribe: true },
        description: 'Sistema observavel deve notificar mudancas',
      },
    ],
    hints: [
      'Use array de callbacks para subscribers',
      'subscribe retorna funcao que remove callback do array',
      'No set trap, chame cada callback com info da mudanca',
    ],
    solution: `function createObservable(target) {
  const subscribers = [];

  const notify = (change) => {
    subscribers.forEach(callback => callback(change));
  };

  const handler = {
    set(target, prop, value) {
      const oldValue = target[prop];
      const result = Reflect.set(target, prop, value);

      notify({
        prop,
        oldValue,
        newValue: value
      });

      return result;
    },

    deleteProperty(target, prop) {
      const oldValue = target[prop];
      const result = Reflect.deleteProperty(target, prop);

      notify({
        prop,
        oldValue,
        deleted: true
      });

      return result;
    }
  };

  const proxy = new Proxy(target, handler);

  const subscribe = (callback) => {
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    };
  };

  return { proxy, subscribe };
}

const { proxy: gardenObservable, subscribe } = createObservable({
  plants: [],
  water: 100
});

const logs = [];
const unsubscribe = subscribe((change) => {
  logs.push(change);
});

gardenObservable.water = 80;
gardenObservable.plants = ["Rosa"];`,
    experienceReward: 75,
  },
];

export const getProxyChallengeById = (id: string): ChallengeDefinition | undefined => {
  return proxyChallenges.find((c) => c.id === id);
};
