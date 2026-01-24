import type { ConceptTutorial } from './index';

export const destructuringTutorial: ConceptTutorial = {
  conceptId: 'destructuring',
  title: 'Destructuring: Extraindo Valores',
  icon: '📦',
  introduction: `Destructuring e uma forma elegante de extrair valores de arrays e objetos para variaveis separadas. Em vez de acessar cada propriedade individualmente, voce pode extrair varias de uma vez.

Com arrays, usamos colchetes \`[a, b] = array\`. Com objetos, usamos chaves \`{nome, idade} = objeto\`. Os nomes das variaveis precisam corresponder as chaves do objeto.

Destructuring simplifica muito o codigo, especialmente quando trabalhamos com funcoes que retornam objetos ou arrays.`,

  analogy: `Imagine receber uma caixa com ferramentas de jardinagem. Sem destructuring, voce pegaria cada ferramenta uma por uma:

\`let pa = caixa.pa; let regador = caixa.regador; let tesoura = caixa.tesoura;\`

Com destructuring, voce abre a caixa e pega tudo de uma vez:

\`let { pa, regador, tesoura } = caixa;\`

E como desempacotar um kit de jardinagem de forma rapida e organizada!`,

  codeExample: `// Destructuring de objeto
let planta = { nome: "Rosa", agua: 5, cor: "vermelha" };
let { nome, agua } = planta;
console.log(nome);  // "Rosa"
console.log(agua);  // 5

// Renomeando variaveis
let { nome: nomePlanta, cor: corFlor } = planta;

// Com valor padrao
let { sol = "parcial" } = planta;  // sol = "parcial"

// Destructuring de array
let cores = ["vermelho", "verde", "azul"];
let [primeira, segunda] = cores;
console.log(primeira);  // "vermelho"

// Pulando elementos
let [, , terceira] = cores;
console.log(terceira);  // "azul"

// Rest (pegar o resto)
let [cabeca, ...resto] = cores;
console.log(resto);  // ["verde", "azul"]

// Em parametros de funcao
function mostrarPlanta({ nome, agua }) {
  console.log(\`\${nome} precisa de \${agua}L\`);
}
mostrarPlanta(planta);`,

  codeExplanation: `Neste exemplo:
- \`{ prop1, prop2 } = obj\` extrai propriedades do objeto
- \`{ prop: novoNome }\` renomeia a variavel
- \`{ prop = valor }\` define valor padrao
- \`[a, b] = arr\` extrai elementos do array
- \`[, , c]\` pula elementos
- \`...resto\` captura elementos restantes
- Funcoes podem usar destructuring nos parametros`,

  keyPoints: [
    '{} para objetos, [] para arrays',
    'Renomeie com { original: novoNome }',
    'Valores padrao com { prop = valor }',
    '...rest captura elementos restantes',
    'Use em parametros de funcao para clareza',
  ],
};
