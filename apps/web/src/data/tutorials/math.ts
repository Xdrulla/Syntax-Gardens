import type { ConceptTutorial } from './index';

export const mathTutorial: ConceptTutorial = {
  conceptId: 'math',
  title: 'Math: Calculos e Numeros',
  icon: '🔢',
  introduction: `JavaScript tem um objeto especial chamado \`Math\` que contem funcoes matematicas uteis. Com ele, voce pode arredondar numeros, calcular raizes, gerar numeros aleatorios, e muito mais.

Alem do objeto Math, existem funcoes como \`parseInt()\` e \`parseFloat()\` para converter textos em numeros, e metodos como \`.toFixed()\` para formatar casas decimais.

Essas ferramentas sao essenciais para calculos de crescimento, quantidades de recursos, e qualquer logica numerica do jogo.`,

  analogy: `Pense no objeto Math como sua calculadora de jardineiro:

- Quantos litros de agua preciso? (calculos basicos)
- Se a planta cresce 1.5cm por dia, quanto tera em uma semana? (multiplicacao)
- Qual planta esta mais alta? (Math.max)
- Arredonde a quantidade de fertilizante (Math.round)
- Gere um numero aleatorio para simular clima (Math.random)

Math e sua caixa de ferramentas para todos os calculos do jardim!`,

  codeExample: `// Arredondamento
console.log(Math.round(4.5));  // 5 (mais proximo)
console.log(Math.floor(4.9)); // 4 (para baixo)
console.log(Math.ceil(4.1));  // 5 (para cima)

// Maximo e minimo
console.log(Math.max(10, 5, 8));  // 10
console.log(Math.min(10, 5, 8));  // 5

// Potencia e raiz
console.log(Math.pow(2, 3));  // 8 (2 elevado a 3)
console.log(2 ** 3);          // 8 (mesmo resultado)
console.log(Math.sqrt(16));   // 4 (raiz quadrada)

// Numero aleatorio (0 a 1)
console.log(Math.random());

// Aleatorio em um range (1 a 10)
let aleatorio = Math.floor(Math.random() * 10) + 1;

// Convertendo strings para numeros
console.log(parseInt("42"));      // 42
console.log(parseFloat("3.14")); // 3.14

// Formatando decimais
let preco = 19.995;
console.log(preco.toFixed(2));  // "19.99"`,

  codeExplanation: `Neste exemplo:
- \`Math.round()\` arredonda para o inteiro mais proximo
- \`Math.floor()\` arredonda para baixo, \`Math.ceil()\` para cima
- \`Math.max()\` e \`Math.min()\` encontram maior/menor
- \`Math.random()\` gera numero aleatorio entre 0 e 1
- \`parseInt()\` e \`parseFloat()\` convertem texto em numero
- \`.toFixed(n)\` formata com n casas decimais`,

  keyPoints: [
    'Math.round/floor/ceil para arredondamento',
    'Math.max/min para maior e menor valor',
    'Math.random() gera numero entre 0 e 1',
    'parseInt/parseFloat convertem texto em numero',
    '.toFixed(n) formata casas decimais',
  ],
};
