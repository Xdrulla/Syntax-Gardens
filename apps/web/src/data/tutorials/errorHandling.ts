import type { ConceptTutorial } from './index';

export const errorHandlingTutorial: ConceptTutorial = {
  conceptId: 'error-handling',
  title: 'Tratamento de Erros: Codigo Robusto',
  icon: '🛡️',
  introduction: `Erros acontecem - dados invalidos, rede fora do ar, arquivos inexistentes. Tratamento de erros permite que seu programa lide com problemas graciosamente em vez de simplesmente quebrar.

\`try/catch/finally\` e a estrutura basica: \`try\` executa codigo que pode falhar, \`catch\` captura erros, \`finally\` sempre executa.

Voce tambem pode criar seus proprios erros com \`throw\` para sinalizar problemas especificos.`,

  analogy: `Pense no tratamento de erros como um sistema de protecao no jardim:

\`try\` e tentar plantar uma semente
\`catch\` e o que fazer se algo der errado (terra ruim, sem agua)
\`finally\` e sempre guardar as ferramentas depois

Sem esse sistema, um unico problema poderia destruir todo o trabalho. Com ele, voce detecta problemas, trata adequadamente, e continua.

\`throw\` e como um alarme que voce dispara quando detecta um problema.`,

  codeExample: `// Try/catch basico
try {
  let resultado = funcaoQuePoddeFalhar();
  console.log(resultado);
} catch (erro) {
  console.log("Erro:", erro.message);
}

// Finally sempre executa
try {
  abrirConexao();
  processarDados();
} catch (erro) {
  console.log("Falhou:", erro);
} finally {
  fecharConexao();  // Sempre executa!
}

// Throw para lancar erros
function regar(planta, quantidade) {
  if (quantidade < 0) {
    throw new Error("Quantidade nao pode ser negativa");
  }
  if (!planta) {
    throw new TypeError("Planta e obrigatoria");
  }
  return planta.agua + quantidade;
}

// Erro customizado
class PlantaMurchaError extends Error {
  constructor(planta) {
    super(\`\${planta} esta murcha!\`);
    this.name = "PlantaMurchaError";
    this.planta = planta;
  }
}

// Verificando tipo de erro
try {
  regar(null, 5);
} catch (erro) {
  if (erro instanceof TypeError) {
    console.log("Erro de tipo:", erro.message);
  } else if (erro instanceof PlantaMurchaError) {
    console.log("Planta problema:", erro.planta);
  } else {
    throw erro;  // Re-lanca erros desconhecidos
  }
}`,

  codeExplanation: `Neste exemplo:
- \`try { }\` envolve codigo que pode falhar
- \`catch (erro)\` captura e trata o erro
- \`finally { }\` sempre executa (limpeza)
- \`throw new Error()\` lanca um erro
- Erros customizados estendem Error
- \`instanceof\` verifica o tipo do erro`,

  keyPoints: [
    'try/catch/finally para tratamento de erros',
    'throw lanca erros personalizados',
    'finally sempre executa (limpeza)',
    'instanceof verifica tipo do erro',
    'Re-lance erros que nao sabe tratar',
  ],
};
