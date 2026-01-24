import type { ConceptTutorial } from './index';

export const stringTutorial: ConceptTutorial = {
  conceptId: 'string',
  title: 'Strings: Trabalhando com Textos',
  icon: '📝',
  introduction: `Strings sao textos em JavaScript. Elas podem conter letras, numeros, espacos e simbolos. Para criar uma string, colocamos o texto entre aspas simples ('texto'), aspas duplas ("texto") ou crases (\`texto\`).

Strings tem varios metodos uteis para manipular texto: voce pode transformar em maiusculas, cortar partes, juntar textos, encontrar palavras e muito mais!

Template literals (com crases) permitem inserir variaveis diretamente no texto usando \`\${variavel}\`.`,

  analogy: `Pense em strings como as etiquetas do seu jardim. Cada planta precisa de uma etiqueta com seu nome, instrucoes de cuidado, e talvez a data de plantio.

Assim como voce pode cortar uma etiqueta (slice), juntar duas etiquetas (concat), ou verificar se uma palavra esta na etiqueta (includes), strings permitem todas essas operacoes com texto!

E as template literals sao como etiquetas pre-formatadas onde voce so preenche os espacos em branco.`,

  codeExample: `// Criando strings
let planta = "Girassol";
let cuidado = 'Regar diariamente';

// Template literal (com variaveis)
let mensagem = \`A \${planta} precisa: \${cuidado}\`;

// Metodos uteis
console.log(planta.length);        // 8 (caracteres)
console.log(planta.toUpperCase()); // "GIRASSOL"
console.log(planta.toLowerCase()); // "girassol"

// Buscando e cortando
console.log(planta.includes("sol")); // true
console.log(planta.slice(0, 4));     // "Gira"

// Juntando strings
let frase = planta + " e linda!";   // "Girassol e linda!"`,

  codeExplanation: `Neste exemplo:
- Strings podem usar aspas simples, duplas ou crases
- \`\${variavel}\` insere valores dentro de template literals
- \`.length\` retorna o numero de caracteres
- \`.toUpperCase()\` e \`.toLowerCase()\` mudam o caso
- \`.includes()\` verifica se contem um texto
- \`.slice(inicio, fim)\` extrai uma parte da string
- \`+\` concatena (junta) strings`,

  keyPoints: [
    'Strings ficam entre aspas ou crases',
    'Template literals usam ${} para inserir variaveis',
    '.length retorna o tamanho da string',
    'Indices comecam em 0 (primeiro caractere)',
    'Strings sao imutaveis - metodos retornam novas strings',
  ],
};
