import type { ChallengeDefinition } from '../../types';

export const conditionalChallenges: ChallengeDefinition[] = [
  {
    id: 'cond-1',
    plantType: 'conditional',
    difficulty: 1,
    title: 'If Simples',
    description: 'Aprenda a usar if para tomar decisoes no codigo.',
    instructions: `Verifique se a variavel 'water' e maior que 0.
Se for, atribua true a variavel 'hasWater'.

A variavel 'water' ja esta declarada com valor 10.`,
    starterCode: `let water = 10;
let hasWater = false;

// Verifique se water > 0 e atualize hasWater
`,
    testCases: [
      {
        input: null,
        expectedOutput: true,
        description: 'hasWater deve ser true quando water > 0',
      },
    ],
    hints: [
      'Use a estrutura: if (condicao) { ... }',
      'A condicao e: water > 0',
      'Dentro do if, faca: hasWater = true;',
    ],
    solution: `let water = 10;
let hasWater = false;

if (water > 0) {
  hasWater = true;
}`,
    experienceReward: 5,
  },
  {
    id: 'cond-2',
    plantType: 'conditional',
    difficulty: 1,
    title: 'If/Else',
    description: 'Use else para lidar com o caso contrario.',
    instructions: `Verifique se a planta precisa de agua (waterLevel < 5).
- Se precisar, atribua "Precisa regar" a 'status'
- Se nao precisar, atribua "Planta hidratada" a 'status'`,
    starterCode: `let waterLevel = 3;
let status = "";

// Use if/else para definir o status
`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Precisa regar',
        description: 'status deve ser "Precisa regar" quando waterLevel < 5',
      },
    ],
    hints: [
      'Use if (waterLevel < 5) { ... } else { ... }',
      'Dentro do if: status = "Precisa regar"',
      'Dentro do else: status = "Planta hidratada"',
    ],
    solution: `let waterLevel = 3;
let status = "";

if (waterLevel < 5) {
  status = "Precisa regar";
} else {
  status = "Planta hidratada";
}`,
    experienceReward: 8,
  },
  {
    id: 'cond-3',
    plantType: 'conditional',
    difficulty: 1,
    title: 'If/Else If/Else',
    description: 'Classifique o nivel de agua em tres categorias.',
    instructions: `Classifique o nivel de agua:
- Se waterLevel < 3: level = "baixo"
- Se waterLevel < 7: level = "medio"
- Caso contrario: level = "alto"

A variavel waterLevel ja esta definida como 5.`,
    starterCode: `let waterLevel = 5;
let level = "";

// Classifique o nivel de agua
`,
    testCases: [
      {
        input: null,
        expectedOutput: 'medio',
        description: 'level deve ser "medio" quando waterLevel e 5',
      },
    ],
    hints: [
      'Use if/else if/else para tres condicoes',
      'Primeira condicao: waterLevel < 3',
      'Segunda condicao: waterLevel < 7',
      'else para o resto',
    ],
    solution: `let waterLevel = 5;
let level = "";

if (waterLevel < 3) {
  level = "baixo";
} else if (waterLevel < 7) {
  level = "medio";
} else {
  level = "alto";
}`,
    experienceReward: 10,
  },
  {
    id: 'cond-4',
    plantType: 'conditional',
    difficulty: 1,
    title: 'Operadores de Comparacao',
    description: 'Aprenda os diferentes operadores de comparacao.',
    instructions: `Use operadores de comparacao para verificar:
- isEqual: se a === b (igualdade estrita)
- isNotEqual: se a !== c (diferenca estrita)
- isGreater: se a > c
- isLessOrEqual: se c <= b

Variaveis: a = 5, b = 5, c = 3`,
    starterCode: `let a = 5;
let b = 5;
let c = 3;

// Defina as variaveis booleanas
let isEqual =
let isNotEqual =
let isGreater =
let isLessOrEqual = `,
    testCases: [
      {
        input: null,
        expectedOutput: { isEqual: true, isNotEqual: true, isGreater: true, isLessOrEqual: true },
        description: 'Todas as comparacoes devem ser true',
      },
    ],
    hints: [
      '=== verifica igualdade de valor E tipo',
      '!== verifica se sao diferentes',
      '> e < comparam valores',
      '<= significa menor OU igual',
    ],
    solution: `let a = 5;
let b = 5;
let c = 3;

let isEqual = a === b;
let isNotEqual = a !== c;
let isGreater = a > c;
let isLessOrEqual = c <= b;`,
    experienceReward: 10,
  },
  {
    id: 'cond-5',
    plantType: 'conditional',
    difficulty: 2,
    title: 'Operador AND (&&)',
    description: 'Combine condicoes com o operador AND.',
    instructions: `Uma planta so pode ser regada se:
- hasWater e true E
- isPlanted e true

Use && para verificar AMBAS as condicoes.
Se ambas forem verdadeiras, canWater = true.`,
    starterCode: `let hasWater = true;
let isPlanted = true;
let canWater = false;

// Use && para verificar ambas condicoes
`,
    testCases: [
      {
        input: null,
        expectedOutput: true,
        description: 'canWater deve ser true quando ambas condicoes sao verdadeiras',
      },
    ],
    hints: [
      '&& retorna true apenas se AMBOS os lados forem true',
      'Sintaxe: condicao1 && condicao2',
      'if (hasWater && isPlanted) { ... }',
    ],
    solution: `let hasWater = true;
let isPlanted = true;
let canWater = false;

if (hasWater && isPlanted) {
  canWater = true;
}`,
    experienceReward: 12,
  },
  {
    id: 'cond-6',
    plantType: 'conditional',
    difficulty: 2,
    title: 'Operador OR (||)',
    description: 'Use OR para verificar alternativas.',
    instructions: `Uma planta precisa de atencao se:
- waterLevel < 3 OU
- sunlight < 2

Use || para verificar se PELO MENOS UMA condicao e verdadeira.
Se qualquer uma for verdadeira, needsAttention = true.`,
    starterCode: `let waterLevel = 5;
let sunlight = 1;
let needsAttention = false;

// Use || para verificar as condicoes
`,
    testCases: [
      {
        input: null,
        expectedOutput: true,
        description: 'needsAttention deve ser true quando sunlight < 2',
      },
    ],
    hints: [
      '|| retorna true se QUALQUER lado for true',
      'Sintaxe: condicao1 || condicao2',
      'Basta uma ser verdadeira para o resultado ser true',
    ],
    solution: `let waterLevel = 5;
let sunlight = 1;
let needsAttention = false;

if (waterLevel < 3 || sunlight < 2) {
  needsAttention = true;
}`,
    experienceReward: 12,
  },
  {
    id: 'cond-7',
    plantType: 'conditional',
    difficulty: 2,
    title: 'Operador NOT (!)',
    description: 'Inverta condicoes com o operador NOT.',
    instructions: `Use o operador ! para inverter valores booleanos.

- Se a planta NAO esta morta (!isDead), ela canGrow.
- Inverta tambem o valor de isEmpty para criar isFilled.`,
    starterCode: `let isDead = false;
let isEmpty = true;

let canGrow = false;
let isFilled = false;

// Use ! para inverter as condicoes
`,
    testCases: [
      {
        input: null,
        expectedOutput: { canGrow: true, isFilled: false },
        description: 'canGrow deve ser true e isFilled deve ser false',
      },
    ],
    hints: [
      '! inverte true para false e vice-versa',
      '!false === true',
      '!true === false',
    ],
    solution: `let isDead = false;
let isEmpty = true;

let canGrow = false;
let isFilled = false;

if (!isDead) {
  canGrow = true;
}
isFilled = !isEmpty;`,
    experienceReward: 12,
  },
  {
    id: 'cond-8',
    plantType: 'conditional',
    difficulty: 2,
    title: 'Condicoes Aninhadas',
    description: 'Use if dentro de if para logica mais complexa.',
    instructions: `Verifique primeiro se a estacao e "verao".
Se for verao, verifique se a temperatura > 30.
- Se ambas forem verdadeiras: status = "Muito quente"
- Se for verao mas temp <= 30: status = "Clima ideal"
- Se nao for verao: status = "Fora de estacao"`,
    starterCode: `let season = "verao";
let temperature = 35;
let status = "";

// Use if aninhado para definir o status
`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Muito quente',
        description: 'status deve ser "Muito quente" no verao com temp > 30',
      },
    ],
    hints: [
      'Primeiro if verifica a estacao',
      'Dentro dele, outro if verifica a temperatura',
      'Use else para os outros casos',
    ],
    solution: `let season = "verao";
let temperature = 35;
let status = "";

if (season === "verao") {
  if (temperature > 30) {
    status = "Muito quente";
  } else {
    status = "Clima ideal";
  }
} else {
  status = "Fora de estacao";
}`,
    experienceReward: 15,
  },
  {
    id: 'cond-9',
    plantType: 'conditional',
    difficulty: 2,
    title: 'Operador Ternario',
    description: 'Aprenda a forma curta de if/else.',
    instructions: `Use o operador ternario para definir:
- waterStatus: "Cheio" se waterLevel >= 5, senao "Vazio"
- plantSize: "Grande" se height > 10, senao "Pequena"

Sintaxe: condicao ? valorSeTrue : valorSeFalse`,
    starterCode: `let waterLevel = 7;
let height = 15;

// Use operador ternario
let waterStatus =
let plantSize = `,
    testCases: [
      {
        input: null,
        expectedOutput: { waterStatus: 'Cheio', plantSize: 'Grande' },
        description: 'waterStatus deve ser "Cheio" e plantSize deve ser "Grande"',
      },
    ],
    hints: [
      'Ternario: condicao ? seTrue : seFalse',
      'waterLevel >= 5 ? "Cheio" : "Vazio"',
      'E uma forma compacta de if/else em uma linha',
    ],
    solution: `let waterLevel = 7;
let height = 15;

let waterStatus = waterLevel >= 5 ? "Cheio" : "Vazio";
let plantSize = height > 10 ? "Grande" : "Pequena";`,
    experienceReward: 12,
  },
  {
    id: 'cond-10',
    plantType: 'conditional',
    difficulty: 3,
    title: 'Ternario Aninhado',
    description: 'Use ternarios para multiplas condicoes.',
    instructions: `Classifique a planta por tamanho usando ternarios aninhados:
- Se height < 5: "Muda"
- Se height < 15: "Jovem"
- Caso contrario: "Adulta"

Use ternarios encadeados (nao if/else).`,
    starterCode: `let height = 10;

// Use ternario aninhado
let plantStage = `,
    testCases: [
      {
        input: null,
        expectedOutput: 'Jovem',
        description: 'plantStage deve ser "Jovem" quando height e 10',
      },
    ],
    hints: [
      'Encadeie ternarios: cond1 ? val1 : cond2 ? val2 : val3',
      'height < 5 ? "Muda" : (proxima condicao)',
      'Parenteses ajudam a visualizar a estrutura',
    ],
    solution: `let height = 10;

let plantStage = height < 5 ? "Muda" : height < 15 ? "Jovem" : "Adulta";`,
    experienceReward: 15,
  },
  {
    id: 'cond-11',
    plantType: 'conditional',
    difficulty: 2,
    title: 'Switch/Case Basico',
    description: 'Use switch para multiplas opcoes.',
    instructions: `Use switch para definir a cor baseada na estacao:
- "primavera": cor = "verde"
- "verao": cor = "amarelo"
- "outono": cor = "laranja"
- "inverno": cor = "branco"`,
    starterCode: `let season = "outono";
let color = "";

// Use switch/case para definir a cor
`,
    testCases: [
      {
        input: null,
        expectedOutput: 'laranja',
        description: 'color deve ser "laranja" para outono',
      },
    ],
    hints: [
      'switch (variavel) { case valor: ... break; }',
      'Cada case precisa de break no final',
      'Nao esqueca o break ou vai executar os proximos cases',
    ],
    solution: `let season = "outono";
let color = "";

switch (season) {
  case "primavera":
    color = "verde";
    break;
  case "verao":
    color = "amarelo";
    break;
  case "outono":
    color = "laranja";
    break;
  case "inverno":
    color = "branco";
    break;
}`,
    experienceReward: 12,
  },
  {
    id: 'cond-12',
    plantType: 'conditional',
    difficulty: 2,
    title: 'Switch com Default',
    description: 'Adicione um caso padrao ao switch.',
    instructions: `Classifique o tipo de planta usando switch:
- "rosa": tipo = "flor"
- "samambaia": tipo = "folhagem"
- "cacto": tipo = "suculenta"
- Qualquer outro: tipo = "desconhecido"

Use default para o caso padrao.`,
    starterCode: `let plantName = "tulipa";
let type = "";

// Use switch com default
`,
    testCases: [
      {
        input: null,
        expectedOutput: 'desconhecido',
        description: 'type deve ser "desconhecido" para tulipa',
      },
    ],
    hints: [
      'default: e executado quando nenhum case corresponde',
      'default nao precisa de break (e o ultimo)',
      'Sempre inclua default para casos inesperados',
    ],
    solution: `let plantName = "tulipa";
let type = "";

switch (plantName) {
  case "rosa":
    type = "flor";
    break;
  case "samambaia":
    type = "folhagem";
    break;
  case "cacto":
    type = "suculenta";
    break;
  default:
    type = "desconhecido";
}`,
    experienceReward: 12,
  },
  {
    id: 'cond-13',
    plantType: 'conditional',
    difficulty: 3,
    title: 'Truthy e Falsy',
    description: 'Entenda valores que viram true ou false.',
    instructions: `Em JavaScript, alguns valores sao "falsy" (viram false):
- 0, "", null, undefined, NaN, false

Verifique cada variavel e defina:
- hasName: true se name tem valor (nao e string vazia)
- hasCount: true se count tem valor (nao e 0)
- hasData: true se data tem valor (nao e null)`,
    starterCode: `let name = "Rosa";
let count = 0;
let data = null;

// Verifique usando truthy/falsy
let hasName =
let hasCount =
let hasData = `,
    testCases: [
      {
        input: null,
        expectedOutput: { hasName: true, hasCount: false, hasData: false },
        description: 'hasName true, hasCount false, hasData false',
      },
    ],
    hints: [
      'Em um if, valores falsy viram false automaticamente',
      'Strings vazias "", 0 e null sao falsy',
      'Use !! para converter para boolean: !!value',
    ],
    solution: `let name = "Rosa";
let count = 0;
let data = null;

let hasName = !!name;
let hasCount = !!count;
let hasData = !!data;`,
    experienceReward: 15,
  },
  {
    id: 'cond-14',
    plantType: 'conditional',
    difficulty: 3,
    title: 'Comparacao com Null e Undefined',
    description: 'Aprenda a verificar valores nulos corretamente.',
    instructions: `Verifique os valores:
- isNull: true se value1 e exatamente null
- isUndefined: true se value2 e exatamente undefined
- hasValue: true se value3 nao e null NEM undefined

Use === para comparacoes estritas.`,
    starterCode: `let value1 = null;
let value2 = undefined;
let value3 = "Planta";

// Verifique os valores
let isNull =
let isUndefined =
let hasValue = `,
    testCases: [
      {
        input: null,
        expectedOutput: { isNull: true, isUndefined: true, hasValue: true },
        description: 'Todas verificacoes devem ser true',
      },
    ],
    hints: [
      'null === null e true',
      'undefined === undefined e true',
      'Para hasValue: value !== null && value !== undefined',
    ],
    solution: `let value1 = null;
let value2 = undefined;
let value3 = "Planta";

let isNull = value1 === null;
let isUndefined = value2 === undefined;
let hasValue = value3 !== null && value3 !== undefined;`,
    experienceReward: 15,
  },
  {
    id: 'cond-15',
    plantType: 'conditional',
    difficulty: 3,
    title: 'Sistema de Irrigacao Inteligente',
    description: 'Combine tudo em um sistema completo de decisao.',
    instructions: `Crie um sistema de irrigacao que decide a acao:

Regras:
1. Se nao houver agua no tanque (tank <= 0): action = "Encher tanque"
2. Se a planta esta morta (isDead): action = "Remover planta"
3. Se o solo esta seco (moisture < 3) E e horario de regar (hour >= 6 E hour < 20):
   action = "Regar agora"
4. Se o solo esta seco mas fora do horario: action = "Agendar rega"
5. Caso contrario: action = "Monitorando"`,
    starterCode: `let tank = 10;
let isDead = false;
let moisture = 2;
let hour = 14;

let action = "";

// Implemente o sistema de decisao
`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Regar agora',
        description: 'Deve regar quando solo seco e horario apropriado',
      },
    ],
    hints: [
      'Verifique as condicoes na ordem de prioridade',
      'Use && para combinar condicoes do horario',
      'A condicao 3 precisa de: moisture < 3 && hour >= 6 && hour < 20',
    ],
    solution: `let tank = 10;
let isDead = false;
let moisture = 2;
let hour = 14;

let action = "";

if (tank <= 0) {
  action = "Encher tanque";
} else if (isDead) {
  action = "Remover planta";
} else if (moisture < 3 && hour >= 6 && hour < 20) {
  action = "Regar agora";
} else if (moisture < 3) {
  action = "Agendar rega";
} else {
  action = "Monitorando";
}`,
    experienceReward: 25,
  },
];

export const getConditionalChallengeById = (id: string): ChallengeDefinition | undefined => {
  return conditionalChallenges.find((challenge) => challenge.id === id);
};
