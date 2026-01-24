import type { ConceptTutorial } from './index';

export const proxyTutorial: ConceptTutorial = {
  conceptId: 'proxy',
  title: 'Proxy e Reflect: Metaprogramacao',
  icon: '🪞',
  introduction: `Proxy permite interceptar e customizar operacoes em objetos - como leitura, escrita, chamadas de funcao, etc. E como colocar um "vigia" no objeto que pode modificar comportamentos.

Reflect e um objeto que espelha os metodos de Proxy e fornece uma forma padronizada de executar operacoes de objeto.

Juntos, Proxy e Reflect permitem criar objetos com comportamentos personalizados - validacao, logging, lazy loading, e muito mais.`,

  analogy: `Proxy e como um jardineiro guardiao:

Quando alguem tenta regar uma planta (escrever propriedade), o guardiao pode:
- Verificar se a quantidade de agua e valida
- Registrar em um log quem regou
- Modificar a quantidade se necessario
- Ate bloquear a rega se as condicoes nao forem boas

O guardiao (Proxy) intercepta todas as acoes antes que cheguem a planta (objeto).

Reflect e o manual de instrucoes do guardiao.`,

  codeExample: `// Proxy basico
let planta = { nome: "Rosa", agua: 5 };

let plantaProxy = new Proxy(planta, {
  // Intercepta leitura
  get(target, prop) {
    console.log(\`Lendo \${prop}\`);
    return target[prop];
  },

  // Intercepta escrita
  set(target, prop, value) {
    console.log(\`Escrevendo \${prop} = \${value}\`);
    if (prop === "agua" && value < 0) {
      throw new Error("Agua nao pode ser negativa");
    }
    target[prop] = value;
    return true;
  }
});

plantaProxy.nome;      // Log: "Lendo nome"
plantaProxy.agua = 10; // Log: "Escrevendo agua = 10"

// Proxy para validacao
const validator = {
  set(obj, prop, value) {
    if (typeof value !== "number" && prop === "agua") {
      throw new TypeError("Agua deve ser numero");
    }
    obj[prop] = value;
    return true;
  }
};

// Usando Reflect
let handler = {
  get(target, prop) {
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    return Reflect.set(target, prop, value);
  }
};

// Proxy para logging automatico
function criarLogger(objeto) {
  return new Proxy(objeto, {
    get(target, prop) {
      console.log(\`GET: \${prop}\`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      console.log(\`SET: \${prop} = \${value}\`);
      return Reflect.set(target, prop, value);
    }
  });
}`,

  codeExplanation: `Neste exemplo:
- \`new Proxy(target, handler)\` cria um proxy
- \`get\` trap intercepta leituras
- \`set\` trap intercepta escritas (retorne true!)
- Reflect espelha operacoes de forma padronizada
- Proxies sao transparentes - codigo externo nao sabe
- Util para validacao, logging, lazy loading`,

  keyPoints: [
    'Proxy intercepta operacoes em objetos',
    'Handler define traps (get, set, has, etc)',
    'set trap deve retornar true',
    'Reflect executa operacoes de forma padrao',
    'Proxies sao otimos para validacao e logging',
  ],
};
