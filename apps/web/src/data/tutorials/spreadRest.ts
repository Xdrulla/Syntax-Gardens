import type { ConceptTutorial } from './index';

export const spreadRestTutorial: ConceptTutorial = {
  conceptId: 'spread-rest',
  title: 'Spread e Rest: Expandindo e Coletando',
  icon: '✨',
  introduction: `Os operadores spread (\`...\`) e rest (\`...\`) usam a mesma sintaxe mas fazem coisas opostas. Spread "espalha" elementos, enquanto rest "coleta" elementos.

Spread e usado para copiar arrays/objetos, combinar multiplos arrays, ou passar elementos como argumentos de funcao.

Rest e usado para coletar multiplos argumentos em uma funcao ou capturar "o resto" dos elementos em destructuring.`,

  analogy: `Spread: Imagine espalhar sementes de uma mao para varios canteiros. Voce pega um punhado (\`...sementes\`) e distribui em diferentes lugares.

Rest: Agora imagine coletar todas as flores que sobraram em um unico cesto. Nao importa quantas sejam, o cesto (\`...resto\`) pega todas.

Spread espalha, Rest coleta - mesma sintaxe, direcoes opostas!`,

  codeExample: `// SPREAD: Espalhar elementos

// Copiar array (copia independente)
let plantas = ["Rosa", "Tulipa"];
let copia = [...plantas];

// Combinar arrays
let flores = ["Girassol", "Orquidea"];
let todas = [...plantas, ...flores];
// ["Rosa", "Tulipa", "Girassol", "Orquidea"]

// Adicionar elementos
let mais = [...plantas, "Margarida"];

// Copiar e modificar objetos
let planta = { nome: "Rosa", agua: 5 };
let atualizada = { ...planta, agua: 7 };
// { nome: "Rosa", agua: 7 }

// Spread em chamada de funcao
let numeros = [3, 1, 4, 1, 5];
console.log(Math.max(...numeros));  // 5

// REST: Coletar elementos

// Em parametros de funcao
function regar(...plantas) {
  plantas.forEach(p => console.log(\`Regando \${p}\`));
}
regar("Rosa", "Tulipa", "Girassol");

// Com parametros fixos
function plantar(primeira, ...outras) {
  console.log(\`Principal: \${primeira}\`);
  console.log(\`Outras: \${outras.length}\`);
}

// Em destructuring
let [cabeca, ...cauda] = [1, 2, 3, 4];
// cabeca = 1, cauda = [2, 3, 4]`,

  codeExplanation: `Neste exemplo:
- \`[...array]\` cria uma copia independente
- \`[...arr1, ...arr2]\` combina arrays
- \`{...obj, prop: valor}\` copia e modifica
- \`fn(...array)\` passa elementos como argumentos
- \`function fn(...args)\` coleta argumentos
- Spread/rest sempre usam \`...\` mas o contexto define o comportamento`,

  keyPoints: [
    'Spread espalha (em arrays, objetos, argumentos)',
    'Rest coleta (em funcoes, destructuring)',
    '[...arr] cria copia independente',
    '{...obj, nova: prop} copia e adiciona',
    'Mesma sintaxe, contexto define comportamento',
  ],
};
