import type { ConceptTutorial } from './index';

export const prototypeTutorial: ConceptTutorial = {
  conceptId: 'prototype',
  title: 'Prototypes: A Base do JavaScript',
  icon: '🧬',
  introduction: `Prototypes sao o mecanismo de heranca do JavaScript. Cada objeto tem um link interno para outro objeto chamado seu "prototype". Quando voce acessa uma propriedade, JavaScript procura primeiro no objeto, depois no prototype, depois no prototype do prototype, e assim por diante.

Classes em JavaScript sao apenas uma sintaxe mais amigavel sobre prototypes. Entender prototypes e entender como JavaScript realmente funciona por baixo.

Isso e conhecimento avancado, mas essencial para dominar JavaScript profundamente.`,

  analogy: `Pense em prototypes como a genetica das plantas:

Uma rosa herdou caracteristicas de suas ancestrais - cor, formato das petalas, fragancia. Se uma caracteristica nao esta na rosa, JavaScript procura na mae, na avo, e assim por diante.

O prototype e como a arvore genealogica: define de onde vieram as caracteristicas.

\`Object.prototype\` e como a primeira planta - a ancestral de todas!`,

  codeExample: `// Todo objeto tem um prototype
let planta = { nome: "Rosa" };
console.log(planta.__proto__ === Object.prototype);  // true

// Cadeia de prototypes
let flor = { cor: "vermelha" };
let rosa = Object.create(flor);  // rosa herda de flor
rosa.nome = "Rosa";

console.log(rosa.nome);  // "Rosa" (proprio)
console.log(rosa.cor);   // "vermelha" (do prototype)

// Verificando propriedades
console.log(rosa.hasOwnProperty("nome"));  // true
console.log(rosa.hasOwnProperty("cor"));   // false
console.log("cor" in rosa);  // true (inclui prototype)

// Constructor.prototype
function Planta(nome) {
  this.nome = nome;
}
Planta.prototype.crescer = function() {
  return \`\${this.nome} crescendo...\`;
};

let tulipa = new Planta("Tulipa");
console.log(tulipa.crescer());  // "Tulipa crescendo..."

// Object.getPrototypeOf
let proto = Object.getPrototypeOf(tulipa);
console.log(proto === Planta.prototype);  // true

// Heranca prototipica manual
function Flor(nome, cor) {
  Planta.call(this, nome);
  this.cor = cor;
}
Flor.prototype = Object.create(Planta.prototype);
Flor.prototype.constructor = Flor;`,

  codeExplanation: `Neste exemplo:
- \`__proto__\` e o link para o prototype (nao use em producao)
- \`Object.create(proto)\` cria objeto com prototype especifico
- \`hasOwnProperty\` verifica se propriedade e propria
- \`in\` verifica incluindo a cadeia de prototypes
- \`Constructor.prototype\` define o prototype das instancias
- Heranca manual requer configurar a cadeia corretamente`,

  keyPoints: [
    'Objetos herdam de seus prototypes',
    'Object.create() define prototype explicito',
    'hasOwnProperty vs in (proprio vs herdado)',
    'Constructor.prototype define heranca',
    'Classes sao acucar sintatico sobre prototypes',
  ],
};
