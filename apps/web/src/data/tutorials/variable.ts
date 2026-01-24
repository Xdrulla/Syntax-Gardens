import type { ConceptTutorial } from './index';

export const variableTutorial: ConceptTutorial = {
  conceptId: 'variable',
  title: 'Variaveis: Guardando Informacoes',
  icon: '📦',
  introduction: `Variaveis sao como caixas onde guardamos informacoes para usar depois. Assim como voce etiqueta uma caixa para saber o que tem dentro, uma variavel tem um nome que usamos para acessar seu conteudo.

Em JavaScript, usamos as palavras \`let\` e \`const\` para criar variaveis. Use \`let\` quando o valor pode mudar, e \`const\` quando o valor e fixo.

Variaveis podem guardar diferentes tipos de dados: numeros, textos (strings), verdadeiro/falso (boolean), e muito mais!`,

  analogy: `Pense em variaveis como os vasos do seu jardim. Cada vaso tem uma etiqueta (o nome da variavel) e dentro dele voce pode colocar diferentes plantas (os valores).

Um vaso chamado "agua" pode conter o numero 10 (litros de agua disponiveis).
Um vaso chamado "plantaFavorita" pode conter o texto "Girassol".

Assim como voce pode trocar a planta de um vaso, voce pode mudar o valor de uma variavel!`,

  codeExample: `// Criando variaveis com let (pode mudar)
let agua = 10;
let nomePlanta = "Girassol";
let estaChovendo = false;

// Mudando o valor
agua = 8;  // Usamos 2 litros

// Criando constantes (nao muda)
const diasParaColheita = 7;

// Mostrando valores
console.log(agua);        // 8
console.log(nomePlanta);  // "Girassol"`,

  codeExplanation: `Neste exemplo:
- \`let agua = 10\` cria uma variavel chamada "agua" com valor 10
- \`let nomePlanta = "Girassol"\` guarda um texto (sempre entre aspas)
- \`let estaChovendo = false\` guarda um valor booleano (true/false)
- \`agua = 8\` muda o valor da variavel agua
- \`const\` cria uma constante que nao pode ser alterada`,

  keyPoints: [
    'Use let para valores que podem mudar',
    'Use const para valores fixos',
    'Textos (strings) ficam entre aspas',
    'Nomes de variaveis nao podem ter espacos',
    'JavaScript diferencia maiusculas de minusculas',
  ],
};
