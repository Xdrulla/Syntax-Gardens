import type { ChallengeDefinition } from '../../types';

export const prototypeChallenges: ChallengeDefinition[] = [
  // Desafio 1: Entender __proto__
  {
    id: 'proto-1',
    plantType: 'prototype',
    difficulty: 3,
    title: 'Entendendo __proto__',
    description: 'Descubra o prototype de um objeto.',
    instructions: `Todo objeto em JavaScript tem um link interno chamado [[Prototype]], acessivel via __proto__.

Crie um objeto 'plant' com a propriedade 'name' igual a "Rosa".
Depois, crie uma variavel 'proto' que armazena o prototype de plant usando Object.getPrototypeOf().

Isso vai retornar Object.prototype, o prototype base de todos os objetos.`,
    starterCode: `// Crie o objeto plant com name: "Rosa"

// Obtenha o prototype de plant
`,
    testCases: [
      {
        input: null,
        expectedOutput: { hasPlant: true, protoIsObjectPrototype: true },
        description: 'plant deve existir e proto deve ser Object.prototype',
      },
    ],
    hints: [
      'Crie plant como: const plant = { name: "Rosa" }',
      'Use Object.getPrototypeOf(plant) para obter o prototype',
      '__proto__ e uma forma antiga, prefira Object.getPrototypeOf()',
    ],
    solution: `const plant = { name: "Rosa" };
const proto = Object.getPrototypeOf(plant);`,
    experienceReward: 20,
  },

  // Desafio 2: Prototype chain basica
  {
    id: 'proto-2',
    plantType: 'prototype',
    difficulty: 3,
    title: 'Cadeia de Prototypes',
    description: 'Entenda como a cadeia de prototypes funciona.',
    instructions: `Quando voce acessa uma propriedade, JavaScript procura primeiro no objeto.
Se nao encontrar, procura no prototype, e assim por diante.

Crie um objeto 'plantProto' com um metodo 'grow' que retorna "Crescendo...".
Depois crie 'myPlant' usando Object.create(plantProto) e adicione name: "Tulipa".

myPlant.grow() deve funcionar mesmo sem estar definido diretamente em myPlant!`,
    starterCode: `// Crie plantProto com metodo grow

// Crie myPlant usando Object.create e adicione name
`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Tulipa', growResult: 'Crescendo...' },
        description: 'myPlant deve herdar grow de plantProto',
      },
    ],
    hints: [
      'plantProto = { grow() { return "Crescendo..." } }',
      'Object.create(proto) cria objeto com proto como prototype',
      'Adicione name depois: myPlant.name = "Tulipa"',
    ],
    solution: `const plantProto = {
  grow() {
    return "Crescendo...";
  }
};

const myPlant = Object.create(plantProto);
myPlant.name = "Tulipa";`,
    experienceReward: 25,
  },

  // Desafio 3: Object.getPrototypeOf()
  {
    id: 'proto-3',
    plantType: 'prototype',
    difficulty: 3,
    title: 'Object.getPrototypeOf()',
    description: 'Use Object.getPrototypeOf para inspecionar prototypes.',
    instructions: `Object.getPrototypeOf(obj) retorna o prototype de um objeto.

Crie uma funcao 'getProtoChain' que recebe um objeto e retorna um array com todos os prototypes na cadeia ate chegar em null.

Exemplo: getProtoChain({}) deve retornar [Object.prototype, null]`,
    starterCode: `// Crie a funcao getProtoChain(obj)
// Retorne array com todos prototypes ate null

`,
    testCases: [
      {
        input: null,
        expectedOutput: { length: 2, endsWithNull: true },
        description: 'Cadeia de {} deve ter 2 elementos e terminar em null',
      },
    ],
    hints: [
      'Use um loop while para percorrer a cadeia',
      'Object.getPrototypeOf(Object.prototype) e null',
      'Adicione cada prototype ao array ate proto ser null',
    ],
    solution: `function getProtoChain(obj) {
  const chain = [];
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    chain.push(proto);
    proto = Object.getPrototypeOf(proto);
  }
  chain.push(null);
  return chain;
}`,
    experienceReward: 30,
  },

  // Desafio 4: Object.setPrototypeOf()
  {
    id: 'proto-4',
    plantType: 'prototype',
    difficulty: 4,
    title: 'Object.setPrototypeOf()',
    description: 'Altere o prototype de um objeto existente.',
    instructions: `Object.setPrototypeOf(obj, proto) muda o prototype de um objeto.
Atencao: isso e lento e geralmente nao recomendado em producao!

Crie 'waterMethods' com metodo 'drink' que retorna "Bebendo agua".
Crie 'plant' com name: "Cacto".
Use Object.setPrototypeOf para fazer plant herdar de waterMethods.`,
    starterCode: `// Crie waterMethods com metodo drink

// Crie plant com name

// Use Object.setPrototypeOf para conectar
`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Cacto', drinkResult: 'Bebendo agua' },
        description: 'plant deve herdar drink de waterMethods',
      },
    ],
    hints: [
      'waterMethods = { drink() { return "Bebendo agua" } }',
      'plant = { name: "Cacto" }',
      'Object.setPrototypeOf(plant, waterMethods)',
    ],
    solution: `const waterMethods = {
  drink() {
    return "Bebendo agua";
  }
};

const plant = { name: "Cacto" };

Object.setPrototypeOf(plant, waterMethods);`,
    experienceReward: 30,
  },

  // Desafio 5: Constructor.prototype
  {
    id: 'proto-5',
    plantType: 'prototype',
    difficulty: 4,
    title: 'Constructor.prototype',
    description: 'Entenda a propriedade prototype de funcoes construtoras.',
    instructions: `Funcoes construtoras tem uma propriedade 'prototype' que se torna o [[Prototype]] das instancias criadas com 'new'.

Crie uma funcao construtora 'Plant' que recebe name e atribui a this.name.
Adicione um metodo 'grow' ao Plant.prototype que retorna this.name + " esta crescendo".

Crie uma instancia 'rose' com new Plant("Rosa").`,
    starterCode: `// Crie a funcao construtora Plant

// Adicione grow ao Plant.prototype

// Crie instancia rose
`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Rosa', growResult: 'Rosa esta crescendo' },
        description: 'rose deve usar grow do prototype',
      },
    ],
    hints: [
      'function Plant(name) { this.name = name; }',
      'Plant.prototype.grow = function() { return ... }',
      'Metodos no prototype sao compartilhados por todas instancias',
    ],
    solution: `function Plant(name) {
  this.name = name;
}

Plant.prototype.grow = function() {
  return this.name + " esta crescendo";
};

const rose = new Plant("Rosa");`,
    experienceReward: 35,
  },

  // Desafio 6: Adicionar metodos ao prototype
  {
    id: 'proto-6',
    plantType: 'prototype',
    difficulty: 4,
    title: 'Metodos no Prototype',
    description: 'Adicione multiplos metodos ao prototype.',
    instructions: `Adicionar metodos ao prototype e mais eficiente que defini-los no constructor, pois sao compartilhados entre instancias.

Crie a funcao construtora 'Garden' com this.plants = [].
Adicione ao Garden.prototype:
- addPlant(name): adiciona name ao array plants
- getPlants(): retorna o array plants
- count(): retorna o numero de plantas`,
    starterCode: `// Crie Garden constructor

// Adicione metodos ao prototype

`,
    testCases: [
      {
        input: null,
        expectedOutput: { plants: ['Rosa', 'Tulipa'], count: 2 },
        description: 'Garden deve gerenciar plantas corretamente',
      },
    ],
    hints: [
      'function Garden() { this.plants = []; }',
      'Garden.prototype.addPlant = function(name) { this.plants.push(name); }',
      'Cada instancia tem seu proprio array plants',
    ],
    solution: `function Garden() {
  this.plants = [];
}

Garden.prototype.addPlant = function(name) {
  this.plants.push(name);
};

Garden.prototype.getPlants = function() {
  return this.plants;
};

Garden.prototype.count = function() {
  return this.plants.length;
};`,
    experienceReward: 35,
  },

  // Desafio 7: Object.create() basico
  {
    id: 'proto-7',
    plantType: 'prototype',
    difficulty: 4,
    title: 'Object.create() Basico',
    description: 'Crie objetos com prototype especifico.',
    instructions: `Object.create(proto) cria um novo objeto vazio com proto como seu [[Prototype]].

Crie um objeto 'plantBehaviors' com:
- water: 0
- drink(): incrementa water em 1
- getWater(): retorna water

Crie 'cactus' usando Object.create(plantBehaviors).
Chame cactus.drink() duas vezes.`,
    starterCode: `// Crie plantBehaviors com water, drink e getWater

// Crie cactus com Object.create

// Chame drink duas vezes
`,
    testCases: [
      {
        input: null,
        expectedOutput: 2,
        description: 'cactus.getWater() deve retornar 2',
      },
    ],
    hints: [
      'drink() deve usar this.water++ ou this.water += 1',
      'Object.create cria um objeto vazio que herda de plantBehaviors',
      'cactus.water comeca como undefined, mas herda 0 do proto',
    ],
    solution: `const plantBehaviors = {
  water: 0,
  drink() {
    this.water++;
  },
  getWater() {
    return this.water;
  }
};

const cactus = Object.create(plantBehaviors);
cactus.drink();
cactus.drink();`,
    experienceReward: 35,
  },

  // Desafio 8: Object.create() com propriedades
  {
    id: 'proto-8',
    plantType: 'prototype',
    difficulty: 4,
    title: 'Object.create() com Propriedades',
    description: 'Use o segundo parametro de Object.create.',
    instructions: `Object.create aceita um segundo parametro para definir propriedades do novo objeto.

Crie 'plantProto' com metodo describe() que retorna this.name + " - " + this.type.

Crie 'orchid' usando Object.create com:
- Prototype: plantProto
- Propriedades: name: "Orquidea", type: "flor"

Use property descriptors: { value: ..., writable: true, enumerable: true, configurable: true }`,
    starterCode: `// Crie plantProto com describe

// Crie orchid com Object.create e propriedades
`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Orquidea - flor',
        description: 'orchid.describe() deve funcionar corretamente',
      },
    ],
    hints: [
      'O segundo parametro e um objeto de property descriptors',
      'Cada propriedade precisa de { value: ... }',
      'Object.create(proto, { name: { value: "X", ... } })',
    ],
    solution: `const plantProto = {
  describe() {
    return this.name + " - " + this.type;
  }
};

const orchid = Object.create(plantProto, {
  name: { value: "Orquidea", writable: true, enumerable: true, configurable: true },
  type: { value: "flor", writable: true, enumerable: true, configurable: true }
});`,
    experienceReward: 40,
  },

  // Desafio 9: Heranca prototipica manual
  {
    id: 'proto-9',
    plantType: 'prototype',
    difficulty: 5,
    title: 'Heranca Prototipica Manual',
    description: 'Implemente heranca entre funcoes construtoras.',
    instructions: `Antes das classes ES6, heranca era feita manualmente com prototypes.

Crie 'Plant' constructor com this.name = name.
Adicione Plant.prototype.grow = function() { return "crescendo" }.

Crie 'Flower' constructor que:
1. Chama Plant.call(this, name) para herdar propriedades
2. Define this.color = color

Configure a heranca:
Flower.prototype = Object.create(Plant.prototype);
Flower.prototype.constructor = Flower;

Adicione Flower.prototype.bloom = function() { return this.color + " florescendo" }.`,
    starterCode: `// Crie Plant constructor e prototype.grow

// Crie Flower constructor

// Configure heranca prototipica

// Adicione bloom ao Flower.prototype
`,
    testCases: [
      {
        input: null,
        expectedOutput: { grow: 'crescendo', bloom: 'vermelha florescendo' },
        description: 'Flower deve herdar grow e ter bloom',
      },
    ],
    hints: [
      'Plant.call(this, name) executa Plant no contexto de Flower',
      'Flower.prototype = Object.create(Plant.prototype) cria a cadeia',
      'Restaurar constructor: Flower.prototype.constructor = Flower',
    ],
    solution: `function Plant(name) {
  this.name = name;
}

Plant.prototype.grow = function() {
  return "crescendo";
};

function Flower(name, color) {
  Plant.call(this, name);
  this.color = color;
}

Flower.prototype = Object.create(Plant.prototype);
Flower.prototype.constructor = Flower;

Flower.prototype.bloom = function() {
  return this.color + " florescendo";
};`,
    experienceReward: 50,
  },

  // Desafio 10: hasOwnProperty vs in
  {
    id: 'proto-10',
    plantType: 'prototype',
    difficulty: 4,
    title: 'hasOwnProperty vs in',
    description: 'Diferencie propriedades proprias de herdadas.',
    instructions: `'in' verifica se uma propriedade existe no objeto OU no prototype.
'hasOwnProperty' verifica apenas propriedades proprias do objeto.

Crie 'plantProto' com type: "planta".
Crie 'rose' com Object.create(plantProto) e adicione name: "Rosa".

Crie um objeto 'checks' com:
- hasName: rose.hasOwnProperty("name")
- hasType: rose.hasOwnProperty("type")
- inName: "name" in rose
- inType: "type" in rose`,
    starterCode: `// Crie plantProto com type

// Crie rose com Object.create e name

// Crie o objeto checks
`,
    testCases: [
      {
        input: null,
        expectedOutput: { hasName: true, hasType: false, inName: true, inType: true },
        description: 'checks deve mostrar a diferenca entre own e inherited',
      },
    ],
    hints: [
      'name e propria de rose, type e herdada',
      'hasOwnProperty retorna false para propriedades do prototype',
      'in retorna true para ambas',
    ],
    solution: `const plantProto = { type: "planta" };

const rose = Object.create(plantProto);
rose.name = "Rosa";

const checks = {
  hasName: rose.hasOwnProperty("name"),
  hasType: rose.hasOwnProperty("type"),
  inName: "name" in rose,
  inType: "type" in rose
};`,
    experienceReward: 35,
  },

  // Desafio 11: Object.keys vs for...in
  {
    id: 'proto-11',
    plantType: 'prototype',
    difficulty: 4,
    title: 'Object.keys vs for...in',
    description: 'Entenda como iterar propriedades proprias vs herdadas.',
    instructions: `Object.keys() retorna apenas propriedades proprias enumeraveis.
for...in itera sobre todas propriedades enumeraveis, incluindo herdadas.

Crie 'plantProto' com species: "vegetal" (enumerable).
Crie 'plant' com Object.create(plantProto) e adicione name: "Samambaia".

Crie:
- 'ownKeys' = Object.keys(plant)
- 'allKeys' = [] e preencha com for...in`,
    starterCode: `// Crie plantProto com species

// Crie plant com name

// Obtenha ownKeys e allKeys
`,
    testCases: [
      {
        input: null,
        expectedOutput: { ownKeys: ['name'], allKeys: ['name', 'species'] },
        description: 'ownKeys deve ter 1, allKeys deve ter 2 propriedades',
      },
    ],
    hints: [
      'Object.keys(plant) retorna ["name"]',
      'for (let key in plant) inclui species do prototype',
      'Propriedades de Object.prototype nao sao enumeraveis',
    ],
    solution: `const plantProto = { species: "vegetal" };

const plant = Object.create(plantProto);
plant.name = "Samambaia";

const ownKeys = Object.keys(plant);

const allKeys = [];
for (let key in plant) {
  allKeys.push(key);
}`,
    experienceReward: 35,
  },

  // Desafio 12: Prototype pollution (entender o problema)
  {
    id: 'proto-12',
    plantType: 'prototype',
    difficulty: 5,
    title: 'Prototype Pollution',
    description: 'Entenda o problema de seguranca de prototype pollution.',
    instructions: `Prototype pollution ocorre quando codigo malicioso modifica Object.prototype, afetando TODOS os objetos.

Crie uma funcao 'safeMerge(target, source)' que:
1. Itera sobre as propriedades de source
2. NAO copia se a chave for "__proto__", "constructor" ou "prototype"
3. Copia normalmente outras propriedades

Isso previne ataques de prototype pollution!`,
    starterCode: `// Crie safeMerge(target, source)
// Ignore chaves perigosas: __proto__, constructor, prototype

`,
    testCases: [
      {
        input: null,
        expectedOutput: { hasSafe: true, hasUnsafe: false },
        description: 'safeMerge deve ignorar propriedades perigosas',
      },
    ],
    hints: [
      'Use Object.keys(source) para iterar',
      'Verifique se key !== "__proto__" && key !== "constructor" ...',
      'target[key] = source[key] para chaves seguras',
    ],
    solution: `function safeMerge(target, source) {
  const dangerousKeys = ["__proto__", "constructor", "prototype"];

  for (const key of Object.keys(source)) {
    if (!dangerousKeys.includes(key)) {
      target[key] = source[key];
    }
  }

  return target;
}`,
    experienceReward: 50,
  },

  // Desafio 13: Sistema de heranca de plantas (combinado)
  {
    id: 'proto-13',
    plantType: 'prototype',
    difficulty: 5,
    title: 'Sistema de Heranca de Plantas',
    description: 'Crie um sistema completo usando heranca prototipica.',
    instructions: `Crie um sistema de heranca prototipica completo:

1. 'PlantBase' com:
   - Constructor: this.name = name, this.water = 0
   - Prototype: drink() que incrementa water, getStatus() que retorna name + ": " + water + "ml"

2. 'FlowerPlant' que herda de PlantBase:
   - Constructor: chama PlantBase, adiciona this.petals = petals
   - Prototype: bloom() que retorna name + " com " + petals + " petalas florescendo"

3. 'CactusPlant' que herda de PlantBase:
   - Constructor: chama PlantBase, adiciona this.spines = true
   - Prototype: override drink() para incrementar water em 0.5 (cactos precisam de menos agua)

Crie instancias: rose = new FlowerPlant("Rosa", 5), cactus = new CactusPlant("Cacto")`,
    starterCode: `// Crie PlantBase constructor e prototype

// Crie FlowerPlant com heranca

// Crie CactusPlant com heranca e override

// Crie instancias
`,
    testCases: [
      {
        input: null,
        expectedOutput: {
          roseStatus: 'Rosa: 1ml',
          roseBloom: 'Rosa com 5 petalas florescendo',
          cactusWater: 0.5,
        },
        description: 'Sistema de heranca deve funcionar corretamente',
      },
    ],
    hints: [
      'Use Plant.call(this, name) no constructor filho',
      'Configure prototype: Child.prototype = Object.create(Parent.prototype)',
      'Nao esqueca: Child.prototype.constructor = Child',
    ],
    solution: `function PlantBase(name) {
  this.name = name;
  this.water = 0;
}

PlantBase.prototype.drink = function() {
  this.water++;
};

PlantBase.prototype.getStatus = function() {
  return this.name + ": " + this.water + "ml";
};

function FlowerPlant(name, petals) {
  PlantBase.call(this, name);
  this.petals = petals;
}

FlowerPlant.prototype = Object.create(PlantBase.prototype);
FlowerPlant.prototype.constructor = FlowerPlant;

FlowerPlant.prototype.bloom = function() {
  return this.name + " com " + this.petals + " petalas florescendo";
};

function CactusPlant(name) {
  PlantBase.call(this, name);
  this.spines = true;
}

CactusPlant.prototype = Object.create(PlantBase.prototype);
CactusPlant.prototype.constructor = CactusPlant;

CactusPlant.prototype.drink = function() {
  this.water += 0.5;
};

const rose = new FlowerPlant("Rosa", 5);
rose.drink();
const cactus = new CactusPlant("Cacto");
cactus.drink();`,
    experienceReward: 75,
  },
];

export const getPrototypeChallengeById = (id: string): ChallengeDefinition | undefined => {
  return prototypeChallenges.find((c) => c.id === id);
};
