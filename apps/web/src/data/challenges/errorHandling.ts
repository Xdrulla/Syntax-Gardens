import type { ChallengeDefinition } from '../../types';

export const errorHandlingChallenges: ChallengeDefinition[] = [
  // Desafio 1: Try/catch basico
  {
    id: 'error-1',
    title: 'Try/Catch Basico',
    description:
      'try/catch permite capturar erros sem quebrar o programa. Crie um try que executa JSON.parse("invalid") e um catch que define result = "erro".',
    difficulty: 1,
    difficultyTier: 'beginner',
    plantType: 'error-handling',
    experienceReward: 10,
    starterCode: `// Use try/catch para capturar erro
// try: JSON.parse("invalid")
// catch: result = "erro"
let result = "sucesso";

`,
    solution: `let result = "sucesso";
try {
  JSON.parse("invalid");
} catch (e) {
  result = "erro";
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'erro',
        description: 'result deve ser "erro" apos catch',
      },
    ],
    hints: [
      'try { codigo perigoso } catch (e) { tratamento }',
      'JSON.parse("invalid") lanca erro',
      'O catch captura o erro e executa seu codigo',
    ],
    conceptsUsed: ['try', 'catch', 'JSON.parse'],
  },

  // Desafio 2: Finally block
  {
    id: 'error-2',
    title: 'Finally Block',
    description:
      'finally sempre executa, com ou sem erro. Crie try/catch/finally onde try faz JSON.parse("{}"), catch define error = true, e finally define done = true.',
    difficulty: 1,
    difficultyTier: 'beginner',
    plantType: 'error-handling',
    experienceReward: 10,
    starterCode: `// Use try/catch/finally
// try: JSON.parse("{}")
// catch: error = true
// finally: done = true
let error = false;
let done = false;

`,
    solution: `let error = false;
let done = false;
try {
  JSON.parse("{}");
} catch (e) {
  error = true;
} finally {
  done = true;
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { error: false, done: true },
        description: 'finally deve executar mesmo sem erro',
      },
    ],
    hints: [
      'finally { } vem depois do catch',
      'JSON.parse("{}") nao lanca erro',
      'finally executa independente de erro',
    ],
    conceptsUsed: ['try', 'catch', 'finally'],
  },

  // Desafio 3: Throw new Error
  {
    id: 'error-3',
    title: 'Throw Error',
    description:
      'throw lanca erros manualmente. Crie funcao validateWater(amount) que lanca Error("Agua negativa") se amount < 0, senao retorna amount.',
    difficulty: 2,
    difficultyTier: 'beginner',
    plantType: 'error-handling',
    experienceReward: 10,
    starterCode: `// Crie validateWater(amount)
// Se amount < 0: throw new Error("Agua negativa")
// Senao: return amount

`,
    solution: `function validateWater(amount) {
  if (amount < 0) {
    throw new Error("Agua negativa");
  }
  return amount;
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { valid: 10, errorMsg: 'Agua negativa' },
        description: 'Deve lancar erro para valores negativos',
      },
    ],
    hints: [
      'throw new Error("mensagem") lanca erro',
      'Apos throw, a funcao para de executar',
      'O erro pode ser capturado com try/catch',
    ],
    conceptsUsed: ['throw', 'Error'],
  },

  // Desafio 4: Custom error messages
  {
    id: 'error-4',
    title: 'Mensagens de Erro',
    description:
      'Capture a mensagem do erro. Crie try que lanca Error("Planta seca") e catch que armazena e.message em result.',
    difficulty: 2,
    difficultyTier: 'beginner',
    plantType: 'error-handling',
    experienceReward: 10,
    starterCode: `// try: throw new Error("Planta seca")
// catch: result = e.message
let result = "";

`,
    solution: `let result = "";
try {
  throw new Error("Planta seca");
} catch (e) {
  result = e.message;
}`,
    testCases: [
      {
        input: null,
        expectedOutput: 'Planta seca',
        description: 'result deve conter a mensagem do erro',
      },
    ],
    hints: [
      'e.message contem a string do erro',
      'Error("texto") define a mensagem',
      'Sempre capture em uma variavel (e)',
    ],
    conceptsUsed: ['Error', 'message'],
  },

  // Desafio 5: Error.name e Error.message
  {
    id: 'error-5',
    title: 'Propriedades do Error',
    description:
      'Erros tem name e message. Crie try que lanca new TypeError("Tipo invalido") e catch que armazena { name: e.name, message: e.message } em result.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'error-handling',
    experienceReward: 20,
    starterCode: `// try: throw new TypeError("Tipo invalido")
// catch: result = { name: e.name, message: e.message }
let result = {};

`,
    solution: `let result = {};
try {
  throw new TypeError("Tipo invalido");
} catch (e) {
  result = { name: e.name, message: e.message };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'TypeError', message: 'Tipo invalido' },
        description: 'result deve ter name e message',
      },
    ],
    hints: [
      'TypeError e um tipo especifico de erro',
      'e.name retorna "TypeError"',
      'e.message retorna a mensagem passada',
    ],
    conceptsUsed: ['TypeError', 'name', 'message'],
  },

  // Desafio 6: Verificar tipo de erro
  {
    id: 'error-6',
    title: 'Verificar Tipo de Erro',
    description:
      'Use instanceof para verificar o tipo do erro. Crie funcao checkError(e) que retorna "tipo" se e instanceof TypeError, "referencia" se ReferenceError, senao "outro".',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'error-handling',
    experienceReward: 20,
    starterCode: `// Crie checkError(e)
// e instanceof TypeError -> "tipo"
// e instanceof ReferenceError -> "referencia"
// senao -> "outro"

`,
    solution: `function checkError(e) {
  if (e instanceof TypeError) {
    return "tipo";
  } else if (e instanceof ReferenceError) {
    return "referencia";
  } else {
    return "outro";
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { type: 'tipo', ref: 'referencia', other: 'outro' },
        description: 'Deve identificar tipos de erro',
      },
    ],
    hints: [
      'instanceof verifica o tipo do objeto',
      'TypeError, ReferenceError sao tipos de Error',
      'Use if/else if/else para verificar',
    ],
    conceptsUsed: ['instanceof', 'TypeError', 'ReferenceError'],
  },

  // Desafio 7: Re-throwing errors
  {
    id: 'error-7',
    title: 'Re-lançar Erros',
    description:
      'As vezes queremos capturar, processar e relancar. Crie funcao process(value) que em try faz JSON.parse(value), se der erro adiciona " - processado" na mensagem e relanca.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'error-handling',
    experienceReward: 20,
    starterCode: `// Crie process(value)
// try: JSON.parse(value)
// catch: adicione " - processado" a e.message e throw e

`,
    solution: `function process(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    e.message = e.message + " - processado";
    throw e;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { valid: { ok: true }, errorContains: 'processado' },
        description: 'Deve relancar com mensagem modificada',
      },
    ],
    hints: [
      'Voce pode modificar e.message',
      'throw e relanca o mesmo erro',
      'O erro continuara subindo na pilha',
    ],
    conceptsUsed: ['throw', 're-throw'],
  },

  // Desafio 8: Error em funcao
  {
    id: 'error-8',
    title: 'Funcao Segura',
    description:
      'Crie safeParseInt(str) que usa try/catch. Tenta parseInt(str), se str nao for string lanca TypeError. Se parseInt retornar NaN, lanca Error("Numero invalido"). Senao retorna o numero.',
    difficulty: 4,
    difficultyTier: 'practitioner',
    plantType: 'error-handling',
    experienceReward: 20,
    starterCode: `// Crie safeParseInt(str)
// Se typeof str !== "string": throw TypeError
// Se parseInt retorna NaN: throw Error("Numero invalido")
// Senao: return o numero

`,
    solution: `function safeParseInt(str) {
  if (typeof str !== "string") {
    throw new TypeError("Esperava string");
  }
  const num = parseInt(str);
  if (isNaN(num)) {
    throw new Error("Numero invalido");
  }
  return num;
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { valid: 42, typeError: true, nanError: true },
        description: 'Deve validar e retornar numero',
      },
    ],
    hints: [
      'typeof str !== "string" verifica o tipo',
      'isNaN(num) verifica se e NaN',
      'Use erros diferentes para casos diferentes',
    ],
    conceptsUsed: ['throw', 'TypeError', 'isNaN'],
  },

  // Desafio 9: Custom Error classes
  {
    id: 'error-9',
    title: 'Classe de Erro Customizada',
    description:
      'Crie classe WaterError que extends Error. O constructor recebe amount e define this.name = "WaterError" e this.amount = amount. Chame super com mensagem apropriada.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'error-handling',
    experienceReward: 35,
    starterCode: `// Crie class WaterError extends Error
// constructor(amount):
//   super("Agua insuficiente: " + amount)
//   this.name = "WaterError"
//   this.amount = amount

`,
    solution: `class WaterError extends Error {
  constructor(amount) {
    super("Agua insuficiente: " + amount);
    this.name = "WaterError";
    this.amount = amount;
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { name: 'WaterError', amount: -5, hasMessage: true },
        description: 'WaterError deve ter propriedades corretas',
      },
    ],
    hints: [
      'extends Error herda de Error',
      'super(message) chama constructor do Error',
      'this.name define o nome do erro',
    ],
    conceptsUsed: ['class', 'extends', 'Error'],
  },

  // Desafio 10: Tipos de erro padrao
  {
    id: 'error-10',
    title: 'Tipos de Erro Padrao',
    description:
      'Crie funcao getErrorType(code) que: code 1 lanca TypeError, code 2 lanca RangeError, code 3 lanca SyntaxError. Capture e retorne o nome do erro.',
    difficulty: 4,
    difficultyTier: 'practitioner',
    plantType: 'error-handling',
    experienceReward: 20,
    starterCode: `// Crie throwByCode(code)
// 1: throw new TypeError("tipo")
// 2: throw new RangeError("fora do range")
// 3: throw new SyntaxError("sintaxe")

`,
    solution: `function throwByCode(code) {
  if (code === 1) {
    throw new TypeError("tipo");
  } else if (code === 2) {
    throw new RangeError("fora do range");
  } else if (code === 3) {
    throw new SyntaxError("sintaxe");
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { type: 'TypeError', range: 'RangeError', syntax: 'SyntaxError' },
        description: 'Deve lancar erros corretos por codigo',
      },
    ],
    hints: [
      'TypeError: tipo errado de dado',
      'RangeError: valor fora do range permitido',
      'SyntaxError: erro de sintaxe',
    ],
    conceptsUsed: ['TypeError', 'RangeError', 'SyntaxError'],
  },

  // Desafio 11: Validacao com throw
  {
    id: 'error-11',
    title: 'Validacao de Input',
    description:
      'Crie validatePlant(plant) que verifica: se !plant lanca "Planta nula", se !plant.name lanca "Nome obrigatorio", se plant.water < 0 lanca "Agua invalida". Senao retorna true.',
    difficulty: 3,
    difficultyTier: 'practitioner',
    plantType: 'error-handling',
    experienceReward: 20,
    starterCode: `// Crie validatePlant(plant)
// !plant -> throw "Planta nula"
// !plant.name -> throw "Nome obrigatorio"
// plant.water < 0 -> throw "Agua invalida"
// senao -> return true

`,
    solution: `function validatePlant(plant) {
  if (!plant) {
    throw new Error("Planta nula");
  }
  if (!plant.name) {
    throw new Error("Nome obrigatorio");
  }
  if (plant.water < 0) {
    throw new Error("Agua invalida");
  }
  return true;
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { valid: true, nullError: 'Planta nula', nameError: 'Nome obrigatorio', waterError: 'Agua invalida' },
        description: 'Deve validar todos os casos',
      },
    ],
    hints: [
      'Verifique na ordem: null, name, water',
      'Use throw new Error("mensagem")',
      'Se passar todas validacoes, retorne true',
    ],
    conceptsUsed: ['throw', 'validacao'],
  },

  // Desafio 12: Error boundaries pattern
  {
    id: 'error-12',
    title: 'Funcao Wrapper Segura',
    description:
      'Crie safeFn(fn) que retorna uma nova funcao. Quando chamada, executa fn em try/catch e retorna { success: true, value } ou { success: false, error: message }.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'error-handling',
    experienceReward: 35,
    starterCode: `// Crie safeFn(fn)
// Retorna funcao que executa fn(...args)
// Sucesso: { success: true, value: resultado }
// Erro: { success: false, error: e.message }

`,
    solution: `function safeFn(fn) {
  return function(...args) {
    try {
      const value = fn(...args);
      return { success: true, value: value };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { successCase: { success: true, value: 10 }, errorCase: { success: false, hasError: true } },
        description: 'safeFn deve encapsular erros',
      },
    ],
    hints: [
      'Retorne uma funcao que recebe ...args',
      'Use try/catch dentro da funcao retornada',
      'Sempre retorne objeto com success',
    ],
    conceptsUsed: ['higher-order function', 'try', 'catch'],
  },

  // Desafio 13: Global error handling pattern
  {
    id: 'error-13',
    title: 'Handler de Erros',
    description:
      'Crie createErrorHandler() que retorna objeto com: errors = [], handle(e) que adiciona { time: Date.now(), message: e.message } a errors, e getErrors() que retorna errors.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'error-handling',
    experienceReward: 35,
    starterCode: `// Crie createErrorHandler()
// let errors = []
// handle(e): adiciona { time: Date.now(), message: e.message }
// getErrors(): retorna errors

`,
    solution: `function createErrorHandler() {
  let errors = [];
  return {
    handle: function(e) {
      errors.push({
        time: Date.now(),
        message: e.message
      });
    },
    getErrors: function() {
      return errors;
    }
  };
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { errorCount: 2, hasTime: true, hasMessage: true },
        description: 'Handler deve armazenar erros',
      },
    ],
    hints: [
      'Use closure para manter errors privado',
      'Date.now() retorna timestamp atual',
      'push adiciona ao array errors',
    ],
    conceptsUsed: ['closure', 'error handling'],
  },

  // Desafio 14: Logging de erros
  {
    id: 'error-14',
    title: 'Log de Erros',
    description:
      'Crie formatError(e) que retorna string formatada: "[NOME] mensagem". Ex: "[TypeError] valor invalido". Se e nao for Error, retorne "[Unknown] " + String(e).',
    difficulty: 4,
    difficultyTier: 'practitioner',
    plantType: 'error-handling',
    experienceReward: 20,
    starterCode: `// Crie formatError(e)
// Se e instanceof Error: "[" + e.name + "] " + e.message
// Senao: "[Unknown] " + String(e)

`,
    solution: `function formatError(e) {
  if (e instanceof Error) {
    return "[" + e.name + "] " + e.message;
  }
  return "[Unknown] " + String(e);
}`,
    testCases: [
      {
        input: null,
        expectedOutput: { typeError: '[TypeError] tipo errado', stringError: '[Unknown] algo deu errado' },
        description: 'Deve formatar erros corretamente',
      },
    ],
    hints: [
      'instanceof Error verifica se e um erro',
      'e.name e e.message sao propriedades do Error',
      'String(e) converte qualquer valor para string',
    ],
    conceptsUsed: ['instanceof', 'formatacao'],
  },

  // Desafio 15: Sistema robusto de rega (combinado)
  {
    id: 'error-15',
    title: 'Sistema Robusto de Rega',
    description:
      'Crie waterPlantSafely(plant, amount) que: valida plant (nao null, tem name), valida amount (numero, >= 0), adiciona amount a plant.water (ou inicia em 0), retorna { success, plant } ou { success: false, error }.',
    difficulty: 5,
    difficultyTier: 'master',
    plantType: 'error-handling',
    experienceReward: 35,
    starterCode: `// Crie waterPlantSafely(plant, amount)
// Validacoes: plant existe, plant.name existe, amount e numero >= 0
// Sucesso: { success: true, plant: plantAtualizada }
// Erro: { success: false, error: mensagem }

`,
    solution: `function waterPlantSafely(plant, amount) {
  try {
    if (!plant) {
      throw new Error("Planta invalida");
    }
    if (!plant.name) {
      throw new Error("Planta sem nome");
    }
    if (typeof amount !== "number" || amount < 0) {
      throw new Error("Quantidade invalida");
    }

    plant.water = (plant.water || 0) + amount;
    return { success: true, plant: plant };
  } catch (e) {
    return { success: false, error: e.message };
  }
}`,
    testCases: [
      {
        input: null,
        expectedOutput: {
          validCase: { success: true, water: 15 },
          nullPlant: { success: false, error: 'Planta invalida' },
          noName: { success: false, error: 'Planta sem nome' },
          badAmount: { success: false, error: 'Quantidade invalida' }
        },
        description: 'Sistema deve ser robusto a erros',
      },
    ],
    hints: [
      'Use try/catch para encapsular toda a logica',
      'Valide cada parametro separadamente',
      'plant.water || 0 trata water undefined',
    ],
    conceptsUsed: ['try', 'catch', 'throw', 'validacao'],
  },
];

export const getErrorHandlingChallengeById = (id: string): ChallengeDefinition | undefined => {
  return errorHandlingChallenges.find((c) => c.id === id);
};
