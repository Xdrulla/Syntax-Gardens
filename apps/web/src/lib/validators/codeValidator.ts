import type { TestCase, ValidationResult } from '../../types';

const FORBIDDEN_KEYWORDS = [
  'import',
  'require',
  'process',
  'global',
  'window',
  'document',
  'localStorage',
  'sessionStorage',
  'fetch',
  'XMLHttpRequest',
  'Worker',
  'WebSocket',
  '__proto__',
];

const TIMEOUT_MS = 3000;

export function sanitizeCode(code: string): string {
  // Remove comentarios de bloco
  let sanitized = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove comentarios de linha
  sanitized = sanitized.replace(/\/\/.*$/gm, '');

  // Verifica keywords proibidos
  for (const keyword of FORBIDDEN_KEYWORDS) {
    if (new RegExp(`\\b${keyword}\\b`).test(sanitized)) {
      throw new Error(`Codigo invalido: uso de "${keyword}" nao e permitido`);
    }
  }

  return sanitized.trim();
}

function executeWithTimeout<T>(fn: () => T, timeout: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Tempo limite excedido. Verifique se seu codigo tem loops infinitos.'));
    }, timeout);

    try {
      const result = fn();
      clearTimeout(timeoutId);
      resolve(result);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

function compareOutputs(actual: unknown, expected: unknown): boolean {
  if (typeof expected === 'object' && expected !== null) {
    return JSON.stringify(actual) === JSON.stringify(expected);
  }
  return actual === expected;
}

// Lista de variaveis que o sistema pode tentar extrair
const EXTRACTABLE_VARIABLES = [
  'result',
  'water',
  'finalHeight',
  'total',
  'waterLevel',
  'readyCount',
  'totalWater',
  'info',
  'heightsInMeters',
  'wateredPlants',
  'plants',
  'first',
  'last',
  'plantName',
  'isWatered',
  'waterAmount',
  'plant',
  'plot',
  'seedBag',
  'garden',
  'message',
  'greeting',
  'sum',
  'count',
  'heights',
  // Conditionals
  'hasWater',
  'status',
  'level',
  'isEqual',
  'isNotEqual',
  'isGreater',
  'isLessOrEqual',
  'canWater',
  'needsAttention',
  'canGrow',
  'isFilled',
  'waterStatus',
  'plantSize',
  'plantStage',
  'color',
  'type',
  'hasName',
  'hasCount',
  'hasData',
  'isNull',
  'isUndefined',
  'hasValue',
  'action',
  // Strings
  'nameLength',
  'emptyLength',
  'upperName',
  'lowerName',
  'firstChar',
  'lastChar',
  'thirdChar',
  'beginning',
  'ending',
  'middle',
  'sub1',
  'sub2',
  'words',
  'letters',
  'parts',
  'sentence',
  'path',
  'csv',
  'hasRosa',
  'hasOrquidea',
  'hasCacto',
  'firstA',
  'lastA',
  'notFound',
  'isImage',
  'isPlant',
  'isBackup',
  'fixed',
  'updated',
  'trimmed',
  'trimStart',
  'trimEnd',
  'border',
  'pattern',
  'emphasis',
  'paddedNum',
  'paddedName',
  'paddedPrice',
  'formatted',
  'slug',
  'code',
  'description',
  // Math
  'rounded1',
  'rounded2',
  'rounded3',
  'floor1',
  'floor2',
  'floor3',
  'ceil1',
  'ceil2',
  'ceil3',
  'random',
  'isValid',
  'randomInt',
  'randomRange',
  'biggest',
  'smallest',
  'range',
  'abs1',
  'abs2',
  'distance',
  'squared',
  'cubed',
  'root',
  'sqrt1',
  'sqrt2',
  'hypotenuse',
  'int1',
  'int2',
  'int3',
  'int4',
  'float1',
  'float2',
  'float3',
  'num1',
  'num2',
  'num3',
  'num4',
  'price',
  'rounded',
  'whole',
  'check1',
  'check2',
  'check3',
  'check4',
  'circumference',
  'area',
  'euler',
  'roundedHeight',
  'growthPercent',
];

// Lista de funcoes que o sistema pode tentar chamar
const CALLABLE_FUNCTIONS = [
  'waterPlant',
  'greetPlant',
  'calculateWater',
  'double',
  'growthRate',
  'getInfo',
];

function buildExecutionCode(sanitizedCode: string): string {
  // Gera codigo para extrair variaveis - no mesmo escopo (sem try-catch que cria bloco)
  const variableChecks = EXTRACTABLE_VARIABLES.map(v =>
    `(typeof ${v} !== 'undefined' ? (__r__.${v} = ${v}) : 0)`
  ).join(',\n    ');

  // Gera codigo para detectar funcoes
  const functionChecks = CALLABLE_FUNCTIONS.map(f =>
    `(typeof ${f} === 'function' ? (__r__.__fn_${f}__ = ${f}) : 0)`
  ).join(',\n    ');

  // O codigo do usuario e executado, depois extraimos as variaveis
  // Adiciona ; apos o codigo do usuario para evitar problemas de ASI
  return `
    var __r__ = {};
    ${sanitizedCode};
    void(${variableChecks});
    void(${functionChecks});
    return __r__;
  `;
}

function extractResult(results: Record<string, unknown>): unknown {
  // Prioridade maxima - resultado explicito
  if ('result' in results) return results.result;

  // ========== OBJETOS COMPOSTOS (verificar primeiro - mais especificos) ==========

  // Math - objetos compostos
  if ('rounded1' in results && 'rounded2' in results && 'rounded3' in results) {
    return { rounded1: results.rounded1, rounded2: results.rounded2, rounded3: results.rounded3 };
  }
  if ('floor1' in results && 'floor2' in results && 'floor3' in results) {
    return { floor1: results.floor1, floor2: results.floor2, floor3: results.floor3 };
  }
  if ('ceil1' in results && 'ceil2' in results && 'ceil3' in results) {
    return { ceil1: results.ceil1, ceil2: results.ceil2, ceil3: results.ceil3 };
  }
  if ('biggest' in results && 'smallest' in results && 'range' in results) {
    return { biggest: results.biggest, smallest: results.smallest, range: results.range };
  }
  if ('abs1' in results && 'abs2' in results && 'distance' in results) {
    return { abs1: results.abs1, abs2: results.abs2, distance: results.distance };
  }
  if ('squared' in results && 'cubed' in results && 'root' in results) {
    return { squared: results.squared, cubed: results.cubed, root: results.root };
  }
  if ('sqrt1' in results && 'sqrt2' in results && 'hypotenuse' in results) {
    return { sqrt1: results.sqrt1, sqrt2: results.sqrt2, hypotenuse: results.hypotenuse };
  }
  if ('int1' in results && 'int2' in results && 'int3' in results) {
    return { int1: results.int1, int2: results.int2, int3: results.int3 };
  }
  if ('float1' in results && 'float2' in results && 'float3' in results) {
    return { float1: results.float1, float2: results.float2, float3: results.float3 };
  }
  if ('num1' in results && 'num2' in results && 'num3' in results && 'num4' in results) {
    return { num1: results.num1, num2: results.num2, num3: results.num3, num4: results.num4 };
  }
  if ('price' in results && 'rounded' in results && 'whole' in results) {
    return { price: results.price, rounded: results.rounded, whole: results.whole };
  }
  if ('check1' in results && 'check2' in results && 'check3' in results && 'check4' in results) {
    return { check1: results.check1, check2: results.check2, check3: results.check3, check4: results.check4 };
  }
  if ('circumference' in results && 'area' in results && 'euler' in results) {
    return { circumference: results.circumference, area: results.area, euler: results.euler };
  }
  if ('finalHeight' in results && 'roundedHeight' in results && 'growthPercent' in results) {
    return { finalHeight: results.finalHeight, roundedHeight: results.roundedHeight, growthPercent: results.growthPercent };
  }
  if ('randomInt' in results && 'randomRange' in results) {
    return true; // Para random, simplificado
  }

  // Strings - objetos compostos
  if ('nameLength' in results && 'emptyLength' in results) {
    return { nameLength: results.nameLength, emptyLength: results.emptyLength };
  }
  if ('upperName' in results && 'lowerName' in results) {
    return { upperName: results.upperName, lowerName: results.lowerName };
  }
  if ('firstChar' in results && 'lastChar' in results && 'thirdChar' in results) {
    return { firstChar: results.firstChar, lastChar: results.lastChar, thirdChar: results.thirdChar };
  }
  if ('beginning' in results && 'ending' in results && 'middle' in results) {
    return { beginning: results.beginning, ending: results.ending, middle: results.middle };
  }
  if ('sub1' in results && 'sub2' in results) {
    return { sub1: results.sub1, sub2: results.sub2 };
  }
  if ('words' in results && 'letters' in results && 'parts' in results) {
    return { words: results.words, letters: results.letters, parts: results.parts };
  }
  if ('sentence' in results && 'path' in results && 'csv' in results) {
    return { sentence: results.sentence, path: results.path, csv: results.csv };
  }
  if ('hasRosa' in results && 'hasOrquidea' in results && 'hasCacto' in results) {
    return { hasRosa: results.hasRosa, hasOrquidea: results.hasOrquidea, hasCacto: results.hasCacto };
  }
  if ('firstA' in results && 'lastA' in results && 'notFound' in results) {
    return { firstA: results.firstA, lastA: results.lastA, notFound: results.notFound };
  }
  if ('isImage' in results && 'isPlant' in results && 'isBackup' in results) {
    return { isImage: results.isImage, isPlant: results.isPlant, isBackup: results.isBackup };
  }
  if ('fixed' in results && 'updated' in results) {
    return { fixed: results.fixed, updated: results.updated };
  }
  if ('trimmed' in results && 'trimStart' in results && 'trimEnd' in results) {
    return { trimmed: results.trimmed, trimStart: results.trimStart, trimEnd: results.trimEnd };
  }
  if ('border' in results && 'pattern' in results && 'emphasis' in results) {
    return { border: results.border, pattern: results.pattern, emphasis: results.emphasis };
  }
  if ('paddedNum' in results && 'paddedName' in results && 'paddedPrice' in results) {
    return { paddedNum: results.paddedNum, paddedName: results.paddedName, paddedPrice: results.paddedPrice };
  }
  if ('formatted' in results && 'slug' in results && 'code' in results) {
    return { formatted: results.formatted, slug: results.slug, code: results.code };
  }

  // Conditionals - objetos compostos
  if ('isEqual' in results && 'isNotEqual' in results && 'isGreater' in results && 'isLessOrEqual' in results) {
    return {
      isEqual: results.isEqual,
      isNotEqual: results.isNotEqual,
      isGreater: results.isGreater,
      isLessOrEqual: results.isLessOrEqual,
    };
  }
  if ('canGrow' in results && 'isFilled' in results) {
    return { canGrow: results.canGrow, isFilled: results.isFilled };
  }
  if ('waterStatus' in results && 'plantSize' in results) {
    return { waterStatus: results.waterStatus, plantSize: results.plantSize };
  }
  if ('hasName' in results && 'hasCount' in results && 'hasData' in results) {
    return { hasName: results.hasName, hasCount: results.hasCount, hasData: results.hasData };
  }
  if ('isNull' in results && 'isUndefined' in results && 'hasValue' in results) {
    return { isNull: results.isNull, isUndefined: results.isUndefined, hasValue: results.hasValue };
  }

  // ========== VALORES SIMPLES ESPECIFICOS ==========

  // Strings - valor simples
  if ('description' in results && typeof results.description === 'string' && results.description !== '') {
    return results.description;
  }

  // Math - valor simples
  if ('isValid' in results) return results.isValid;

  // Conditionals - valores simples
  if ('hasWater' in results) return results.hasWater;
  if ('canWater' in results) return results.canWater;
  if ('needsAttention' in results) return results.needsAttention;
  if ('plantStage' in results) return results.plantStage;
  if ('action' in results && results.action !== '') return results.action;
  if ('status' in results && results.status !== '') return results.status;
  if ('level' in results && results.level !== '') return results.level;
  if ('color' in results && results.color !== '') return results.color;
  if ('type' in results && results.type !== '') return results.type;

  // ========== VARIAVEIS GENERICAS (desafios antigos) ==========
  if ('water' in results) return results.water;
  if ('finalHeight' in results) return results.finalHeight;
  if ('total' in results) return results.total;
  if ('sum' in results) return results.sum;
  if ('count' in results) return results.count;
  if ('waterLevel' in results) return results.waterLevel;
  if ('readyCount' in results) return results.readyCount;
  if ('totalWater' in results) return results.totalWater;
  if ('message' in results) return results.message;
  if ('greeting' in results) return results.greeting;

  // Arrays
  if ('plants' in results && Array.isArray(results.plants)) return results.plants;
  if ('heights' in results && Array.isArray(results.heights)) return results.heights;
  if ('heightsInMeters' in results) return results.heightsInMeters;
  if ('wateredPlants' in results) return results.wateredPlants;
  if ('garden' in results && Array.isArray(results.garden)) return results.garden;

  // Objetos compostos
  if ('first' in results && 'last' in results) {
    return { first: results.first, last: results.last };
  }
  if ('plantName' in results && 'isWatered' in results && 'waterAmount' in results) {
    return {
      plantName: results.plantName,
      isWatered: results.isWatered,
      waterAmount: results.waterAmount
    };
  }

  // Strings
  if ('info' in results && typeof results.info === 'string') return results.info;

  // Objetos simples
  if ('plant' in results && typeof results.plant === 'object') return results.plant;
  if ('plot' in results && typeof results.plot === 'object') return results.plot;
  if ('seedBag' in results && typeof results.seedBag === 'object') return results.seedBag;
  if ('info' in results && typeof results.info === 'object') return results.info;

  return undefined;
}

function callFunction(fn: (...args: unknown[]) => unknown, input: unknown): unknown {
  if (Array.isArray(input)) {
    return fn(...input);
  }
  return fn(input);
}

export async function validateCode(
  userCode: string,
  testCases: TestCase[]
): Promise<ValidationResult> {
  try {
    const sanitizedCode = sanitizeCode(userCode);

    const results: boolean[] = [];
    const errors: string[] = [];

    for (const testCase of testCases) {
      try {
        const result = await executeWithTimeout(() => {
          const hasInput = testCase.input !== null && testCase.input !== undefined;

          // Executa o codigo e extrai variaveis/funcoes
          const execCode = buildExecutionCode(sanitizedCode);

          // eslint-disable-next-line no-new-func
          const fn = new Function(execCode);
          const extracted = fn() as Record<string, unknown>;

          // Verifica se ha funcoes declaradas
          for (const funcName of CALLABLE_FUNCTIONS) {
            const funcKey = `__fn_${funcName}__`;
            if (extracted[funcKey] && typeof extracted[funcKey] === 'function') {
              if (hasInput) {
                // Chama a funcao com o input
                return callFunction(extracted[funcKey] as (...args: unknown[]) => unknown, testCase.input);
              } else {
                // Chama a funcao sem argumentos
                return (extracted[funcKey] as () => unknown)();
              }
            }
          }

          // Nao e uma funcao, extrai variavel
          return extractResult(extracted);
        }, TIMEOUT_MS);

        const passed = compareOutputs(result, testCase.expectedOutput);
        results.push(passed);

        if (!passed) {
          errors.push(
            `Teste falhou: ${testCase.description}\n` +
            `  Esperado: ${JSON.stringify(testCase.expectedOutput)}\n` +
            `  Recebido: ${JSON.stringify(result)}`
          );
        }
      } catch (error) {
        results.push(false);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        errors.push(`Erro no teste "${testCase.description}": ${errorMessage}`);
      }
    }

    const passedTests = results.filter((r) => r).length;

    return {
      success: passedTests === testCases.length,
      passedTests,
      totalTests: testCases.length,
      errors,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return {
      success: false,
      passedTests: 0,
      totalTests: testCases.length,
      errors: [errorMessage],
    };
  }
}
