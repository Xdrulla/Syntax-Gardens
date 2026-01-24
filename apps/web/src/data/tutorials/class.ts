import type { ConceptTutorial } from './index';

export const classTutorial: ConceptTutorial = {
  conceptId: 'class',
  title: 'Classes: Programacao Orientada a Objetos',
  icon: '🏛️',
  introduction: `Classes sao modelos para criar objetos. Elas definem a estrutura (propriedades) e comportamento (metodos) que os objetos criados a partir dela terao.

Uma classe usa \`constructor\` para inicializar propriedades quando um novo objeto e criado com \`new\`. Classes podem ter metodos normais, getters, setters, e metodos estaticos.

Classes tambem suportam heranca com \`extends\`, permitindo criar classes especializadas baseadas em outras.`,

  analogy: `Uma classe e como um molde de vaso para plantas:

O molde (classe) define: tamanho, formato, quantos furos de drenagem tem.
Cada vaso produzido (instancia) usa esse molde, mas pode ter cores diferentes.

\`class Vaso { }\` e o molde
\`new Vaso()\` e criar um vaso usando o molde
\`extends\` e como criar um molde de vaso especial baseado no original

Classes sao fabricas de objetos padronizados!`,

  codeExample: `// Definindo uma classe
class Planta {
  // Constructor: inicializa o objeto
  constructor(nome, agua) {
    this.nome = nome;
    this.agua = agua;
  }

  // Metodo
  regar(quantidade) {
    this.agua += quantidade;
    return \`\${this.nome} regada!\`;
  }

  // Getter
  get status() {
    return this.agua > 5 ? "Saudavel" : "Precisa agua";
  }

  // Setter
  set nivelAgua(valor) {
    if (valor >= 0) this.agua = valor;
  }

  // Metodo estatico (da classe, nao da instancia)
  static criarSemente(nome) {
    return new Planta(nome, 0);
  }
}

// Criando instancias
let rosa = new Planta("Rosa", 3);
console.log(rosa.regar(2));  // "Rosa regada!"
console.log(rosa.status);    // "Saudavel"

// Heranca
class Flor extends Planta {
  constructor(nome, agua, cor) {
    super(nome, agua);  // Chama constructor pai
    this.cor = cor;
  }

  descrever() {
    return \`\${this.nome} \${this.cor}\`;
  }
}

let girassol = new Flor("Girassol", 5, "amarela");`,

  codeExplanation: `Neste exemplo:
- \`class Nome { }\` define uma classe
- \`constructor()\` inicializa novas instancias
- \`this\` referencia a instancia atual
- \`get prop()\` e \`set prop()\` sao getters/setters
- \`static\` define metodos da classe (nao da instancia)
- \`extends\` cria classe filha, \`super()\` chama pai`,

  keyPoints: [
    'class define um modelo para objetos',
    'constructor inicializa a instancia',
    'this referencia a instancia atual',
    'extends para heranca, super para chamar pai',
    'static para metodos da classe',
  ],
};
