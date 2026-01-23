import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ConceptProgress, DifficultyTier } from '../types';
import { allChallenges, getChallengesByPlantType } from '../data/challenges';

// Mapeia plantType para conceitos
const CONCEPT_NAMES: Record<string, string> = {
  variable: 'Variáveis',
  function: 'Funções',
  loop: 'Loops',
  object: 'Objetos',
  array: 'Arrays',
  conditional: 'Condicionais',
  string: 'Strings',
  math: 'Matemática',
  'array-methods': 'Métodos de Array',
  destructuring: 'Destructuring',
  'spread-rest': 'Spread/Rest',
  'arrow-functions': 'Arrow Functions',
  class: 'Classes',
  async: 'Async/Await',
  closure: 'Closures',
  'error-handling': 'Error Handling',
  prototype: 'Prototypes',
  generator: 'Generators',
  proxy: 'Proxies',
  'weak-collection': 'WeakMap/WeakSet',
};

// Grafo de dependências entre conceitos
// Cada conceito lista seus pré-requisitos
export const CONCEPT_PREREQUISITES: Record<string, string[]> = {
  variable: [], // Conceito inicial, sem pré-requisitos
  conditional: ['variable'],
  string: ['variable'],
  math: ['variable'],
  function: ['variable'],
  loop: ['variable'],
  array: ['variable', 'loop'],
  object: ['variable', 'function'],
  'array-methods': ['array', 'function'],
  destructuring: ['object', 'array'],
  'spread-rest': ['destructuring'],
  'arrow-functions': ['function'],
  class: ['object', 'function'],
  async: ['function', 'arrow-functions'],
  closure: ['function', 'variable'],
  'error-handling': ['conditional', 'function'],
  prototype: ['class', 'object'],
  generator: ['loop', 'arrow-functions'],
  proxy: ['object', 'function'],
  'weak-collection': ['object', 'array-methods'],
};

// Nível mínimo requerido para desbloquear cada conceito
export const CONCEPT_MIN_LEVEL: Record<string, number> = {
  variable: 1,
  conditional: 2,
  string: 2,
  math: 3,
  function: 2,
  loop: 3,
  array: 5,
  object: 5,
  'array-methods': 8,
  destructuring: 7,
  'spread-rest': 8,
  'arrow-functions': 7,
  class: 13,
  async: 15,
  closure: 13,
  'error-handling': 13,
  prototype: 21,
  generator: 21,
  proxy: 22,
  'weak-collection': 20,
};

// Distribui desafios em tiers baseado na posição (30% beginner, 50% practitioner, 20% master)
function assignDifficultyTier(index: number, total: number): DifficultyTier {
  const beginnerThreshold = Math.ceil(total * 0.3);
  const practitionerThreshold = Math.ceil(total * 0.8);

  if (index < beginnerThreshold) return 'beginner';
  if (index < practitionerThreshold) return 'practitioner';
  return 'master';
}

// Calcula badge baseado no progresso
function calculateBadge(progress: ConceptProgress): 'none' | 'bronze' | 'silver' | 'gold' {
  const beginnerComplete = progress.beginnerTotal > 0 && progress.beginnerCompleted === progress.beginnerTotal;
  const practitionerComplete = progress.practitionerTotal > 0 && progress.practitionerCompleted === progress.practitionerTotal;
  const masterComplete = progress.masterTotal > 0 && progress.masterCompleted === progress.masterTotal;

  if (beginnerComplete && practitionerComplete && masterComplete) return 'gold';
  if (beginnerComplete && practitionerComplete) return 'silver';
  if (beginnerComplete) return 'bronze';
  return 'none';
}

// Gera progresso inicial para um conceito
function createInitialProgress(conceptId: string): ConceptProgress {
  const challenges = getChallengesByPlantType(conceptId);
  const total = challenges.length;

  const beginnerTotal = Math.ceil(total * 0.3);
  const masterTotal = Math.ceil(total * 0.2);
  const practitionerTotal = total - beginnerTotal - masterTotal;

  return {
    conceptId,
    completedChallenges: [],
    beginnerCompleted: 0,
    beginnerTotal,
    practitionerCompleted: 0,
    practitionerTotal,
    masterCompleted: 0,
    masterTotal,
    badge: 'none',
  };
}

// Informações sobre bloqueio de um conceito
export interface ConceptLockInfo {
  isLocked: boolean;
  reason: 'none' | 'level' | 'prerequisites';
  requiredLevel?: number;
  missingPrerequisites?: string[];
}

interface ConceptProgressState {
  progress: Record<string, ConceptProgress>;

  // Ações
  markChallengeComplete: (challengeId: string, plantType: string) => void;
  getConceptProgress: (conceptId: string) => ConceptProgress;
  getConceptName: (conceptId: string) => string;
  getDifficultyTier: (challengeId: string) => DifficultyTier;
  getAllConceptsProgress: () => ConceptProgress[];
  getTotalBadges: () => { bronze: number; silver: number; gold: number };

  // Sistema de pré-requisitos
  isConceptUnlocked: (conceptId: string, playerLevel: number) => boolean;
  getConceptLockInfo: (conceptId: string, playerLevel: number) => ConceptLockInfo;
  getPrerequisites: (conceptId: string) => string[];
  getSuggestedLearningPath: (targetConcept: string, playerLevel: number) => string[];
}

export const useConceptProgressStore = create<ConceptProgressState>()(
  persist(
    (set, get) => ({
      progress: {},

      markChallengeComplete: (challengeId: string, plantType: string) => {
        set((state) => {
          // Inicializa progresso do conceito se não existir
          let conceptProgress = state.progress[plantType];
          if (!conceptProgress) {
            conceptProgress = createInitialProgress(plantType);
          }

          // Se já completou, não faz nada
          if (conceptProgress.completedChallenges.includes(challengeId)) {
            return state;
          }

          // Determina o tier do desafio
          const challenges = getChallengesByPlantType(plantType);
          const challengeIndex = challenges.findIndex(c => c.id === challengeId);
          if (challengeIndex === -1) return state;

          const tier = assignDifficultyTier(challengeIndex, challenges.length);

          // Atualiza contadores
          const newProgress = {
            ...conceptProgress,
            completedChallenges: [...conceptProgress.completedChallenges, challengeId],
          };

          if (tier === 'beginner') {
            newProgress.beginnerCompleted = conceptProgress.beginnerCompleted + 1;
          } else if (tier === 'practitioner') {
            newProgress.practitionerCompleted = conceptProgress.practitionerCompleted + 1;
          } else {
            newProgress.masterCompleted = conceptProgress.masterCompleted + 1;
          }

          // Recalcula badge
          newProgress.badge = calculateBadge(newProgress);

          return {
            progress: {
              ...state.progress,
              [plantType]: newProgress,
            },
          };
        });
      },

      getConceptProgress: (conceptId: string) => {
        const progress = get().progress[conceptId];
        if (progress) return progress;
        return createInitialProgress(conceptId);
      },

      getConceptName: (conceptId: string) => {
        return CONCEPT_NAMES[conceptId] || conceptId;
      },

      getDifficultyTier: (challengeId: string) => {
        const challenge = allChallenges.find(c => c.id === challengeId);
        if (!challenge) return 'beginner';

        const challenges = getChallengesByPlantType(challenge.plantType);
        const index = challenges.findIndex(c => c.id === challengeId);
        return assignDifficultyTier(index, challenges.length);
      },

      getAllConceptsProgress: () => {
        const state = get();
        return Object.keys(CONCEPT_NAMES).map(conceptId => {
          return state.progress[conceptId] || createInitialProgress(conceptId);
        });
      },

      getTotalBadges: () => {
        const allProgress = get().getAllConceptsProgress();
        return {
          bronze: allProgress.filter(p => p.badge === 'bronze').length,
          silver: allProgress.filter(p => p.badge === 'silver').length,
          gold: allProgress.filter(p => p.badge === 'gold').length,
        };
      },

      // Verifica se um conceito está desbloqueado
      isConceptUnlocked: (conceptId: string, playerLevel: number) => {
        const lockInfo = get().getConceptLockInfo(conceptId, playerLevel);
        return !lockInfo.isLocked;
      },

      // Retorna informações detalhadas sobre o bloqueio
      getConceptLockInfo: (conceptId: string, playerLevel: number): ConceptLockInfo => {
        const minLevel = CONCEPT_MIN_LEVEL[conceptId] || 1;
        const prerequisites = CONCEPT_PREREQUISITES[conceptId] || [];

        // Verifica nível
        if (playerLevel < minLevel) {
          return {
            isLocked: true,
            reason: 'level',
            requiredLevel: minLevel,
          };
        }

        // Verifica pré-requisitos (precisa ter pelo menos Bronze em cada)
        const state = get();
        const missingPrerequisites: string[] = [];

        for (const prereq of prerequisites) {
          const progress = state.progress[prereq];
          if (!progress || progress.badge === 'none') {
            missingPrerequisites.push(prereq);
          }
        }

        if (missingPrerequisites.length > 0) {
          return {
            isLocked: true,
            reason: 'prerequisites',
            missingPrerequisites,
          };
        }

        return { isLocked: false, reason: 'none' };
      },

      // Retorna os pré-requisitos de um conceito
      getPrerequisites: (conceptId: string) => {
        return CONCEPT_PREREQUISITES[conceptId] || [];
      },

      // Sugere um caminho de aprendizado para chegar a um conceito
      getSuggestedLearningPath: (targetConcept: string, playerLevel: number) => {
        const state = get();
        const path: string[] = [];
        const visited = new Set<string>();

        // BFS para encontrar todos os pré-requisitos não completados
        const queue = [targetConcept];

        while (queue.length > 0) {
          const current = queue.shift()!;
          if (visited.has(current)) continue;
          visited.add(current);

          const progress = state.progress[current];
          const needsWork = !progress || progress.badge === 'none';

          if (needsWork && current !== targetConcept) {
            path.unshift(current); // Adiciona no início
          }

          const prereqs = CONCEPT_PREREQUISITES[current] || [];
          for (const prereq of prereqs) {
            if (!visited.has(prereq)) {
              queue.push(prereq);
            }
          }
        }

        // Adiciona o conceito alvo no final
        path.push(targetConcept);

        return path;
      },
    }),
    {
      name: 'syntax-gardens-concept-progress',
    }
  )
);
