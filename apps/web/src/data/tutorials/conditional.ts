import type { ConceptTutorial } from './index';

export const conditionalTutorial: ConceptTutorial = {
  conceptId: 'conditional',
  title: 'Condicionais: Tomando Decisoes',
  icon: '🔀',
  introduction: `Condicionais permitem que seu codigo tome decisoes. E como perguntar "Se isso acontecer, faca aquilo". Em JavaScript, usamos \`if\`, \`else if\` e \`else\` para criar essas decisoes.

A condicao dentro do \`if\` e verificada: se for verdadeira (true), o codigo dentro e executado. Se for falsa (false), o programa pula para o \`else\` ou continua.

Voce pode usar operadores de comparacao como \`>\` (maior), \`<\` (menor), \`===\` (igual), \`!==\` (diferente) para criar condicoes.`,

  analogy: `Imagine que voce e um jardineiro decidindo se deve regar as plantas:

"SE a terra estiver seca, ENTAO regue. SENAO, espere mais um dia."

Ou uma decisao mais complexa:
"SE estiver muito quente, regue 2 vezes. SENAO SE estiver morno, regue 1 vez. SENAO, nao regue."

Condicionais funcionam exatamente assim - verificam uma situacao e decidem o que fazer!`,

  codeExample: `let nivelAgua = 3;

// Decisao simples
if (nivelAgua < 5) {
  console.log("Precisa regar!");
}

// Decisao com alternativa
if (nivelAgua > 7) {
  console.log("Agua suficiente");
} else {
  console.log("Precisa de mais agua");
}

// Multiplas condicoes
if (nivelAgua < 3) {
  console.log("URGENTE: Regar agora!");
} else if (nivelAgua < 7) {
  console.log("Regar em breve");
} else {
  console.log("Tudo bem por agora");
}`,

  codeExplanation: `Neste exemplo:
- \`if (nivelAgua < 5)\` verifica se o nivel e menor que 5
- \`else\` e executado quando a condicao do if e falsa
- \`else if\` permite verificar outra condicao
- As chaves \`{ }\` delimitam o bloco de codigo a ser executado
- Podemos ter quantos \`else if\` precisarmos`,

  keyPoints: [
    'if verifica se uma condicao e verdadeira',
    'else e executado quando if e falso',
    'Use === para comparar igualdade',
    'Use && (E) e || (OU) para combinar condicoes',
    'Sempre use chaves { } para o bloco de codigo',
  ],
};
