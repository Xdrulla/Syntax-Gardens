import type { ConceptTutorial } from './index';

export const arrayTutorial: ConceptTutorial = {
  conceptId: 'array',
  title: 'Arrays: Listas de Valores',
  icon: '📋',
  introduction: `Arrays sao listas ordenadas de valores. Eles permitem guardar multiplos itens em uma unica variavel e acessar cada item pela sua posicao (indice).

Em JavaScript, arrays comecam no indice 0. Ou seja, o primeiro elemento esta na posicao 0, o segundo na posicao 1, e assim por diante.

Arrays tem muitos metodos uteis como \`push\` (adicionar), \`pop\` (remover do fim), \`shift\` (remover do inicio), \`map\` (transformar) e \`filter\` (filtrar).`,

  analogy: `Pense em um array como um canteiro organizado em fileiras. Cada posicao do canteiro (indice) contem uma planta diferente.

Canteiro: [Rosa, Girassol, Tulipa, Margarida]
Posicoes:   0      1        2        3

Voce pode adicionar novas plantas no final do canteiro (push), remover a ultima (pop), ou ate reorganizar a ordem.

Arrays sao como canteiros bem organizados onde voce sabe exatamente onde cada planta esta!`,

  codeExample: `// Criando arrays
let plantas = ["Rosa", "Girassol", "Tulipa"];
let numeros = [1, 2, 3, 4, 5];

// Acessando elementos (indice comeca em 0)
console.log(plantas[0]);  // "Rosa"
console.log(plantas[2]);  // "Tulipa"

// Modificando elementos
plantas[1] = "Orquidea";

// Adicionando e removendo
plantas.push("Margarida");    // Adiciona no fim
plantas.pop();                // Remove do fim
plantas.unshift("Lirio");     // Adiciona no inicio
plantas.shift();              // Remove do inicio

// Propriedades uteis
console.log(plantas.length);  // Quantidade de elementos

// Transformando com map
let maiusculas = plantas.map(p => p.toUpperCase());

// Filtrando
let comR = plantas.filter(p => p.startsWith("R"));`,

  codeExplanation: `Neste exemplo:
- \`[]\` cria um array (lista)
- \`array[indice]\` acessa um elemento
- \`push()\` adiciona no fim, \`pop()\` remove do fim
- \`unshift()\` adiciona no inicio, \`shift()\` remove do inicio
- \`.length\` retorna quantos elementos tem
- \`.map()\` transforma cada elemento
- \`.filter()\` filtra elementos por condicao`,

  keyPoints: [
    'Arrays guardam multiplos valores em ordem',
    'Indices comecam em 0 (primeiro elemento)',
    'push/pop para fim, unshift/shift para inicio',
    '.length retorna o tamanho do array',
    'map transforma, filter filtra elementos',
  ],
};
