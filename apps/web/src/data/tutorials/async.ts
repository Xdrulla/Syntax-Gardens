import type { ConceptTutorial } from './index';

export const asyncTutorial: ConceptTutorial = {
  conceptId: 'async',
  title: 'Async/Await: Codigo Assincrono',
  icon: '⏳',
  introduction: `Codigo assincrono permite que o programa continue executando enquanto espera por operacoes lentas (como buscar dados da internet). Promises representam valores que estarao disponiveis no futuro.

\`async/await\` e uma forma mais limpa de trabalhar com Promises. Uma funcao \`async\` sempre retorna uma Promise, e \`await\` pausa a execucao ate a Promise resolver.

Isso e essencial para operacoes que levam tempo, como requisicoes de API, leitura de arquivos, ou timers.`,

  analogy: `Imagine que voce pede sementes pelo correio (operacao assincrona):

SEM async: Voce para TUDO e fica esperando na porta ate chegar.
COM async: Voce continua cuidando do jardim e, quando as sementes chegam, voce e avisado.

\`await\` e como dizer "vou esperar as sementes, mas o resto do jardim pode continuar funcionando".

Promise e a garantia de entrega - pode dar certo (resolve) ou nao (reject).`,

  codeExample: `// Promise basica
let promessa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Sementes chegaram!");
  }, 1000);
});

promessa.then(msg => console.log(msg));

// Funcao async
async function buscarPlanta(id) {
  // await pausa ate a Promise resolver
  let resposta = await fetch(\`/plantas/\${id}\`);
  let planta = await resposta.json();
  return planta;
}

// Tratando erros com try/catch
async function regarComSeguranca(planta) {
  try {
    let resultado = await regar(planta);
    console.log("Sucesso:", resultado);
  } catch (erro) {
    console.log("Erro:", erro.message);
  }
}

// Promise.all - esperar multiplas
async function regarTodas(plantas) {
  let promessas = plantas.map(p => regar(p));
  let resultados = await Promise.all(promessas);
  return resultados;
}

// Promise.race - primeira a completar
async function regarRapido(plantas) {
  let primeira = await Promise.race(
    plantas.map(p => regar(p))
  );
  return primeira;
}

// Simulando delay
const delay = ms => new Promise(r => setTimeout(r, ms));
await delay(1000);  // Espera 1 segundo`,

  codeExplanation: `Neste exemplo:
- \`Promise\` representa valor futuro
- \`resolve(valor)\` completa com sucesso
- \`reject(erro)\` completa com erro
- \`async function\` define funcao assincrona
- \`await\` pausa ate Promise resolver
- \`try/catch\` captura erros de await
- \`Promise.all\` espera todas, \`Promise.race\` espera primeira`,

  keyPoints: [
    'async funcao sempre retorna Promise',
    'await pausa ate Promise resolver',
    'Use try/catch para erros',
    'Promise.all para executar em paralelo',
    'Nao use await em loops - use Promise.all',
  ],
};
