import type { ChallengeDefinition } from '../../types';

export const mathChallenges: ChallengeDefinition[] = [
  {
    id: 'math-1',
    plantType: 'math',
    difficulty: 1,
    title: 'Math.round()',
    description: 'Arredonde numeros para o inteiro mais proximo.',
    instructions: `Use Math.round() para arredondar:
- rounded1: arredonde 4.3 (resultado: 4)
- rounded2: arredonde 4.7 (resultado: 5)
- rounded3: arredonde 4.5 (resultado: 5 - .5 arredonda pra cima)`,
    starterCode: `// Use Math.round()
let rounded1 =
let rounded2 =
let rounded3 = `,
    testCases: [
      {
        input: null,
        expectedOutput: { rounded1: 4, rounded2: 5, rounded3: 5 },
        description: 'Arredondamentos corretos',
      },
    ],
    hints: [
      'Math.round() arredonda para o inteiro mais proximo',
      '.5 ou mais arredonda para cima',
      'Menos que .5 arredonda para baixo',
    ],
    solution: `let rounded1 = Math.round(4.3);
let rounded2 = Math.round(4.7);
let rounded3 = Math.round(4.5);`,
    experienceReward: 5,
  },
  {
    id: 'math-2',
    plantType: 'math',
    difficulty: 1,
    title: 'Math.floor()',
    description: 'Arredonde sempre para baixo.',
    instructions: `Use Math.floor() para arredondar para baixo:
- floor1: arredonde 4.9 para baixo (resultado: 4)
- floor2: arredonde 4.1 para baixo (resultado: 4)
- floor3: arredonde -2.3 para baixo (resultado: -3, nao -2!)`,
    starterCode: `// Use Math.floor()
let floor1 =
let floor2 =
let floor3 = `,
    testCases: [
      {
        input: null,
        expectedOutput: { floor1: 4, floor2: 4, floor3: -3 },
        description: 'Math.floor aplicado corretamente',
      },
    ],
    hints: [
      'Math.floor() sempre arredonda para o inteiro MENOR',
      'Para negativos, -2.3 vai para -3 (que e menor)',
      'Diferente de truncar!',
    ],
    solution: `let floor1 = Math.floor(4.9);
let floor2 = Math.floor(4.1);
let floor3 = Math.floor(-2.3);`,
    experienceReward: 5,
  },
  {
    id: 'math-3',
    plantType: 'math',
    difficulty: 1,
    title: 'Math.ceil()',
    description: 'Arredonde sempre para cima.',
    instructions: `Use Math.ceil() para arredondar para cima:
- ceil1: arredonde 4.1 para cima (resultado: 5)
- ceil2: arredonde 4.9 para cima (resultado: 5)
- ceil3: arredonde -2.3 para cima (resultado: -2)`,
    starterCode: `// Use Math.ceil()
let ceil1 =
let ceil2 =
let ceil3 = `,
    testCases: [
      {
        input: null,
        expectedOutput: { ceil1: 5, ceil2: 5, ceil3: -2 },
        description: 'Math.ceil aplicado corretamente',
      },
    ],
    hints: [
      'Math.ceil() sempre arredonda para o inteiro MAIOR',
      'Ceil vem de "ceiling" (teto)',
      'Para negativos, -2.3 vai para -2 (que e maior)',
    ],
    solution: `let ceil1 = Math.ceil(4.1);
let ceil2 = Math.ceil(4.9);
let ceil3 = Math.ceil(-2.3);`,
    experienceReward: 5,
  },
  {
    id: 'math-4',
    plantType: 'math',
    difficulty: 1,
    title: 'Math.random()',
    description: 'Gere numeros aleatorios.',
    instructions: `Math.random() gera um numero entre 0 (inclusive) e 1 (exclusive).

Crie:
- random: um numero aleatorio entre 0 e 1
- isValid: verifique se random >= 0 E random < 1`,
    starterCode: `// Gere um numero aleatorio
let random =
let isValid = `,
    testCases: [
      {
        input: null,
        expectedOutput: true,
        description: 'isValid deve ser true (random entre 0 e 1)',
      },
    ],
    hints: [
      'Math.random() nao precisa de argumentos',
      'Sempre retorna valor >= 0 e < 1',
      'Use && para verificar ambas condicoes',
    ],
    solution: `let random = Math.random();
let isValid = random >= 0 && random < 1;`,
    experienceReward: 8,
  },
  {
    id: 'math-5',
    plantType: 'math',
    difficulty: 2,
    title: 'Numero Aleatorio em Intervalo',
    description: 'Gere numeros aleatorios em um intervalo especifico.',
    instructions: `Gere numeros aleatorios em intervalos:
- randomInt: inteiro entre 1 e 10 (inclusive)
- randomRange: numero entre 5 e 15 (pode ser decimal)

Formula para inteiro em [min, max]:
Math.floor(Math.random() * (max - min + 1)) + min`,
    starterCode: `let min = 1;
let max = 10;

// Gere os numeros aleatorios
let randomInt =
let randomRange = `,
    testCases: [
      {
        input: null,
        expectedOutput: true,
        description: 'randomInt entre 1-10 e randomRange entre 5-15',
      },
    ],
    hints: [
      'Para intervalo [a, b]: Math.random() * (b - a) + a',
      'Para inteiros, use Math.floor() e adicione 1 ao range',
      'Math.floor(Math.random() * 10) + 1 da 1-10',
    ],
    solution: `let min = 1;
let max = 10;

let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
let randomRange = Math.random() * 10 + 5;`,
    experienceReward: 12,
  },
  {
    id: 'math-6',
    plantType: 'math',
    difficulty: 1,
    title: 'Math.max() e Math.min()',
    description: 'Encontre o maior e menor valor.',
    instructions: `Use Math.max() e Math.min():
- biggest: maior valor entre 10, 5, 8, 15, 3
- smallest: menor valor entre 10, 5, 8, 15, 3
- range: diferenca entre maior e menor`,
    starterCode: `// Encontre maior e menor
let biggest =
let smallest =
let range = `,
    testCases: [
      {
        input: null,
        expectedOutput: { biggest: 15, smallest: 3, range: 12 },
        description: 'Valores corretos encontrados',
      },
    ],
    hints: [
      'Math.max(a, b, c, ...) retorna o maior',
      'Math.min(a, b, c, ...) retorna o menor',
      'Podem receber qualquer quantidade de argumentos',
    ],
    solution: `let biggest = Math.max(10, 5, 8, 15, 3);
let smallest = Math.min(10, 5, 8, 15, 3);
let range = biggest - smallest;`,
    experienceReward: 8,
  },
  {
    id: 'math-7',
    plantType: 'math',
    difficulty: 1,
    title: 'Math.abs()',
    description: 'Obtenha o valor absoluto.',
    instructions: `Use Math.abs() para obter valores absolutos:
- abs1: valor absoluto de -10 (resultado: 10)
- abs2: valor absoluto de 5 (resultado: 5)
- distance: distancia entre -7 e 3 (use abs da diferenca)`,
    starterCode: `// Use Math.abs()
let abs1 =
let abs2 =
let distance = `,
    testCases: [
      {
        input: null,
        expectedOutput: { abs1: 10, abs2: 5, distance: 10 },
        description: 'Valores absolutos corretos',
      },
    ],
    hints: [
      'Math.abs() remove o sinal negativo',
      'abs(-10) = 10, abs(10) = 10',
      'Distancia = abs(a - b) ou abs(b - a)',
    ],
    solution: `let abs1 = Math.abs(-10);
let abs2 = Math.abs(5);
let distance = Math.abs(-7 - 3);`,
    experienceReward: 5,
  },
  {
    id: 'math-8',
    plantType: 'math',
    difficulty: 2,
    title: 'Math.pow() e Operador **',
    description: 'Calcule potencias.',
    instructions: `Calcule potencias de duas formas:
- squared: 5 ao quadrado usando Math.pow()
- cubed: 3 ao cubo usando o operador **
- root: raiz quadrada de 16 (16 elevado a 0.5)`,
    starterCode: `// Calcule as potencias
let squared =
let cubed =
let root = `,
    testCases: [
      {
        input: null,
        expectedOutput: { squared: 25, cubed: 27, root: 4 },
        description: 'Potencias calculadas corretamente',
      },
    ],
    hints: [
      'Math.pow(base, expoente)',
      '** e o operador de potenciacao: 2 ** 3 = 8',
      'x ** 0.5 e o mesmo que raiz quadrada',
    ],
    solution: `let squared = Math.pow(5, 2);
let cubed = 3 ** 3;
let root = 16 ** 0.5;`,
    experienceReward: 10,
  },
  {
    id: 'math-9',
    plantType: 'math',
    difficulty: 1,
    title: 'Math.sqrt()',
    description: 'Calcule raizes quadradas.',
    instructions: `Use Math.sqrt() para calcular raizes:
- sqrt1: raiz quadrada de 25
- sqrt2: raiz quadrada de 2 (numero irracional)
- hypotenuse: hipotenusa de triangulo com catetos 3 e 4

Lembre: hipotenusa = sqrt(a² + b²)`,
    starterCode: `// Calcule as raizes
let sqrt1 =
let sqrt2 =
let hypotenuse = `,
    testCases: [
      {
        input: null,
        expectedOutput: { sqrt1: 5, sqrt2: 1.4142135623730951, hypotenuse: 5 },
        description: 'Raizes calculadas corretamente',
      },
    ],
    hints: [
      'Math.sqrt(x) retorna a raiz quadrada de x',
      'sqrt(25) = 5 porque 5*5 = 25',
      'Teorema de Pitagoras: c = sqrt(a² + b²)',
    ],
    solution: `let sqrt1 = Math.sqrt(25);
let sqrt2 = Math.sqrt(2);
let hypotenuse = Math.sqrt(3**2 + 4**2);`,
    experienceReward: 8,
  },
  {
    id: 'math-10',
    plantType: 'math',
    difficulty: 2,
    title: 'parseInt()',
    description: 'Converta strings para inteiros.',
    instructions: `Use parseInt() para converter:
- int1: converter "42" para numero
- int2: converter "3.14" para inteiro (trunca decimais)
- int3: converter "10px" para numero (ignora texto)
- int4: converter "abc" (resultado: NaN)`,
    starterCode: `// Use parseInt()
let int1 =
let int2 =
let int3 =
let int4 = `,
    testCases: [
      {
        input: null,
        expectedOutput: { int1: 42, int2: 3, int3: 10 },
        description: 'Conversoes corretas (int4 sera NaN)',
      },
    ],
    hints: [
      'parseInt("42") retorna o numero 42',
      'Para decimais, ignora tudo apos o ponto',
      'Para texto no final, ignora o texto',
      'Texto no inicio retorna NaN',
    ],
    solution: `let int1 = parseInt("42");
let int2 = parseInt("3.14");
let int3 = parseInt("10px");
let int4 = parseInt("abc");`,
    experienceReward: 10,
  },
  {
    id: 'math-11',
    plantType: 'math',
    difficulty: 2,
    title: 'parseFloat()',
    description: 'Converta strings para decimais.',
    instructions: `Use parseFloat() para converter:
- float1: converter "3.14159" para numero
- float2: converter "10.5kg" para numero
- float3: converter ".5" para numero (0.5)`,
    starterCode: `// Use parseFloat()
let float1 =
let float2 =
let float3 = `,
    testCases: [
      {
        input: null,
        expectedOutput: { float1: 3.14159, float2: 10.5, float3: 0.5 },
        description: 'Conversoes para float corretas',
      },
    ],
    hints: [
      'parseFloat() preserva a parte decimal',
      'Ignora texto no final da string',
      '".5" e interpretado como "0.5"',
    ],
    solution: `let float1 = parseFloat("3.14159");
let float2 = parseFloat("10.5kg");
let float3 = parseFloat(".5");`,
    experienceReward: 8,
  },
  {
    id: 'math-12',
    plantType: 'math',
    difficulty: 2,
    title: 'Number()',
    description: 'Use Number() para conversoes.',
    instructions: `Use Number() para converter:
- num1: converter "42" para numero
- num2: converter true para numero (1)
- num3: converter false para numero (0)
- num4: converter "" (string vazia) para numero`,
    starterCode: `// Use Number()
let num1 =
let num2 =
let num3 =
let num4 = `,
    testCases: [
      {
        input: null,
        expectedOutput: { num1: 42, num2: 1, num3: 0, num4: 0 },
        description: 'Conversoes com Number() corretas',
      },
    ],
    hints: [
      'Number() e mais estrito que parseInt',
      'true vira 1, false vira 0',
      'String vazia vira 0',
      'Number("10px") retorna NaN (diferente de parseInt)',
    ],
    solution: `let num1 = Number("42");
let num2 = Number(true);
let num3 = Number(false);
let num4 = Number("");`,
    experienceReward: 10,
  },
  {
    id: 'math-13',
    plantType: 'math',
    difficulty: 2,
    title: 'toFixed()',
    description: 'Limite casas decimais.',
    instructions: `Use toFixed() para formatar decimais:
- price: formate 19.99999 com 2 casas decimais
- rounded: formate 3.14159 com 3 casas decimais
- whole: formate 42.7 com 0 casas decimais

Nota: toFixed() retorna uma STRING!`,
    starterCode: `// Use toFixed()
let price =
let rounded =
let whole = `,
    testCases: [
      {
        input: null,
        expectedOutput: { price: '20.00', rounded: '3.142', whole: '43' },
        description: 'Formatacoes com toFixed() corretas',
      },
    ],
    hints: [
      'toFixed(n) limita a n casas decimais',
      'Arredonda o valor se necessario',
      'Retorna string, nao numero!',
    ],
    solution: `let price = (19.99999).toFixed(2);
let rounded = (3.14159).toFixed(3);
let whole = (42.7).toFixed(0);`,
    experienceReward: 10,
  },
  {
    id: 'math-14',
    plantType: 'math',
    difficulty: 2,
    title: 'isNaN() e isFinite()',
    description: 'Valide se valores sao numeros validos.',
    instructions: `Use isNaN() e isFinite() para validar:
- check1: 42 e NaN? (false)
- check2: "hello" convertido para numero e NaN? (true)
- check3: Infinity e finito? (false)
- check4: 100 e finito? (true)`,
    starterCode: `// Valide os valores
let check1 =
let check2 =
let check3 =
let check4 = `,
    testCases: [
      {
        input: null,
        expectedOutput: { check1: false, check2: true, check3: false, check4: true },
        description: 'Validacoes corretas',
      },
    ],
    hints: [
      'isNaN() verifica se e "Not a Number"',
      'Number("hello") resulta em NaN',
      'isFinite() retorna false para Infinity e -Infinity',
      'isFinite() tambem retorna false para NaN',
    ],
    solution: `let check1 = isNaN(42);
let check2 = isNaN(Number("hello"));
let check3 = isFinite(Infinity);
let check4 = isFinite(100);`,
    experienceReward: 10,
  },
  {
    id: 'math-15',
    plantType: 'math',
    difficulty: 2,
    title: 'Math.PI e Math.E',
    description: 'Use constantes matematicas.',
    instructions: `Use as constantes Math.PI e Math.E:
- circumference: circunferencia de circulo com raio 5 (2 * PI * r)
- area: area de circulo com raio 3 (PI * r²)
- euler: valor de Math.E (numero de Euler)`,
    starterCode: `// Use as constantes matematicas
let circumference =
let area =
let euler = `,
    testCases: [
      {
        input: null,
        expectedOutput: {
          circumference: 31.41592653589793,
          area: 28.274333882308138,
          euler: 2.718281828459045,
        },
        description: 'Calculos com constantes corretos',
      },
    ],
    hints: [
      'Math.PI e aproximadamente 3.14159...',
      'Math.E e aproximadamente 2.71828...',
      'Circunferencia = 2 * PI * raio',
      'Area = PI * raio²',
    ],
    solution: `let circumference = 2 * Math.PI * 5;
let area = Math.PI * 3 ** 2;
let euler = Math.E;`,
    experienceReward: 10,
  },
  {
    id: 'math-16',
    plantType: 'math',
    difficulty: 3,
    title: 'Calculadora de Crescimento',
    description: 'Combine tudo para calcular crescimento de plantas.',
    instructions: `Crie uma calculadora de crescimento:

Dados:
- Altura inicial: 10.5 cm
- Taxa de crescimento diario: 2.3% (0.023)
- Dias: 30

Calcule:
- finalHeight: altura apos 30 dias (formula: inicial * (1 + taxa) ^ dias)
- roundedHeight: finalHeight arredondado para inteiro
- growthPercent: porcentagem de crescimento total, com 1 casa decimal

Formula crescimento exponencial: P = P0 * (1 + r)^t`,
    starterCode: `let initialHeight = 10.5;
let dailyRate = 0.023;
let days = 30;

// Calcule o crescimento
let finalHeight =
let roundedHeight =
let growthPercent = `,
    testCases: [
      {
        input: null,
        expectedOutput: {
          finalHeight: 20.855931603498948,
          roundedHeight: 21,
          growthPercent: '98.6',
        },
        description: 'Calculos de crescimento corretos',
      },
    ],
    hints: [
      'Use Math.pow() ou ** para a potenciacao',
      'finalHeight = initial * (1 + rate) ** days',
      'Porcentagem = ((final - inicial) / inicial) * 100',
      'Use toFixed(1) para 1 casa decimal',
    ],
    solution: `let initialHeight = 10.5;
let dailyRate = 0.023;
let days = 30;

let finalHeight = initialHeight * Math.pow(1 + dailyRate, days);
let roundedHeight = Math.round(finalHeight);
let growthPercent = (((finalHeight - initialHeight) / initialHeight) * 100).toFixed(1);`,
    experienceReward: 25,
  },
];

export const getMathChallengeById = (id: string): ChallengeDefinition | undefined => {
  return mathChallenges.find((challenge) => challenge.id === id);
};
