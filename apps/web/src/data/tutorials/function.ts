import type { ConceptTutorial } from './index';

export const functionTutorial: ConceptTutorial = {
  conceptId: 'function',
  title: 'Funcoes: Blocos Reutilizaveis',
  icon: '🔧',
  introduction: `Funcoes sao blocos de codigo que podemos reutilizar. Em vez de escrever o mesmo codigo varias vezes, criamos uma funcao uma vez e chamamos ela quando precisamos.

Uma funcao pode receber dados (parametros), processar esses dados, e retornar um resultado. E como uma maquina: entra algo, acontece um processo, sai algo.

Funcoes nos ajudam a organizar o codigo, evitar repeticao e tornar o programa mais facil de entender e manter.`,

  analogy: `Pense em uma funcao como uma ferramenta de jardinagem especializada.

Uma "funcao regador" recebe a quantidade de agua e a planta, e executa a rega. Voce nao precisa saber exatamente como ela funciona por dentro - so precisa usar!

Assim como voce nao reconstroi o regador toda vez que quer regar, voce nao reescreve o codigo - apenas chama a funcao.

Funcoes sao como receitas: defina uma vez, use quantas vezes quiser.`,

  codeExample: `// Funcao simples sem parametros
function saudar() {
  return "Bem-vindo ao jardim!";
}

// Funcao com parametro
function regar(planta) {
  return \`Regando a \${planta}...\`;
}

// Funcao com multiplos parametros
function calcularAgua(plantas, litrosPorPlanta) {
  return plantas * litrosPorPlanta;
}

// Chamando as funcoes
console.log(saudar());              // "Bem-vindo ao jardim!"
console.log(regar("Rosa"));         // "Regando a Rosa..."
console.log(calcularAgua(5, 2));    // 10

// Funcao com valor padrao
function crescer(dias = 7) {
  return \`Crescendo por \${dias} dias\`;
}
console.log(crescer());    // "Crescendo por 7 dias"
console.log(crescer(14));  // "Crescendo por 14 dias"`,

  codeExplanation: `Neste exemplo:
- \`function nome() { }\` define uma funcao
- Parametros ficam entre parenteses
- \`return\` envia um valor de volta
- \`nome()\` chama/executa a funcao
- Parametros com \`= valor\` tem um valor padrao
- Funcoes podem chamar outras funcoes`,

  keyPoints: [
    'function nomeDaFuncao() { } define uma funcao',
    'Parametros sao valores que a funcao recebe',
    'return envia um valor de volta',
    'Chame a funcao com nome() ou nome(argumentos)',
    'Funcoes podem ter valores padrao para parametros',
  ],
};
