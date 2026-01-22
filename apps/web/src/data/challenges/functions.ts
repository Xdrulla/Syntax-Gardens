import type { ChallengeDefinition } from '../../types';

export const functionChallenges: ChallengeDefinition[] = [
  {
    id: 'func-1',
    plantType: 'function',
    difficulty: 2,
    title: 'Primeira Funcao',
    description: 'Crie sua primeira funcao para automatizar a rega.',
    instructions: `Crie uma funcao chamada 'waterPlant' que retorna a string "Planta regada!".

Dica: Use a palavra-chave 'function' para declarar funcoes.`,
    starterCode: `// Crie a funcao waterPlant aqui
`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Planta regada!',
        description: 'waterPlant() deve retornar "Planta regada!"',
      },
    ],
    hints: [
      'Use function nomeDaFuncao() { ... }',
      'Use return para retornar um valor',
      'Exemplo: function waterPlant() { return "Planta regada!"; }',
    ],
    solution: `function waterPlant() {
  return "Planta regada!";
}`,
    experienceReward: 15,
  },
  {
    id: 'func-2',
    plantType: 'function',
    difficulty: 2,
    title: 'Funcao com Parametro',
    description: 'Aprenda a passar informacoes para funcoes.',
    instructions: `Crie uma funcao chamada 'greetPlant' que recebe um parametro 'name'
e retorna "Ola, {name}!".

Exemplo: greetPlant("Rosa") deve retornar "Ola, Rosa!"`,
    starterCode: `// Crie a funcao greetPlant aqui
`,
    testCases: [
      {
        input: 'Rosa',
        expectedOutput: 'Ola, Rosa!',
        description: 'greetPlant("Rosa") deve retornar "Ola, Rosa!"',
      },
      {
        input: 'Girassol',
        expectedOutput: 'Ola, Girassol!',
        description: 'greetPlant("Girassol") deve retornar "Ola, Girassol!"',
      },
    ],
    hints: [
      'Parametros vao dentro dos parenteses: function nome(parametro)',
      'Use template strings: `Ola, ${name}!`',
      'Ou concatenacao: "Ola, " + name + "!"',
    ],
    solution: `function greetPlant(name) {
  return "Ola, " + name + "!";
}`,
    experienceReward: 20,
  },
  {
    id: 'func-3',
    plantType: 'function',
    difficulty: 2,
    title: 'Calculando Agua',
    description: 'Use funcoes para calculos do jardim.',
    instructions: `Crie uma funcao 'calculateWater' que recebe dois parametros:
- 'plants': numero de plantas
- 'waterPerPlant': quantidade de agua por planta

A funcao deve retornar o total de agua necessaria.`,
    starterCode: `// Crie a funcao calculateWater aqui
`,
    testCases: [
      {
        input: [3, 5],
        expectedOutput: 15,
        description: 'calculateWater(3, 5) deve retornar 15',
      },
      {
        input: [10, 2],
        expectedOutput: 20,
        description: 'calculateWater(10, 2) deve retornar 20',
      },
    ],
    hints: [
      'Funcoes podem ter multiplos parametros separados por virgula',
      'Multiplique plants por waterPerPlant',
      'return plants * waterPerPlant;',
    ],
    solution: `function calculateWater(plants, waterPerPlant) {
  return plants * waterPerPlant;
}`,
    experienceReward: 20,
  },
  {
    id: 'func-4',
    plantType: 'function',
    difficulty: 3,
    title: 'Arrow Functions',
    description: 'Aprenda a sintaxe moderna de funcoes.',
    instructions: `Crie uma arrow function chamada 'double' que recebe um numero
e retorna o dobro dele.

Use a sintaxe: const nome = (param) => expressao;`,
    starterCode: `// Crie a arrow function double aqui
`,
    testCases: [
      {
        input: 5,
        expectedOutput: 10,
        description: 'double(5) deve retornar 10',
      },
      {
        input: 7,
        expectedOutput: 14,
        description: 'double(7) deve retornar 14',
      },
    ],
    hints: [
      'Arrow functions usam => ao inves de function',
      'const double = (num) => num * 2;',
      'Para uma unica expressao, o return e implicito',
    ],
    solution: `const double = (num) => num * 2;`,
    experienceReward: 25,
  },
  {
    id: 'func-5',
    plantType: 'function',
    difficulty: 3,
    title: 'Funcao de Crescimento',
    description: 'Crie uma funcao complexa para simular crescimento.',
    instructions: `Crie uma funcao 'growthRate' que recebe:
- 'days': numero de dias
- 'sunlight': horas de sol por dia (padrao: 6)

A funcao deve retornar: days * sunlight * 0.5

Se sunlight nao for fornecido, use 6 como valor padrao.`,
    starterCode: `// Crie a funcao growthRate aqui
`,
    testCases: [
      {
        input: [10, 8],
        expectedOutput: 40,
        description: 'growthRate(10, 8) deve retornar 40',
      },
      {
        input: [10],
        expectedOutput: 30,
        description: 'growthRate(10) deve retornar 30 (usando sunlight padrao)',
      },
    ],
    hints: [
      'Use valor padrao: function nome(param = valorPadrao)',
      'function growthRate(days, sunlight = 6)',
      'Retorne days * sunlight * 0.5',
    ],
    solution: `function growthRate(days, sunlight = 6) {
  return days * sunlight * 0.5;
}`,
    experienceReward: 30,
  },
];
