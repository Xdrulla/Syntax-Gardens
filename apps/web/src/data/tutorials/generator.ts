import type { ConceptTutorial } from './index';

export const generatorTutorial: ConceptTutorial = {
  conceptId: 'generator',
  title: 'Generators: Producao Sob Demanda',
  icon: '♾️',
  introduction: `Generators sao funcoes especiais que podem pausar sua execucao e retomar depois. Elas usam \`function*\` e a palavra-chave \`yield\` para produzir valores um de cada vez.

Diferente de funcoes normais que retornam tudo de uma vez, generators produzem valores sob demanda - perfeito para sequencias infinitas ou processamento de grandes volumes de dados.

Generators implementam o protocolo Iterator, podendo ser usados em loops \`for...of\`.`,

  analogy: `Imagine uma planta que produz flores uma por vez, sob demanda:

Em vez de produzir todas as flores de uma vez (array completo), a planta espera voce pedir "proxima flor" e so entao produz.

\`yield\` e como a planta entregar uma flor e pausar.
\`next()\` e voce pedindo a proxima flor.

Isso economiza recursos - a planta so trabalha quando voce precisa!

E uma linha de producao infinita que so funciona quando solicitada.`,

  codeExample: `// Generator basico
function* contarPlantas() {
  yield "Rosa";
  yield "Tulipa";
  yield "Girassol";
}

let gen = contarPlantas();
console.log(gen.next());  // { value: "Rosa", done: false }
console.log(gen.next());  // { value: "Tulipa", done: false }
console.log(gen.next());  // { value: "Girassol", done: false }
console.log(gen.next());  // { value: undefined, done: true }

// Generator infinito
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}
let ids = idGenerator();
console.log(ids.next().value);  // 1
console.log(ids.next().value);  // 2

// Passando valores para next()
function* regador() {
  let agua = 0;
  while (true) {
    let entrada = yield agua;
    agua += entrada || 0;
  }
}

let r = regador();
r.next();           // Inicia
r.next(5);          // Adiciona 5L
console.log(r.next(3).value);  // 8 (5 + 3)

// yield* delegar para outro generator
function* todas() {
  yield* contarPlantas();
  yield "Orquidea";
}

// Iterando com for...of
for (let planta of contarPlantas()) {
  console.log(planta);
}`,

  codeExplanation: `Neste exemplo:
- \`function*\` define um generator
- \`yield valor\` produz um valor e pausa
- \`.next()\` retorna { value, done }
- Generators podem ser infinitos
- \`yield*\` delega para outro generator/iteravel
- Generators sao iteraveis (usaveis com for...of)`,

  keyPoints: [
    'function* define generator',
    'yield produz valor e pausa',
    'next() continua execucao',
    'Generators podem ser infinitos',
    'yield* delega para outro iteravel',
  ],
};
