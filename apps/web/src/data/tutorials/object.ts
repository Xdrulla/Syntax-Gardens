import type { ConceptTutorial } from './index';

export const objectTutorial: ConceptTutorial = {
  conceptId: 'object',
  title: 'Objetos: Agrupando Dados',
  icon: '🗃️',
  introduction: `Objetos sao colecoes de propriedades relacionadas. Cada propriedade tem um nome (chave) e um valor. Diferente de arrays que usam indices numericos, objetos usam nomes significativos.

Objetos sao perfeitos para representar coisas do mundo real: uma planta tem nome, tipo, nivel de agua, dias para colher - cada um e uma propriedade do objeto.

Voce pode acessar propriedades usando ponto (\`objeto.propriedade\`) ou colchetes (\`objeto["propriedade"]\`).`,

  analogy: `Pense em um objeto como a ficha cadastral de uma planta no seu jardim:

Ficha da Planta:
- Nome: Girassol
- Tipo: Flor
- NivelAgua: 8
- DiasParaColher: 14

Cada item da ficha e uma propriedade do objeto. O nome (chave) identifica a informacao, e o valor e o dado em si.

Objetos sao como fichas organizadas onde voce encontra todas as informacoes relacionadas em um so lugar!`,

  codeExample: `// Criando um objeto
let planta = {
  nome: "Girassol",
  tipo: "Flor",
  nivelAgua: 8,
  estaFlorindo: true
};

// Acessando propriedades
console.log(planta.nome);        // "Girassol"
console.log(planta["tipo"]);     // "Flor"

// Modificando propriedades
planta.nivelAgua = 6;
planta["estaFlorindo"] = false;

// Adicionando nova propriedade
planta.cor = "Amarelo";

// Objeto com metodo (funcao)
let jardim = {
  plantas: 5,
  regar: function() {
    return "Regando o jardim!";
  }
};
console.log(jardim.regar());

// Objeto aninhado
let plantaCompleta = {
  nome: "Rosa",
  cuidados: {
    agua: 3,
    sol: "parcial"
  }
};
console.log(plantaCompleta.cuidados.agua);  // 3`,

  codeExplanation: `Neste exemplo:
- \`{ chave: valor }\` cria um objeto
- \`objeto.propriedade\` acessa com ponto
- \`objeto["propriedade"]\` acessa com colchetes
- Propriedades podem ser adicionadas a qualquer momento
- Metodos sao funcoes dentro de objetos
- Objetos podem conter outros objetos (aninhados)`,

  keyPoints: [
    'Objetos usam { chave: valor }',
    'Acesse com ponto ou colchetes',
    'Propriedades podem ser qualquer tipo de dado',
    'Metodos sao funcoes dentro de objetos',
    'Objetos podem ser aninhados',
  ],
};
