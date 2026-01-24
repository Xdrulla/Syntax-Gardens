import type { ConceptTutorial } from './index';

export const arrowFunctionsTutorial: ConceptTutorial = {
  conceptId: 'arrow-functions',
  title: 'Arrow Functions: Sintaxe Moderna',
  icon: '➡️',
  introduction: `Arrow functions sao uma forma mais curta de escrever funcoes em JavaScript. Elas usam a sintaxe \`() => {}\` e sao especialmente uteis como callbacks.

A principal diferenca alem da sintaxe e que arrow functions nao tem seu proprio \`this\` - elas herdam o \`this\` do contexto onde foram criadas.

Arrow functions podem ter retorno implicito (sem chaves e sem \`return\`) quando o corpo e uma unica expressao.`,

  analogy: `Pense em arrow functions como atalhos no jardim. Em vez de dar toda a volta (sintaxe completa), voce pega o caminho mais curto (sintaxe arrow).

Funcao tradicional (caminho longo):
\`function dobrar(x) { return x * 2; }\`

Arrow function (atalho):
\`const dobrar = x => x * 2;\`

Mesmo destino, caminho mais rapido! Ideal para tarefas simples e repetitivas.`,

  codeExample: `// Funcao tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function equivalente
const somarArrow = (a, b) => {
  return a + b;
};

// Com retorno implicito (sem chaves)
const somarCurto = (a, b) => a + b;

// Um parametro = sem parenteses
const dobrar = x => x * 2;

// Sem parametros = parenteses vazios
const saudar = () => "Ola, jardim!";

// Retornando objeto (precisa parenteses)
const criarPlanta = nome => ({ nome, agua: 0 });

// Perfeitas para callbacks
let plantas = ["Rosa", "Tulipa", "Girassol"];

let maiusculas = plantas.map(p => p.toUpperCase());
let longas = plantas.filter(p => p.length > 4);
let total = plantas.reduce((acc, p) => acc + p.length, 0);

// Com multiplas linhas
const processarPlanta = planta => {
  let nome = planta.toUpperCase();
  let tamanho = planta.length;
  return \`\${nome}: \${tamanho} letras\`;
};`,

  codeExplanation: `Neste exemplo:
- \`(a, b) => { return a + b }\` sintaxe completa
- \`(a, b) => a + b\` retorno implicito
- \`x => x * 2\` um parametro, sem parenteses
- \`() => valor\` sem parametros
- \`x => ({ obj })\` retornar objeto precisa ()
- Ideais para map, filter, reduce e callbacks`,

  keyPoints: [
    '=> define uma arrow function',
    'Um parametro nao precisa de parenteses',
    'Sem chaves = retorno implicito',
    'Para retornar objeto: x => ({ })',
    'Nao tem seu proprio this',
  ],
};
