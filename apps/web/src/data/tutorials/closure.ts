import type { ConceptTutorial } from './index';

export const closureTutorial: ConceptTutorial = {
  conceptId: 'closure',
  title: 'Closures: Funcoes que Lembram',
  icon: '🔐',
  introduction: `Uma closure e quando uma funcao "lembra" das variaveis do escopo onde foi criada, mesmo depois que esse escopo terminou. E como se a funcao carregasse uma mochila com as variaveis que precisa.

Closures sao fundamentais para criar variaveis privadas, factories, e funcoes que mantem estado entre chamadas.

Entender closures e entender como JavaScript gerencia escopo e memoria.`,

  analogy: `Imagine uma estufa com temperatura controlada:

Voce cria a estufa com uma temperatura inicial (variavel externa). Dentro da estufa, as plantas (funcao interna) sempre tem acesso a essa temperatura, mesmo quando voce fecha a porta.

A funcao interna "lembra" do ambiente onde nasceu - isso e uma closure!

E como plantas que crescem em um ambiente especifico e mantem as caracteristicas mesmo depois.`,

  codeExample: `// Closure basica
function criarContador() {
  let contador = 0;  // Variavel privada

  return function() {
    contador++;
    return contador;
  };
}

let contar = criarContador();
console.log(contar());  // 1
console.log(contar());  // 2
console.log(contar());  // 3

// Factory com closure
function criarPlanta(nome) {
  let agua = 0;  // Estado privado

  return {
    regar: (qtd) => { agua += qtd; },
    status: () => \`\${nome}: \${agua}L\`,
    getAgua: () => agua
  };
}

let rosa = criarPlanta("Rosa");
rosa.regar(5);
console.log(rosa.status());  // "Rosa: 5L"

// IIFE (Immediately Invoked Function Expression)
let modulo = (function() {
  let privado = "secreto";

  return {
    getPrivado: () => privado,
    setPrivado: (v) => { privado = v; }
  };
})();

// Closure em loops (problema classico)
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);  // 0, 1, 2 (let cria novo escopo)
  }, 100);
}`,

  codeExplanation: `Neste exemplo:
- A funcao interna "lembra" \`contador\` mesmo apos criarContador terminar
- Cada chamada de \`criarPlanta\` cria uma closure independente
- Variaveis na closure sao privadas (nao acessiveis de fora)
- IIFE cria escopo isolado imediatamente
- \`let\` em loops cria novo escopo para cada iteracao`,

  keyPoints: [
    'Closures lembram variaveis do escopo externo',
    'Usadas para criar variaveis privadas',
    'Cada closure tem seu proprio estado',
    'let em loops evita problemas classicos',
    'IIFE cria escopo isolado imediatamente',
  ],
};
