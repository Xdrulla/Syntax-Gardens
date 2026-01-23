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
  // Array Methods Avançados
  'plantCount',
  'allSeeds',
  'thirstyPlant',
  'matureIndex',
  'lastDry',
  'lastDryIndex',
  'needsWater',
  'allHealthy',
  'sortedAsc',
  'sortedDesc',
  'sortedNames',
  'reverseSorted',
  'sortedByWater',
  'reversedSeasons',
  'flatGarden',
  'deepFlat',
  'duplicated',
  'firstRosa',
  'lastRosa',
  'sliced',
  'spliced',
  'allPlants',
  'numbers',
  'doubled',
  'isArr1',
  'isArr2',
  'isArr3',
  'totalDoubledWater',
  'top3',
  'analysis',
  // Destructuring
  'x',
  'y',
  'third',
  'leader',
  'followers',
  'plant1',
  'plant2',
  'plant3',
  'a',
  'b',
  'fertilizer',
  'city',
  'output',
  'plantData',
  'names',
  'lat',
  'lng',
  'report',
  // Spread/Rest
  'original',
  'copy',
  'withStart',
  'withEnd',
  'totalStats',
  'plantCopy',
  'finalSettings',
  'plantWithId',
  'maxNumber',
  'maxWater',
  'minWater',
  'originalWater',
  'copyWater',
  'safeUser',
  'mergedPlant',
  // Arrow Functions
  'hydrated',
  'sorted',
  'receivedMessage',
  'messages',
  'result1',
  'result2',
  'filtered',
  'pipeline',
  'rose',
  // Classes/OOP
  'plantNeeds',
  'cactusNeeds',
  'status1',
  'status2',
  'water1',
  'water2',
  'healthy',
  'unhealthy',
  // Closures
  'funcs',
  'afterAdd',
  'afterRemove',
  'afterBigRemove',
  'afterFirst',
  'afterThird',
  'info',
  'error',
  'first',
  'second',
  'third',
  'cached',
  'cacheSize',
  // Error Handling
  'done',
  'valid',
  'errorMsg',
  'typeError',
  'nanError',
  'nullError',
  'nameError',
  'waterError',
  'successCase',
  'errorCase',
  'errorCount',
  'hasTime',
  'hasMessage',
  'validCase',
  'badAmount',
  'noName',
  'nullPlant',
  // Async/Await
  'promise',
  'resolved',
  'rejected',
  'resolvedValue',
  'rejectedReason',
  'success',
  'value',
  'cleanup',
  'plantsWatered',
  'totalWater',
  'sequential',
  'parallel',
];

// Lista de funcoes que o sistema pode tentar chamar
const CALLABLE_FUNCTIONS = [
  'waterPlant',
  'greetPlant',
  'calculateWater',
  'double',
  'growthRate',
  'getInfo',
  // Closures
  'createGreeter',
  'createCounter',
  'createWaterTank',
  'createPlant',
  'createLogger',
  'createMemoizedDouble',
  'createDelayedCounter',
  'createPlantWithClosure',
  'createGrowthCache',
  'createFunctions',
  'inner',
  'getWater',
  // Error Handling
  'validateWater',
  'checkError',
  'process',
  'safeParseInt',
  'throwByCode',
  'validatePlant',
  'safeFn',
  'createErrorHandler',
  'formatError',
  'waterPlantSafely',
  // Async/Await
  'handlePromise',
  'processWater',
  'getPlantName',
  'safeFetch',
  'withCleanup',
  'getAllWater',
  'race',
  'checkAll',
  'firstSuccess',
  'sumWaters',
  'sequential',
  'parallel',
  'waterGarden',
  'fetchWater',
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

  // ========== ARRAY METHODS AVANÇADOS ==========
  if ('plantCount' in results && typeof results.plantCount === 'object') {
    return results.plantCount;
  }
  if ('allSeeds' in results && Array.isArray(results.allSeeds)) {
    return results.allSeeds;
  }
  if ('thirstyPlant' in results && typeof results.thirstyPlant === 'object') {
    return results.thirstyPlant;
  }
  if ('matureIndex' in results && typeof results.matureIndex === 'number') {
    return results.matureIndex;
  }
  if ('lastDry' in results && 'lastDryIndex' in results) {
    return { lastDry: results.lastDry, lastDryIndex: results.lastDryIndex };
  }
  if ('needsWater' in results && typeof results.needsWater === 'boolean') {
    return results.needsWater;
  }
  if ('allHealthy' in results && typeof results.allHealthy === 'boolean') {
    return results.allHealthy;
  }
  if ('sortedAsc' in results && 'sortedDesc' in results) {
    return { sortedAsc: results.sortedAsc, sortedDesc: results.sortedDesc };
  }
  if ('sortedNames' in results && 'reverseSorted' in results) {
    return { sortedNames: results.sortedNames, reverseSorted: results.reverseSorted };
  }
  if ('sortedByWater' in results && Array.isArray(results.sortedByWater)) {
    return results.sortedByWater;
  }
  if ('reversedSeasons' in results && Array.isArray(results.reversedSeasons)) {
    return results.reversedSeasons;
  }
  if ('flatGarden' in results && 'deepFlat' in results) {
    return { flatGarden: results.flatGarden, deepFlat: results.deepFlat };
  }
  if ('duplicated' in results && Array.isArray(results.duplicated)) {
    return results.duplicated;
  }
  if ('hasRosa' in results && 'hasOrquidea' in results && !('hasCacto' in results)) {
    return { hasRosa: results.hasRosa, hasOrquidea: results.hasOrquidea };
  }
  if ('firstRosa' in results && 'lastRosa' in results) {
    return { firstRosa: results.firstRosa, lastRosa: results.lastRosa };
  }
  if ('sliced' in results && 'spliced' in results) {
    return { sliced: results.sliced, spliced: results.spliced };
  }
  if ('allPlants' in results && 'garden' in results && Array.isArray(results.allPlants)) {
    return { allPlants: results.allPlants, garden: results.garden };
  }
  if ('numbers' in results && 'doubled' in results && Array.isArray(results.numbers)) {
    return { numbers: results.numbers, doubled: results.doubled };
  }
  if ('isArr1' in results && 'isArr2' in results && 'isArr3' in results) {
    return { isArr1: results.isArr1, isArr2: results.isArr2, isArr3: results.isArr3 };
  }
  if ('totalDoubledWater' in results) {
    return results.totalDoubledWater;
  }
  if ('top3' in results && Array.isArray(results.top3)) {
    return results.top3;
  }
  if ('analysis' in results && typeof results.analysis === 'object') {
    return results.analysis;
  }

  // ========== DESTRUCTURING ==========
  if ('x' in results && 'y' in results && typeof results.x === 'number') {
    return { x: results.x, y: results.y };
  }
  if ('first' in results && 'third' in results && !('last' in results)) {
    return { first: results.first, third: results.third };
  }
  if ('leader' in results && 'followers' in results) {
    return { leader: results.leader, followers: results.followers };
  }
  if ('plant1' in results && 'plant2' in results && 'plant3' in results) {
    return { plant1: results.plant1, plant2: results.plant2, plant3: results.plant3 };
  }
  if ('a' in results && 'b' in results && typeof results.a === 'string') {
    return { a: results.a, b: results.b };
  }
  if ('name' in results && 'water' in results && typeof results.name === 'string' && typeof results.water === 'number' && Object.keys(results).filter(k => !k.startsWith('__')).length <= 3) {
    return { name: results.name, water: results.water };
  }
  if ('plantName' in results && 'waterLevel' in results && !('isWatered' in results)) {
    return { plantName: results.plantName, waterLevel: results.waterLevel };
  }
  if ('name' in results && 'water' in results && 'fertilizer' in results) {
    return { name: results.name, water: results.water, fertilizer: results.fertilizer };
  }
  if ('name' in results && 'city' in results) {
    return { name: results.name, city: results.city };
  }
  if ('output' in results && typeof results.output === 'string') {
    return results.output;
  }
  if ('id' in results && 'plantData' in results) {
    return { id: results.id, plantData: results.plantData };
  }
  if ('names' in results && Array.isArray(results.names)) {
    return results.names;
  }
  if ('lat' in results && 'lng' in results) {
    return { lat: results.lat, lng: results.lng };
  }
  if ('name' in results && 'status' in results && typeof results.status === 'string' && results.status !== '' && !('water' in results)) {
    return { name: results.name, status: results.status };
  }
  if ('report' in results && typeof results.report === 'object') {
    return results.report;
  }

  // ========== SPREAD/REST ==========
  if ('garden' in results && Array.isArray(results.garden) && results.garden.length === 4) {
    return results.garden;
  }
  if ('original' in results && 'copy' in results && Array.isArray(results.original)) {
    return { original: results.original, copy: results.copy };
  }
  if ('withStart' in results && 'withEnd' in results) {
    return { withStart: results.withStart, withEnd: results.withEnd };
  }
  if ('totalStats' in results && typeof results.totalStats === 'object') {
    return results.totalStats;
  }
  if ('plant' in results && 'plantCopy' in results) {
    return { plant: results.plant, plantCopy: results.plantCopy };
  }
  if ('finalSettings' in results && typeof results.finalSettings === 'object') {
    return results.finalSettings;
  }
  if ('plantWithId' in results && typeof results.plantWithId === 'object') {
    return results.plantWithId;
  }
  if ('maxNumber' in results && typeof results.maxNumber === 'number') {
    return results.maxNumber;
  }
  if ('maxWater' in results && 'minWater' in results) {
    return { maxWater: results.maxWater, minWater: results.minWater };
  }
  if ('originalWater' in results && 'copyWater' in results) {
    return { originalWater: results.originalWater, copyWater: results.copyWater };
  }
  if ('safeUser' in results && typeof results.safeUser === 'object') {
    return results.safeUser;
  }
  if ('mergedPlant' in results && typeof results.mergedPlant === 'object') {
    return results.mergedPlant;
  }

  // ========== ARROW FUNCTIONS ==========
  if ('doubled' in results && Array.isArray(results.doubled) && !('numbers' in results)) {
    return results.doubled;
  }
  if ('hydrated' in results && Array.isArray(results.hydrated)) {
    return results.hydrated;
  }
  if ('sorted' in results && Array.isArray(results.sorted)) {
    return results.sorted;
  }
  if ('receivedMessage' in results && typeof results.receivedMessage === 'string') {
    return results.receivedMessage;
  }
  if ('messages' in results && Array.isArray(results.messages)) {
    return results.messages;
  }
  if ('result1' in results && 'result2' in results) {
    return { result1: results.result1, result2: results.result2 };
  }
  if ('filtered' in results && Array.isArray(results.filtered)) {
    return results.filtered;
  }
  if ('pipeline' in results && typeof results.pipeline === 'string') {
    return results.pipeline;
  }

  // ========== CLASSES/OOP ==========
  if ('status1' in results && 'status2' in results) {
    return { status1: results.status1, status2: results.status2 };
  }
  if ('water1' in results && 'water2' in results) {
    return { water1: results.water1, water2: results.water2 };
  }
  if ('healthy' in results && 'unhealthy' in results) {
    return { healthy: results.healthy, unhealthy: results.unhealthy };
  }
  if ('plantNeeds' in results && 'cactusNeeds' in results) {
    return { plantNeeds: results.plantNeeds, cactusNeeds: results.cactusNeeds };
  }

  // ========== CLOSURES ==========
  if ('afterAdd' in results && 'afterRemove' in results && 'afterBigRemove' in results) {
    return { afterAdd: results.afterAdd, afterRemove: results.afterRemove, afterBigRemove: results.afterBigRemove };
  }
  if ('first' in results && 'second' in results && 'third' in results && typeof results.first === 'number') {
    return { first: results.first, second: results.second, third: results.third };
  }
  if ('afterFirst' in results && 'afterThird' in results) {
    return { afterFirst: results.afterFirst, afterThird: results.afterThird };
  }
  if ('info' in results && 'error' in results && typeof results.info === 'string' && typeof results.error === 'string') {
    return { info: results.info, error: results.error };
  }
  if ('first' in results && 'second' in results && 'cached' in results) {
    return { first: results.first, second: results.second, cached: results.cached };
  }
  if ('result1' in results && 'cacheSize' in results) {
    return { result1: results.result1, result2: results.result2, cacheSize: results.cacheSize, cached: results.cached };
  }
  if ('plants' in results && 'count' in results && typeof results.count === 'number') {
    return { plants: results.plants, count: results.count };
  }
  if ('funcs' in results && Array.isArray(results.funcs)) {
    return results.funcs;
  }

  // ========== ERROR HANDLING ==========
  if ('error' in results && 'done' in results) {
    return { error: results.error, done: results.done };
  }
  if ('valid' in results && 'errorMsg' in results) {
    return { valid: results.valid, errorMsg: results.errorMsg };
  }
  if ('valid' in results && 'typeError' in results && 'nanError' in results) {
    return { valid: results.valid, typeError: results.typeError, nanError: results.nanError };
  }
  if ('type' in results && 'ref' in results && 'other' in results) {
    return { type: results.type, ref: results.ref, other: results.other };
  }
  if ('valid' in results && 'errorContains' in results) {
    return { valid: results.valid, errorContains: results.errorContains };
  }
  if ('name' in results && 'amount' in results && 'hasMessage' in results) {
    return { name: results.name, amount: results.amount, hasMessage: results.hasMessage };
  }
  if ('typeError' in results && 'stringError' in results) {
    return { typeError: results.typeError, stringError: results.stringError };
  }
  if ('valid' in results && 'nullError' in results && 'nameError' in results && 'waterError' in results) {
    return { valid: results.valid, nullError: results.nullError, nameError: results.nameError, waterError: results.waterError };
  }
  if ('successCase' in results && 'errorCase' in results) {
    return { successCase: results.successCase, errorCase: results.errorCase };
  }
  if ('errorCount' in results && 'hasTime' in results && 'hasMessage' in results) {
    return { errorCount: results.errorCount, hasTime: results.hasTime, hasMessage: results.hasMessage };
  }
  if ('validCase' in results && 'nullPlant' in results) {
    return { validCase: results.validCase, nullPlant: results.nullPlant, noName: results.noName, badAmount: results.badAmount };
  }

  // ========== ASYNC/AWAIT ==========
  if ('resolvedValue' in results && 'rejectedReason' in results) {
    return { resolvedValue: results.resolvedValue, rejectedReason: results.rejectedReason };
  }
  if ('resolved' in results && 'rejected' in results && typeof results.resolved === 'number') {
    return { resolved: results.resolved, rejected: results.rejected };
  }
  if ('success' in results && 'error' in results && typeof results.success === 'string') {
    return { success: results.success, error: results.error };
  }
  if ('result' in results && 'cleanup' in results) {
    return { result: results.result, cleanup: results.cleanup };
  }
  if ('totalWater' in results && 'plantsWatered' in results) {
    return { totalWater: results.totalWater, plantsWatered: results.plantsWatered };
  }
  if ('sequential' in results && 'parallel' in results) {
    return { sequential: results.sequential, parallel: results.parallel };
  }
  if ('promise' in results) {
    return results.promise;
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
