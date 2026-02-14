import type { ChallengeDefinition } from '../../types';

export const classesChallenges: ChallengeDefinition[] = [
  // Desafio 1: Declaracao basica de classe
  {
    id: 'class-1',
    title: 'Primeira Classe',
    description:
      'Classes sao como moldes para criar objetos. Use a palavra-chave `class` para declarar uma classe. Crie uma classe chamada `Plant` vazia.',
    difficulty: 1,
    difficultyTier: 'beginner',
    plantType: 'class',
    instructions: 'Crie uma classe chamada `Plant` vazia usando a sintaxe class NomeDaClasse { }.',
    starterCode: `// Crie uma classe chamada Plant
// Classes vazias usam chaves {}

`,
    solution: `class Plant {
}`,
    testCases: [
      {
        input: null,
        expectedOutput: true,
        description: 'Classe Plant deve existir',
      },
    ],
    hints: [
      'Use a sintaxe: class NomeDaClasse { }',
      'O nome da classe deve ser Plant',
      'Uma classe vazia tem apenas as chaves {}',
    ],
    experienceReward: 15,
    conceptsUsed: ['class', 'declaracao'],
  },

  // Desafio 2: Constructor com parametros
  {
    id: 'class-2',
    title: 'Constructor',
    description:
      'O constructor e um metodo especial que e chamado quando criamos uma nova instancia. Crie uma classe `Plant` com um constructor que recebe `name` e `water` e os atribui a `this`.',
    difficulty: 1,
    difficultyTier: 'beginner',
    plantType: 'class',
    instructions: 'Crie uma classe `Plant` com constructor(name, water) e atribua os valores a this.name e this.water.',
    starterCode: `// Crie a classe Plant com constructor
// O constructor deve receber name e water
// Use this.name e this.water para armazenar

`,
    solution: `class Plant {
  constructor(name, water) {
    this.name = name;
    this.water = water;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Rosa', water: 10 },
        description: 'new Plant("Rosa", 10) deve criar objeto correto',
      },
    ],
    hints: [
      'O constructor e definido como: constructor(param1, param2) { }',
      'Use this.propriedade = valor para definir propriedades',
      'this se refere a instancia atual da classe',
    ],
    experienceReward: 15,
    conceptsUsed: ['class', 'constructor', 'this'],
  },

  // Desafio 3: Propriedades da instancia
  {
    id: 'class-3',
    title: 'Propriedades da Instancia',
    description:
      'Crie uma classe `Seed` com constructor que recebe `type` e define `this.type` e `this.planted = false` como valor padrao.',
    difficulty: 2,
    difficultyTier: 'beginner',
    plantType: 'class',
    instructions: 'Crie uma classe `Seed` com constructor(type) definindo this.type e this.planted = false.',
    starterCode: `// Crie a classe Seed
// Constructor recebe type
// Define this.type e this.planted = false

`,
    solution: `class Seed {
  constructor(type) {
    this.type = type;
    this.planted = false;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { type: 'flower', planted: false },
        description: 'new Seed("flower") deve ter type e planted',
      },
    ],
    hints: [
      'Voce pode definir propriedades padrao no constructor',
      'this.planted = false define um valor inicial',
      'O parametro type vem do constructor',
    ],
    experienceReward: 20,
    conceptsUsed: ['class', 'constructor', 'propriedades'],
  },

  // Desafio 4: Metodos da classe
  {
    id: 'class-4',
    title: 'Metodos de Classe',
    description:
      'Metodos sao funcoes dentro da classe. Crie uma classe `Plant` com constructor(name, water) e um metodo `drink(amount)` que adiciona amount ao water.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'class',
    starterCode: `// Crie a classe Plant
// Constructor: name, water
// Metodo drink(amount): adiciona amount ao water

`,
    solution: `class Plant {
  constructor(name, water) {
    this.name = name;
    this.water = water;
  }

  drink(amount) {
    this.water += amount;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 15,
        description: 'Apos drink(5), water deve ser 15',
      },
    ],
    hints: [
      'Metodos sao definidos sem a palavra function',
      'Use this.water para acessar a propriedade',
      'drink(amount) { this.water += amount; }',
    ],
    experienceReward: 25,
    conceptsUsed: ['class', 'methods', 'this'],
  },

  // Desafio 5: Getter methods
  {
    id: 'class-5',
    title: 'Getter Methods',
    description:
      'Getters permitem acessar valores calculados como propriedades. Crie uma classe `Plant` com name e water, e um getter `status` que retorna "saudavel" se water >= 5, senao "sedenta".',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'class',
    starterCode: `// Crie a classe Plant com getter status
// Constructor: name, water
// get status: retorna "saudavel" ou "sedenta"

`,
    solution: `class Plant {
  constructor(name, water) {
    this.name = name;
    this.water = water;
  }

  get status() {
    return this.water >= 5 ? "saudavel" : "sedenta";
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { status1: 'saudavel', status2: 'sedenta' },
        description: 'Getter deve retornar status correto',
      },
    ],
    hints: [
      'Use get nomeDoGetter() { return valor; }',
      'O getter e acessado como propriedade: planta.status',
      'Use operador ternario para a condicao',
    ],
    experienceReward: 25,
    conceptsUsed: ['class', 'getter'],
  },

  // Desafio 6: Setter methods
  {
    id: 'class-6',
    title: 'Setter Methods',
    description:
      'Setters permitem validar valores ao atribuir. Crie uma classe `Plant` com _water privado, getter water e setter water que nao permite valores negativos (usa 0 se negativo).',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'class',
    starterCode: `// Crie a classe Plant
// Use _water como propriedade interna
// get water: retorna _water
// set water(value): atribui valor (min 0)

`,
    solution: `class Plant {
  constructor(water) {
    this._water = water;
  }

  get water() {
    return this._water;
  }

  set water(value) {
    this._water = value < 0 ? 0 : value;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { water1: 10, water2: 0 },
        description: 'Setter deve impedir valores negativos',
      },
    ],
    hints: [
      'Use set nomeDoSetter(value) { }',
      '_water e uma convencao para propriedades "privadas"',
      'O setter e usado como: planta.water = valor',
    ],
    experienceReward: 25,
    conceptsUsed: ['class', 'setter', 'getter'],
  },

  // Desafio 7: Static methods
  {
    id: 'class-7',
    title: 'Metodos Estaticos',
    description:
      'Metodos estaticos pertencem a classe, nao a instancia. Crie uma classe `PlantUtils` com um metodo estatico `isHealthy(water)` que retorna true se water >= 5.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'class',
    starterCode: `// Crie a classe PlantUtils
// static isHealthy(water): retorna water >= 5

`,
    solution: `class PlantUtils {
  static isHealthy(water) {
    return water >= 5;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { healthy: true, unhealthy: false },
        description: 'Metodo estatico deve funcionar sem instancia',
      },
    ],
    hints: [
      'Use static antes do nome do metodo',
      'Chamado como: PlantUtils.isHealthy(10)',
      'Nao precisa criar instancia com new',
    ],
    experienceReward: 25,
    conceptsUsed: ['class', 'static'],
  },

  // Desafio 8: Static properties
  {
    id: 'class-8',
    title: 'Propriedades Estaticas',
    description:
      'Propriedades estaticas sao compartilhadas por todas instancias. Crie uma classe `Plant` com static count = 0, e no constructor incremente Plant.count.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'class',
    starterCode: `// Crie a classe Plant
// static count = 0
// Constructor incrementa Plant.count

`,
    solution: `class Plant {
  static count = 0;

  constructor(name) {
    this.name = name;
    Plant.count++;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 3,
        description: 'Plant.count deve ser 3 apos criar 3 plantas',
      },
    ],
    hints: [
      'static count = 0 define propriedade estatica',
      'Acesse com Plant.count, nao this.count',
      'Cada new Plant() incrementa o contador',
    ],
    experienceReward: 25,
    conceptsUsed: ['class', 'static', 'propriedades'],
  },

  // Desafio 9: Heranca com extends
  {
    id: 'class-9',
    title: 'Heranca com Extends',
    description:
      'Heranca permite criar classes baseadas em outras. Crie uma classe `Flower` que extends `Plant`. Plant tem constructor(name) e metodo grow(). Flower apenas herda.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'class',
    starterCode: `// Classe base Plant
class Plant {
  constructor(name) {
    this.name = name;
  }
  grow() {
    return this.name + " esta crescendo";
  }
}

// Crie Flower que extends Plant

`,
    solution: `class Plant {
  constructor(name) {
    this.name = name;
  }
  grow() {
    return this.name + " esta crescendo";
  }
}

class Flower extends Plant {
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Rosa esta crescendo',
        description: 'Flower deve herdar metodo grow',
      },
    ],
    hints: [
      'Use class Filha extends Pai { }',
      'A classe filha herda metodos e propriedades',
      'Flower extends Plant herda tudo de Plant',
    ],
    experienceReward: 25,
    conceptsUsed: ['class', 'extends', 'heranca'],
  },

  // Desafio 10: Super no constructor
  {
    id: 'class-10',
    title: 'Super no Constructor',
    description:
      'super() chama o constructor da classe pai. Crie `Flower` que extends `Plant`, com constructor(name, color) que chama super(name) e define this.color.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'class',
    starterCode: `class Plant {
  constructor(name) {
    this.name = name;
  }
}

// Crie Flower com constructor(name, color)
// Chame super(name) e defina this.color

`,
    solution: `class Plant {
  constructor(name) {
    this.name = name;
  }
}

class Flower extends Plant {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'Rosa', color: 'vermelha' },
        description: 'Flower deve ter name e color',
      },
    ],
    hints: [
      'super() deve ser chamado antes de usar this',
      'super(name) passa name para Plant',
      'Depois de super(), defina this.color',
    ],
    experienceReward: 30,
    conceptsUsed: ['class', 'extends', 'super'],
  },

  // Desafio 11: Override de metodos
  {
    id: 'class-11',
    title: 'Override de Metodos',
    description:
      'Classes filhas podem sobrescrever metodos. Crie `Cactus` extends `Plant`. Override o metodo `needsWater()` para retornar false (cactos precisam de pouca agua).',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'class',
    starterCode: `class Plant {
  constructor(name) {
    this.name = name;
  }
  needsWater() {
    return true;
  }
}

// Crie Cactus que override needsWater

`,
    solution: `class Plant {
  constructor(name) {
    this.name = name;
  }
  needsWater() {
    return true;
  }
}

class Cactus extends Plant {
  needsWater() {
    return false;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { plantNeeds: true, cactusNeeds: false },
        description: 'Cactus deve retornar false em needsWater',
      },
    ],
    hints: [
      'Defina o metodo com mesmo nome na classe filha',
      'O metodo da filha substitui o do pai',
      'needsWater() { return false; }',
    ],
    experienceReward: 30,
    conceptsUsed: ['class', 'extends', 'override'],
  },

  // Desafio 12: Super.method()
  {
    id: 'class-12',
    title: 'Chamar Metodo do Pai',
    description:
      'Use super.metodo() para chamar o metodo da classe pai. Crie `Flower` que extends `Plant` e override `describe()` para retornar super.describe() + " e tem flores".',
    difficulty: 4,
    difficultyTier: 'master',
    plantType: 'class',
    starterCode: `class Plant {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return this.name + " e uma planta";
  }
}

// Crie Flower que chama super.describe()

`,
    solution: `class Plant {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return this.name + " e uma planta";
  }
}

class Flower extends Plant {
  describe() {
    return super.describe() + " e tem flores";
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Rosa e uma planta e tem flores',
        description: 'describe deve combinar pai e filho',
      },
    ],
    hints: [
      'super.describe() chama o metodo do pai',
      'Concatene o resultado com a string adicional',
      'return super.describe() + " e tem flores"',
    ],
    experienceReward: 30,
    conceptsUsed: ['class', 'extends', 'super'],
  },

  // Desafio 13: Private fields
  {
    id: 'class-13',
    title: 'Campos Privados',
    description:
      'Campos privados usam # e so podem ser acessados dentro da classe. Crie uma classe `SecretPlant` com #secretName privado, constructor(name) e metodo revealName() que retorna #secretName.',
    difficulty: 4,
    difficultyTier: 'master',
    plantType: 'class',
    starterCode: `// Crie SecretPlant com campo privado #secretName
// Constructor recebe name e atribui a #secretName
// Metodo revealName() retorna #secretName

`,
    solution: `class SecretPlant {
  #secretName;

  constructor(name) {
    this.#secretName = name;
  }

  revealName() {
    return this.#secretName;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Orquidea Rara',
        description: 'revealName deve retornar o nome secreto',
      },
    ],
    hints: [
      'Declare o campo privado: #secretName;',
      'Acesse com this.#secretName',
      'Campos # sao inacessiveis fora da classe',
    ],
    experienceReward: 30,
    conceptsUsed: ['class', 'private fields'],
  },

  // Desafio 14: Protected pattern
  {
    id: 'class-14',
    title: 'Padrao Protected',
    description:
      'A convencao _propriedade indica "protegido" (use apenas na classe e filhas). Crie `Plant` com _water, e `Flower` extends `Plant` com metodo `doubleWater()` que dobra _water.',
    difficulty: 4,
    difficultyTier: 'master',
    plantType: 'class',
    starterCode: `// Crie Plant com _water
// Crie Flower extends Plant
// Flower tem doubleWater() que dobra _water

`,
    solution: `class Plant {
  constructor(water) {
    this._water = water;
  }
}

class Flower extends Plant {
  doubleWater() {
    this._water = this._water * 2;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 20,
        description: 'doubleWater deve dobrar _water para 20',
      },
    ],
    hints: [
      '_water e uma convencao, nao e realmente privado',
      'A classe filha pode acessar this._water',
      'doubleWater multiplica _water por 2',
    ],
    experienceReward: 30,
    conceptsUsed: ['class', 'protected pattern', 'heranca'],
  },

  // Desafio 15: Sistema de hierarquia de plantas (combinado)
  {
    id: 'class-15',
    title: 'Hierarquia de Plantas',
    description:
      'Crie um sistema completo: classe `Plant` com name, water e metodo getInfo(). Classe `Flower` extends Plant com color e override getInfo() adicionando a cor. Classe `Rose` extends Flower com thorns e override getInfo() adicionando se tem espinhos.',
    difficulty: 4,
    difficultyTier: 'master',
    plantType: 'class',
    starterCode: `// Crie a hierarquia completa:
// Plant -> Flower -> Rose
// Cada nivel adiciona info ao getInfo()

`,
    solution: `class Plant {
  constructor(name, water) {
    this.name = name;
    this.water = water;
  }

  getInfo() {
    return this.name + " com " + this.water + "ml de agua";
  }
}

class Flower extends Plant {
  constructor(name, water, color) {
    super(name, water);
    this.color = color;
  }

  getInfo() {
    return super.getInfo() + ", cor " + this.color;
  }
}

class Rose extends Flower {
  constructor(name, water, color, thorns) {
    super(name, water, color);
    this.thorns = thorns;
  }

  getInfo() {
    return super.getInfo() + (this.thorns ? ", com espinhos" : ", sem espinhos");
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Rosa com 10ml de agua, cor vermelha, com espinhos',
        description: 'Rose.getInfo() deve mostrar toda a hierarquia',
      },
    ],
    hints: [
      'Cada classe chama super() no constructor',
      'getInfo() usa super.getInfo() e adiciona sua parte',
      'Rose recebe 4 parametros: name, water, color, thorns',
    ],
    experienceReward: 40,
    conceptsUsed: ['class', 'extends', 'super', 'override', 'heranca'],
  },
];

export const getClassChallengeById = (id: string): ChallengeDefinition | undefined => {
  return classesChallenges.find((c) => c.id === id);
};
