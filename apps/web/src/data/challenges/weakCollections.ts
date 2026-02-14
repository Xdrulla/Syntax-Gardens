import type { ChallengeDefinition } from '../../types';

export const weakCollectionChallenges: ChallengeDefinition[] = [
  // Desafio 1: Map vs WeakMap - diferencas basicas
  {
    id: 'weak-1',
    plantType: 'weak-collection',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Map vs WeakMap',
    description: 'Entenda as diferencas entre Map e WeakMap.',
    instructions: `WeakMap e similar a Map, mas com diferencas importantes:
- Chaves DEVEM ser objetos (nao primitivos)
- Chaves sao "fracamente" referenciadas (podem ser coletadas pelo garbage collector)
- Nao e iteravel (sem forEach, keys(), values(), etc.)
- Nao tem propriedade size

Crie um objeto 'plant' com name: "Rosa".
Crie um 'regularMap' (Map) e um 'weakMap' (WeakMap).
Em ambos, use plant como chave e "saudavel" como valor.`,
    starterCode: `// Crie plant object

// Crie regularMap e weakMap
// Adicione plant -> "saudavel" em ambos

`,
    testCases: [
      {
        input: null,
        expectedOutput: { mapValue: 'saudavel', weakMapValue: 'saudavel' },
        description: 'Ambos devem armazenar e recuperar o valor',
      },
    ],
    hints: [
      'new Map() e new WeakMap() criam as colecoes',
      'Use .set(key, value) para adicionar',
      'Use .get(key) para recuperar',
    ],
    solution: `const plant = { name: "Rosa" };

const regularMap = new Map();
regularMap.set(plant, "saudavel");

const weakMap = new WeakMap();
weakMap.set(plant, "saudavel");`,
    experienceReward: 20,
  },

  // Desafio 2: Criar WeakMap
  {
    id: 'weak-2',
    plantType: 'weak-collection',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Criando WeakMap',
    description: 'Crie e inicialize um WeakMap.',
    instructions: `WeakMap pode ser inicializado com um array de pares [chave, valor].
Lembre-se: chaves devem ser objetos!

Crie tres objetos: rose = { name: "Rosa" }, tulip = { name: "Tulipa" }, cactus = { name: "Cacto" }.
Crie um WeakMap 'plantHealth' inicializado com:
- rose -> 100
- tulip -> 80
- cactus -> 60`,
    starterCode: `// Crie os tres objetos de plantas

// Crie plantHealth WeakMap com valores iniciais

`,
    testCases: [
      {
        input: null,
        expectedOutput: { rose: 100, tulip: 80, cactus: 60 },
        description: 'WeakMap deve armazenar saude de cada planta',
      },
    ],
    hints: [
      'new WeakMap([[key1, val1], [key2, val2]])',
      'Cada elemento do array e um par [objeto, valor]',
      'Chaves devem ser objetos, nao strings',
    ],
    solution: `const rose = { name: "Rosa" };
const tulip = { name: "Tulipa" };
const cactus = { name: "Cacto" };

const plantHealth = new WeakMap([
  [rose, 100],
  [tulip, 80],
  [cactus, 60]
]);`,
    experienceReward: 25,
  },

  // Desafio 3: set/get/has/delete no WeakMap
  {
    id: 'weak-3',
    plantType: 'weak-collection',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Metodos do WeakMap',
    description: 'Use os metodos basicos do WeakMap.',
    instructions: `WeakMap tem apenas 4 metodos:
- set(key, value): adiciona ou atualiza
- get(key): retorna valor ou undefined
- has(key): retorna boolean
- delete(key): remove e retorna boolean

Crie um WeakMap 'gardenData'.
Crie objeto 'plot1' com location: "norte".

1. Use set para: plot1 -> { plants: 3, watered: true }
2. Use get para obter dados de plot1 em 'plotInfo'
3. Use has para verificar se plot1 existe em 'hasPlot1'
4. Use delete para remover plot1 e guarde resultado em 'deleted'`,
    starterCode: `const gardenData = new WeakMap();
const plot1 = { location: "norte" };

// Execute as 4 operacoes

`,
    testCases: [
      {
        input: null,
        expectedOutput: { plants: 3, hasPlot1: true, deleted: true, hasAfterDelete: false },
        description: 'Metodos devem funcionar corretamente',
      },
    ],
    hints: [
      'gardenData.set(plot1, { plants: 3, watered: true })',
      '.get() antes de .delete() para obter plotInfo',
      '.has() depois de .delete() deve retornar false',
    ],
    solution: `const gardenData = new WeakMap();
const plot1 = { location: "norte" };

gardenData.set(plot1, { plants: 3, watered: true });
const plotInfo = gardenData.get(plot1);
const hasPlot1 = gardenData.has(plot1);
const deleted = gardenData.delete(plot1);
const hasAfterDelete = gardenData.has(plot1);`,
    experienceReward: 30,
  },

  // Desafio 4: Entender garbage collection com WeakMap
  {
    id: 'weak-4',
    plantType: 'weak-collection',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Garbage Collection',
    description: 'Entenda como WeakMap interage com garbage collection.',
    instructions: `A grande vantagem do WeakMap: quando um objeto chave nao tem mais referencias, ele pode ser coletado pelo garbage collector, e sua entrada no WeakMap e automaticamente removida.

Isso evita memory leaks!

Crie uma funcao 'demonstrateWeakRef()' que:
1. Cria um WeakMap
2. Em um escopo interno (bloco {}), cria um objeto e adiciona ao WeakMap
3. Fora do bloco, o objeto nao e mais acessivel
4. Retorna o WeakMap

Nota: Nao podemos verificar diretamente se foi coletado (sem .size), mas entendemos o conceito.`,
    starterCode: `// Crie demonstrateWeakRef()
// Demonstre que objetos locais podem ser coletados

`,
    testCases: [
      {
        input: null,
        expectedOutput: { isWeakMap: true, noSizeProperty: true },
        description: 'WeakMap nao tem size pois entradas podem desaparecer',
      },
    ],
    hints: [
      'Use um bloco { } para criar escopo local',
      'let obj = {} dentro do bloco',
      'Fora do bloco, obj nao existe mais',
    ],
    solution: `function demonstrateWeakRef() {
  const wm = new WeakMap();

  {
    // Escopo local - objeto so existe aqui
    let temporaryPlant = { name: "Temporaria" };
    wm.set(temporaryPlant, "dados da planta");
    // temporaryPlant pode ser acessado aqui
  }
  // Fora do bloco, temporaryPlant nao e mais referenciado
  // O garbage collector pode coletar o objeto
  // e a entrada no WeakMap sera removida automaticamente

  return wm;
}`,
    experienceReward: 35,
  },

  // Desafio 5: WeakMap para dados privados
  {
    id: 'weak-5',
    plantType: 'weak-collection',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Dados Privados com WeakMap',
    description: 'Use WeakMap para armazenar dados privados de classes.',
    instructions: `WeakMap e excelente para armazenar dados privados associados a instancias de classes, sem poluir o objeto.

Crie um WeakMap '_privateData' fora da classe.
Crie uma classe 'SecurePlant' que:
- Constructor(name, secretCode): armazena secretCode no WeakMap usando 'this' como chave, e name como propriedade publica
- Metodo getSecret(code): retorna o secretCode se code corresponder, senao "Acesso negado"
- Metodo changeSecret(oldCode, newCode): muda o codigo se oldCode estiver correto`,
    starterCode: `// Crie _privateData WeakMap

// Crie classe SecurePlant

`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Rosa', correctCode: '1234', wrongCode: 'Acesso negado' },
        description: 'Dados privados devem ser protegidos',
      },
    ],
    hints: [
      '_privateData.set(this, { secretCode }) no constructor',
      '_privateData.get(this).secretCode para acessar',
      'O secretCode nao aparece nas propriedades do objeto',
    ],
    solution: `const _privateData = new WeakMap();

class SecurePlant {
  constructor(name, secretCode) {
    this.name = name;
    _privateData.set(this, { secretCode });
  }

  getSecret(code) {
    const data = _privateData.get(this);
    if (data.secretCode === code) {
      return data.secretCode;
    }
    return "Acesso negado";
  }

  changeSecret(oldCode, newCode) {
    const data = _privateData.get(this);
    if (data.secretCode === oldCode) {
      data.secretCode = newCode;
      return true;
    }
    return false;
  }
}`,
    experienceReward: 45,
  },

  // Desafio 6: WeakMap para cache
  {
    id: 'weak-6',
    plantType: 'weak-collection',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Cache com WeakMap',
    description: 'Use WeakMap para criar um cache que nao causa memory leaks.',
    instructions: `WeakMap e ideal para caches associados a objetos, pois o cache e automaticamente limpo quando o objeto e coletado.

Crie uma funcao 'createCachedCalculator()' que retorna um objeto com:
- cache: WeakMap interno
- calculate(plant): se plant ja foi calculado, retorna do cache. Senao, calcula plant.water * plant.size, armazena no cache e retorna.
- hasCache(plant): retorna se plant esta no cache`,
    starterCode: `// Crie createCachedCalculator()
// Retorne { calculate, hasCache }

`,
    testCases: [
      {
        input: null,
        expectedOutput: { firstCalc: 50, secondCalc: 50, hasCache: true },
        description: 'Cache deve armazenar e reutilizar resultados',
      },
    ],
    hints: [
      'const cache = new WeakMap() dentro da funcao',
      'if (cache.has(plant)) return cache.get(plant)',
      'Senao, calcule, cache.set(plant, result) e retorne',
    ],
    solution: `function createCachedCalculator() {
  const cache = new WeakMap();

  return {
    calculate(plant) {
      if (cache.has(plant)) {
        return cache.get(plant);
      }
      const result = plant.water * plant.size;
      cache.set(plant, result);
      return result;
    },

    hasCache(plant) {
      return cache.has(plant);
    }
  };
}`,
    experienceReward: 40,
  },

  // Desafio 7: Set vs WeakSet
  {
    id: 'weak-7',
    plantType: 'weak-collection',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Set vs WeakSet',
    description: 'Entenda as diferencas entre Set e WeakSet.',
    instructions: `WeakSet e similar a Set, mas:
- Valores DEVEM ser objetos
- Referencias fracas (garbage collection)
- Nao iteravel (sem forEach, values(), etc.)
- Nao tem size

WeakSet so tem: add(), has(), delete()

Crie objetos: rose = { name: "Rosa" }, tulip = { name: "Tulipa" }.
Crie um 'regularSet' (Set) e um 'weakSet' (WeakSet).
Adicione rose a ambos.`,
    starterCode: `// Crie rose e tulip

// Crie regularSet e weakSet
// Adicione rose a ambos

`,
    testCases: [
      {
        input: null,
        expectedOutput: { setHasRose: true, weakSetHasRose: true },
        description: 'Ambos devem conter rose',
      },
    ],
    hints: [
      'new Set() e new WeakSet()',
      '.add(value) para adicionar',
      '.has(value) para verificar',
    ],
    solution: `const rose = { name: "Rosa" };
const tulip = { name: "Tulipa" };

const regularSet = new Set();
regularSet.add(rose);

const weakSet = new WeakSet();
weakSet.add(rose);`,
    experienceReward: 25,
  },

  // Desafio 8: Criar WeakSet
  {
    id: 'weak-8',
    plantType: 'weak-collection',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Criando WeakSet',
    description: 'Crie e inicialize um WeakSet.',
    instructions: `WeakSet pode ser inicializado com um iteravel de objetos.

Crie objetos representando plantas ja regadas hoje:
- rose = { name: "Rosa", water: 10 }
- tulip = { name: "Tulipa", water: 8 }
- cactus = { name: "Cacto", water: 2 }

Crie um WeakSet 'wateredToday' inicializado com rose e tulip.
Crie 'orchid' e nao adicione ao WeakSet.`,
    starterCode: `// Crie os objetos de plantas

// Crie wateredToday WeakSet com rose e tulip

// Crie orchid separadamente

`,
    testCases: [
      {
        input: null,
        expectedOutput: { hasRose: true, hasTulip: true, hasOrchid: false },
        description: 'WeakSet deve conter apenas plantas regadas',
      },
    ],
    hints: [
      'new WeakSet([obj1, obj2]) inicializa com array',
      'Somente objetos podem ser adicionados',
      '.has(obj) verifica se esta no set',
    ],
    solution: `const rose = { name: "Rosa", water: 10 };
const tulip = { name: "Tulipa", water: 8 };
const cactus = { name: "Cacto", water: 2 };

const wateredToday = new WeakSet([rose, tulip]);

const orchid = { name: "Orquidea", water: 5 };`,
    experienceReward: 25,
  },

  // Desafio 9: add/has/delete no WeakSet
  {
    id: 'weak-9',
    plantType: 'weak-collection',
    difficulty: 3,
    difficultyTier: 'practitioner',
    title: 'Metodos do WeakSet',
    description: 'Use os metodos basicos do WeakSet.',
    instructions: `WeakSet tem apenas 3 metodos:
- add(value): adiciona objeto, retorna o WeakSet
- has(value): retorna boolean
- delete(value): remove e retorna boolean

Crie um WeakSet 'processedPlants'.
Crie objetos: plant1 = { id: 1 }, plant2 = { id: 2 }, plant3 = { id: 3 }.

1. Adicione plant1 e plant2
2. Verifique se plant1, plant2 e plant3 existem
3. Delete plant1
4. Verifique novamente se plant1 existe`,
    starterCode: `const processedPlants = new WeakSet();
const plant1 = { id: 1 };
const plant2 = { id: 2 };
const plant3 = { id: 3 };

// Execute as operacoes

`,
    testCases: [
      {
        input: null,
        expectedOutput: { hasPlant1Before: true, hasPlant3: false, hasPlant1After: false },
        description: 'Operacoes devem funcionar corretamente',
      },
    ],
    hints: [
      'processedPlants.add(plant1).add(plant2) encadeia',
      '.has() antes e depois de .delete()',
      'plant3 nunca foi adicionado',
    ],
    solution: `const processedPlants = new WeakSet();
const plant1 = { id: 1 };
const plant2 = { id: 2 };
const plant3 = { id: 3 };

processedPlants.add(plant1);
processedPlants.add(plant2);

const hasPlant1Before = processedPlants.has(plant1);
const hasPlant2 = processedPlants.has(plant2);
const hasPlant3 = processedPlants.has(plant3);

processedPlants.delete(plant1);

const hasPlant1After = processedPlants.has(plant1);`,
    experienceReward: 30,
  },

  // Desafio 10: WeakSet para rastrear objetos
  {
    id: 'weak-10',
    plantType: 'weak-collection',
    difficulty: 4,
    difficultyTier: 'practitioner',
    title: 'Rastreamento com WeakSet',
    description: 'Use WeakSet para rastrear objetos processados.',
    instructions: `WeakSet e perfeito para marcar objetos como "ja processados" sem modificar o objeto original.

Crie uma funcao 'createPlantProcessor()' que retorna um objeto com:
- processed: WeakSet interno
- process(plant): se planta ja foi processada, retorna "Ja processado: " + plant.name. Senao, marca como processada e retorna "Processando: " + plant.name
- isProcessed(plant): retorna boolean
- reset(plant): remove do WeakSet, retorna true se existia`,
    starterCode: `// Crie createPlantProcessor()

`,
    testCases: [
      {
        input: null,
        expectedOutput: { first: 'Processando: Rosa', second: 'Ja processado: Rosa', afterReset: 'Processando: Rosa' },
        description: 'Processador deve rastrear plantas corretamente',
      },
    ],
    hints: [
      'const processed = new WeakSet()',
      'Em process: if (processed.has(plant)) ...',
      'Em reset: return processed.delete(plant)',
    ],
    solution: `function createPlantProcessor() {
  const processed = new WeakSet();

  return {
    process(plant) {
      if (processed.has(plant)) {
        return "Ja processado: " + plant.name;
      }
      processed.add(plant);
      return "Processando: " + plant.name;
    },

    isProcessed(plant) {
      return processed.has(plant);
    },

    reset(plant) {
      return processed.delete(plant);
    }
  };
}`,
    experienceReward: 40,
  },

  // Desafio 11: Sistema de referencias fracas (combinado)
  {
    id: 'weak-11',
    plantType: 'weak-collection',
    difficulty: 5,
    difficultyTier: 'master',
    title: 'Sistema de Referencias Fracas',
    description: 'Crie um sistema completo usando WeakMap e WeakSet.',
    instructions: `Crie um sistema de gerenciamento de jardim que usa colecoes fracas:

1. Classe 'GardenManager' com:
   - _metadata: WeakMap para armazenar metadados de plantas (createdAt, lastWatered)
   - _activeFlags: WeakSet para marcar plantas ativas
   - Constructor: inicializa as colecoes

2. Metodos:
   - addPlant(plant): adiciona metadados (createdAt: new Date()) e marca como ativa
   - waterPlant(plant): atualiza lastWatered nos metadados, retorna false se nao existir
   - deactivatePlant(plant): remove do WeakSet de ativos
   - isActive(plant): verifica se esta ativa
   - getMetadata(plant): retorna metadados ou null

3. Crie instancia 'garden' e demonstre:
   - Adicione rose = { name: "Rosa" }
   - Regue a rosa
   - Verifique se esta ativa
   - Desative
   - Verifique novamente`,
    starterCode: `// Crie a classe GardenManager

// Crie instancia e demonstre uso

`,
    testCases: [
      {
        input: null,
        expectedOutput: { hasMetadata: true, isActiveBefore: true, isActiveAfter: false, hasLastWatered: true },
        description: 'Sistema deve gerenciar plantas com colecoes fracas',
      },
    ],
    hints: [
      '_metadata = new WeakMap() e _activeFlags = new WeakSet()',
      'addPlant: _metadata.set(plant, {...}) e _activeFlags.add(plant)',
      'waterPlant: _metadata.get(plant).lastWatered = new Date()',
    ],
    solution: `class GardenManager {
  constructor() {
    this._metadata = new WeakMap();
    this._activeFlags = new WeakSet();
  }

  addPlant(plant) {
    this._metadata.set(plant, {
      createdAt: new Date(),
      lastWatered: null
    });
    this._activeFlags.add(plant);
    return true;
  }

  waterPlant(plant) {
    const metadata = this._metadata.get(plant);
    if (!metadata) {
      return false;
    }
    metadata.lastWatered = new Date();
    return true;
  }

  deactivatePlant(plant) {
    return this._activeFlags.delete(plant);
  }

  isActive(plant) {
    return this._activeFlags.has(plant);
  }

  getMetadata(plant) {
    return this._metadata.get(plant) || null;
  }
}

const garden = new GardenManager();
const rose = { name: "Rosa" };

garden.addPlant(rose);
garden.waterPlant(rose);
const isActiveBefore = garden.isActive(rose);
garden.deactivatePlant(rose);
const isActiveAfter = garden.isActive(rose);
const metadata = garden.getMetadata(rose);`,
    experienceReward: 75,
  },
];

export const getWeakCollectionChallengeById = (id: string): ChallengeDefinition | undefined => {
  return weakCollectionChallenges.find((c) => c.id === id);
};
