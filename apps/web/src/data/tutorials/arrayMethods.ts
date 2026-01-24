import type { ConceptTutorial } from './index';

export const arrayMethodsTutorial: ConceptTutorial = {
  conceptId: 'array-methods',
  title: 'Metodos Avancados de Array',
  icon: '⚡',
  introduction: `Alem dos metodos basicos, arrays tem metodos poderosos para processar dados de forma elegante. Metodos como \`reduce\`, \`find\`, \`some\`, \`every\` e \`sort\` permitem operacoes complexas em poucas linhas.

Esses metodos recebem funcoes como argumento e aplicam essa funcao a cada elemento do array. Isso se chama programacao funcional.

Dominar esses metodos transforma a forma como voce escreve codigo - solucoes que precisariam de muitas linhas ficam simples e legiveis.`,

  analogy: `Imagine que voce tem um canteiro com dezenas de plantas e precisa fazer analises:

- \`reduce\`: Calcular o total de agua necessaria para todas as plantas
- \`find\`: Encontrar a primeira planta que precisa de rega urgente
- \`some\`: Verificar se alguma planta esta murchando
- \`every\`: Verificar se todas as plantas estao saudaveis
- \`sort\`: Organizar plantas por tamanho ou necessidade de agua

Esses metodos sao como ferramentas especializadas para gerenciar grandes jardins!`,

  codeExample: `let plantas = [
  { nome: "Rosa", agua: 3 },
  { nome: "Girassol", agua: 5 },
  { nome: "Tulipa", agua: 2 },
  { nome: "Orquidea", agua: 7 }
];

// reduce: acumular valores
let totalAgua = plantas.reduce((acc, p) => acc + p.agua, 0);
console.log(totalAgua);  // 17

// find: encontrar primeiro que satisfaz condicao
let precisaAgua = plantas.find(p => p.agua < 3);
console.log(precisaAgua);  // { nome: "Tulipa", agua: 2 }

// some: algum satisfaz?
let temUrgente = plantas.some(p => p.agua < 3);
console.log(temUrgente);  // true

// every: todos satisfazem?
let todasBem = plantas.every(p => p.agua >= 2);
console.log(todasBem);  // true

// sort: ordenar (cuidado, modifica o array!)
let ordenadas = [...plantas].sort((a, b) => a.agua - b.agua);

// Encadeamento: filtrar + mapear + reduzir
let resultado = plantas
  .filter(p => p.agua < 5)
  .map(p => p.nome)
  .join(", ");
console.log(resultado);  // "Rosa, Tulipa"`,

  codeExplanation: `Neste exemplo:
- \`reduce(fn, valorInicial)\` acumula valores em um unico resultado
- \`find(fn)\` retorna o primeiro elemento que satisfaz a condicao
- \`some(fn)\` retorna true se algum elemento satisfaz
- \`every(fn)\` retorna true se todos satisfazem
- \`sort((a, b) => a - b)\` ordena (a - b = crescente)
- Metodos podem ser encadeados para operacoes complexas`,

  keyPoints: [
    'reduce acumula array em um unico valor',
    'find retorna primeiro que satisfaz condicao',
    'some/every verificam se algum/todos satisfazem',
    'sort ordena - retorno negativo = a antes de b',
    'Encadeie metodos para operacoes complexas',
  ],
};
