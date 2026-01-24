/**
 * Sistema de Tutoriais de Conceitos
 *
 * Cada conceito terá um mini-tutorial antes do primeiro desafio.
 * O tutorial explica o conceito, mostra um exemplo e usa analogias com jardinagem.
 */

export interface ConceptTutorial {
  conceptId: string;
  title: string;
  introduction: string;        // Explicação simples (2-3 parágrafos)
  analogy: string;             // Analogia com jardinagem
  codeExample: string;         // Código demonstrativo
  codeExplanation: string;     // Explicação do código
  keyPoints: string[];         // Pontos-chave para memorizar
  icon: string;                // Emoji para representar visualmente
}

// Importa todos os tutoriais
import { variableTutorial } from './variable';
import { conditionalTutorial } from './conditional';
import { stringTutorial } from './string';
import { functionTutorial } from './function';
import { loopTutorial } from './loop';
import { arrayTutorial } from './array';
import { objectTutorial } from './object';
import { mathTutorial } from './math';
import { arrayMethodsTutorial } from './arrayMethods';
import { destructuringTutorial } from './destructuring';
import { spreadRestTutorial } from './spreadRest';
import { arrowFunctionsTutorial } from './arrowFunctions';
import { classTutorial } from './class';
import { asyncTutorial } from './async';
import { closureTutorial } from './closure';
import { errorHandlingTutorial } from './errorHandling';
import { prototypeTutorial } from './prototype';
import { generatorTutorial } from './generator';
import { proxyTutorial } from './proxy';
import { weakCollectionTutorial } from './weakCollection';

// Mapa de todos os tutoriais por conceptId
export const tutorials: Record<string, ConceptTutorial> = {
  'variable': variableTutorial,
  'conditional': conditionalTutorial,
  'string': stringTutorial,
  'function': functionTutorial,
  'loop': loopTutorial,
  'array': arrayTutorial,
  'object': objectTutorial,
  'math': mathTutorial,
  'array-methods': arrayMethodsTutorial,
  'destructuring': destructuringTutorial,
  'spread-rest': spreadRestTutorial,
  'arrow-functions': arrowFunctionsTutorial,
  'class': classTutorial,
  'async': asyncTutorial,
  'closure': closureTutorial,
  'error-handling': errorHandlingTutorial,
  'prototype': prototypeTutorial,
  'generator': generatorTutorial,
  'proxy': proxyTutorial,
  'weak-collection': weakCollectionTutorial,
};

/**
 * Retorna o tutorial para um conceito específico
 */
export function getTutorialByConceptId(conceptId: string): ConceptTutorial | null {
  return tutorials[conceptId] || null;
}

/**
 * Retorna todos os IDs de conceitos que têm tutorial
 */
export function getAllTutorialConceptIds(): string[] {
  return Object.keys(tutorials);
}
