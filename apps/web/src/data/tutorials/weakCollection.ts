import type { ConceptTutorial } from './index';

export const weakCollectionTutorial: ConceptTutorial = {
  conceptId: 'weak-collection',
  title: 'WeakMap e WeakSet: Referencias Fracas',
  icon: '💨',
  introduction: `WeakMap e WeakSet sao versoes "fracas" de Map e Set. A diferenca principal: eles nao impedem o garbage collector de limpar seus elementos.

Em Map/Set normais, objetos usados como chave ficam na memoria enquanto a colecao existir. Em WeakMap/WeakSet, se nao houver outra referencia ao objeto, ele pode ser coletado.

Isso e perfeito para associar dados a objetos sem causar vazamentos de memoria.`,

  analogy: `Imagine etiquetas coladas em plantas:

Etiqueta normal (Map): A etiqueta mantem a planta "viva" no sistema. Mesmo que voce nao precise mais da planta, ela nao pode ser removida enquanto a etiqueta existir.

Etiqueta fraca (WeakMap): A etiqueta existe apenas enquanto a planta existe. Se a planta for removida do jardim, a etiqueta desaparece automaticamente.

WeakMap e WeakSet sao como etiquetas temporarias que se autodestroem quando nao sao mais necessarias!`,

  codeExample: `// WeakMap basico
let wm = new WeakMap();

let planta = { nome: "Rosa" };
wm.set(planta, { agua: 5, ultimaRega: new Date() });

console.log(wm.get(planta));  // { agua: 5, ultimaRega: ... }
console.log(wm.has(planta));  // true

// Se a referencia for perdida, o GC pode coletar
planta = null;  // Agora { nome: "Rosa" } pode ser coletado

// WeakMap para dados privados
const dadosPrivados = new WeakMap();

class Planta {
  constructor(nome) {
    dadosPrivados.set(this, { segredo: "interno" });
    this.nome = nome;
  }

  getSegredo() {
    return dadosPrivados.get(this).segredo;
  }
}

// WeakSet basico
let ws = new WeakSet();
let obj = { id: 1 };

ws.add(obj);
console.log(ws.has(obj));  // true

// WeakSet para marcar objetos processados
const processados = new WeakSet();

function processar(item) {
  if (processados.has(item)) {
    return "Ja processado!";
  }
  processados.add(item);
  // ... processar ...
  return "Processado!";
}

// Diferencas importantes
// Map/Set: iteraveis, .size, aceitam qualquer chave
// WeakMap/WeakSet: NAO iteraveis, sem .size, so objetos`,

  codeExplanation: `Neste exemplo:
- WeakMap usa objetos como chave (nunca primitivos)
- Quando a referencia ao objeto some, ele pode ser coletado
- WeakMap nao tem .size nem e iteravel
- Perfeito para dados privados e caches
- WeakSet funciona igual, mas so armazena objetos (sem valor)
- Usado para marcar objetos sem impedir garbage collection`,

  keyPoints: [
    'Chaves sao referencias fracas',
    'Objetos podem ser coletados pelo GC',
    'Nao sao iteraveis e nao tem .size',
    'So aceitam objetos como chave',
    'Perfeitos para dados privados e caches',
  ],
};
