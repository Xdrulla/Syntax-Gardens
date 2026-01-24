import type { ConceptTutorial } from './index';

export const loopTutorial: ConceptTutorial = {
  conceptId: 'loop',
  title: 'Loops: Repetindo Acoes',
  icon: '🔄',
  introduction: `Loops permitem repetir um bloco de codigo varias vezes. Em vez de escrever o mesmo codigo 10 vezes, usamos um loop que executa automaticamente.

JavaScript tem varios tipos de loops: \`for\` (quando sabemos quantas vezes repetir), \`while\` (enquanto uma condicao for verdadeira), e \`for...of\` (para percorrer listas).

Loops sao essenciais para processar colecoes de dados, como uma lista de plantas ou tarefas de jardinagem.`,

  analogy: `Imagine que voce precisa regar 10 plantas no jardim. Sem loops, seria como escrever:
"Regue planta 1, regue planta 2, regue planta 3..." ate a 10.

Com loops, e como dizer: "Para cada planta no jardim, regue-a."

Muito mais simples! E se voce adicionar mais plantas, o loop automaticamente cuida de todas.

Loops sao como sistemas de irrigacao automaticos - configura uma vez, funciona para todas as plantas.`,

  codeExample: `// Loop for - quando sabemos quantas vezes
for (let i = 0; i < 5; i++) {
  console.log(\`Regando planta \${i + 1}\`);
}

// Loop while - enquanto condicao for true
let agua = 10;
while (agua > 0) {
  console.log(\`Agua restante: \${agua}\`);
  agua = agua - 2;
}

// Loop for...of - percorrer arrays
let plantas = ["Rosa", "Girassol", "Tulipa"];
for (let planta of plantas) {
  console.log(\`Cuidando da \${planta}\`);
}

// Contando elementos
let total = 0;
for (let planta of plantas) {
  total++;
}
console.log(\`Total: \${total} plantas\`);`,

  codeExplanation: `Neste exemplo:
- \`for (let i = 0; i < 5; i++)\` repete 5 vezes (i vai de 0 a 4)
- \`i++\` e o mesmo que \`i = i + 1\`
- \`while (condicao)\` repete enquanto a condicao for verdadeira
- \`for...of\` percorre cada elemento de um array
- Cuidado com loops infinitos (quando a condicao nunca fica falsa)`,

  keyPoints: [
    'for quando sabe quantas vezes repetir',
    'while quando depende de uma condicao',
    'for...of para percorrer arrays facilmente',
    'i++ incrementa o contador em 1',
    'break para sair do loop, continue para pular iteracao',
  ],
};
