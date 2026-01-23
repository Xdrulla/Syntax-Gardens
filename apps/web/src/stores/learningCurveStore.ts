import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Sistema de Curva de Aprendizado Inteligente
// - Rastrear tempo médio por desafio
// - Se jogador travar 3+ tentativas, oferecer dica automática
// - Se completar muito rápido, sugerir nível acima
// - Adaptive difficulty baseado em performance

interface ChallengeAttempt {
  challengeId: string;
  startTime: number;
  endTime?: number;
  attempts: number;
  completed: boolean;
  hintsUsed: number;
}

interface ConceptStats {
  conceptId: string;
  totalChallenges: number;
  completedChallenges: number;
  averageTime: number; // em segundos
  averageAttempts: number;
  fastCompletions: number; // completou em menos de 30s
  slowCompletions: number; // demorou mais de 5 min
  totalHintsUsed: number;
}

interface LearningCurveState {
  currentAttempt: ChallengeAttempt | null;
  attempts: Record<string, ChallengeAttempt[]>;
  conceptStats: Record<string, ConceptStats>;

  // Ações
  startChallenge: (challengeId: string) => void;
  recordAttempt: (challengeId: string) => void;
  recordHintUsed: (challengeId: string) => void;
  completeChallenge: (challengeId: string, plantType: string) => void;
  abandonChallenge: () => void;

  // Análise
  shouldShowAutoHint: (challengeId: string) => boolean;
  shouldSuggestHigherDifficulty: (conceptId: string) => boolean;
  getPerformanceLevel: (conceptId: string) => 'struggling' | 'normal' | 'excelling';
  getAverageTimeForConcept: (conceptId: string) => number;
  getRecommendedNextConcept: (currentConceptId: string, playerLevel: number) => string | null;
}

// Thresholds
const FAST_COMPLETION_THRESHOLD = 30; // segundos
const SLOW_COMPLETION_THRESHOLD = 300; // 5 minutos
const AUTO_HINT_ATTEMPTS_THRESHOLD = 3;
const EXCELLING_FAST_RATIO = 0.5; // 50% das conclusões são rápidas

export const useLearningCurveStore = create<LearningCurveState>()(
  persist(
    (set, get) => ({
      currentAttempt: null,
      attempts: {},
      conceptStats: {},

      startChallenge: (challengeId: string) => {
        set({
          currentAttempt: {
            challengeId,
            startTime: Date.now(),
            attempts: 0,
            completed: false,
            hintsUsed: 0,
          },
        });
      },

      recordAttempt: (challengeId: string) => {
        set((state) => {
          if (!state.currentAttempt || state.currentAttempt.challengeId !== challengeId) {
            return state;
          }

          return {
            currentAttempt: {
              ...state.currentAttempt,
              attempts: state.currentAttempt.attempts + 1,
            },
          };
        });
      },

      recordHintUsed: (challengeId: string) => {
        set((state) => {
          if (!state.currentAttempt || state.currentAttempt.challengeId !== challengeId) {
            return state;
          }

          return {
            currentAttempt: {
              ...state.currentAttempt,
              hintsUsed: state.currentAttempt.hintsUsed + 1,
            },
          };
        });
      },

      completeChallenge: (challengeId: string, plantType: string) => {
        set((state) => {
          if (!state.currentAttempt || state.currentAttempt.challengeId !== challengeId) {
            return state;
          }

          const endTime = Date.now();
          const completedAttempt: ChallengeAttempt = {
            ...state.currentAttempt,
            endTime,
            completed: true,
          };

          // Calcula tempo em segundos
          const timeInSeconds = (endTime - state.currentAttempt.startTime) / 1000;

          // Atualiza histórico de tentativas
          const challengeAttempts = [...(state.attempts[challengeId] || []), completedAttempt];

          // Atualiza estatísticas do conceito
          const currentStats = state.conceptStats[plantType] || {
            conceptId: plantType,
            totalChallenges: 0,
            completedChallenges: 0,
            averageTime: 0,
            averageAttempts: 0,
            fastCompletions: 0,
            slowCompletions: 0,
            totalHintsUsed: 0,
          };

          const newCompletedCount = currentStats.completedChallenges + 1;
          const newAverageTime =
            (currentStats.averageTime * currentStats.completedChallenges + timeInSeconds) /
            newCompletedCount;
          const newAverageAttempts =
            (currentStats.averageAttempts * currentStats.completedChallenges +
              completedAttempt.attempts) /
            newCompletedCount;

          const updatedStats: ConceptStats = {
            ...currentStats,
            completedChallenges: newCompletedCount,
            averageTime: newAverageTime,
            averageAttempts: newAverageAttempts,
            fastCompletions:
              currentStats.fastCompletions + (timeInSeconds < FAST_COMPLETION_THRESHOLD ? 1 : 0),
            slowCompletions:
              currentStats.slowCompletions + (timeInSeconds > SLOW_COMPLETION_THRESHOLD ? 1 : 0),
            totalHintsUsed: currentStats.totalHintsUsed + completedAttempt.hintsUsed,
          };

          return {
            currentAttempt: null,
            attempts: {
              ...state.attempts,
              [challengeId]: challengeAttempts,
            },
            conceptStats: {
              ...state.conceptStats,
              [plantType]: updatedStats,
            },
          };
        });
      },

      abandonChallenge: () => {
        set({ currentAttempt: null });
      },

      shouldShowAutoHint: (challengeId: string) => {
        const state = get();
        if (!state.currentAttempt || state.currentAttempt.challengeId !== challengeId) {
          return false;
        }

        return state.currentAttempt.attempts >= AUTO_HINT_ATTEMPTS_THRESHOLD;
      },

      shouldSuggestHigherDifficulty: (conceptId: string) => {
        const stats = get().conceptStats[conceptId];
        if (!stats || stats.completedChallenges < 3) {
          return false; // Precisa de dados suficientes
        }

        const fastRatio = stats.fastCompletions / stats.completedChallenges;
        return fastRatio >= EXCELLING_FAST_RATIO && stats.averageAttempts <= 1.5;
      },

      getPerformanceLevel: (conceptId: string) => {
        const stats = get().conceptStats[conceptId];
        if (!stats || stats.completedChallenges < 2) {
          return 'normal';
        }

        const fastRatio = stats.fastCompletions / stats.completedChallenges;
        const slowRatio = stats.slowCompletions / stats.completedChallenges;

        if (fastRatio >= 0.5 && stats.averageAttempts <= 1.5) {
          return 'excelling';
        }

        if (slowRatio >= 0.4 || stats.averageAttempts >= 4) {
          return 'struggling';
        }

        return 'normal';
      },

      getAverageTimeForConcept: (conceptId: string) => {
        const stats = get().conceptStats[conceptId];
        return stats?.averageTime || 0;
      },

      getRecommendedNextConcept: (currentConceptId: string, playerLevel: number) => {
        const state = get();
        const currentStats = state.conceptStats[currentConceptId];

        if (!currentStats) return null;

        const performance = state.getPerformanceLevel(currentConceptId);

        // Importa o grafo de dependências
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { CONCEPT_PREREQUISITES, CONCEPT_MIN_LEVEL } = require('./conceptProgressStore');

        // Se está se saindo muito bem, sugere próximo conceito mais avançado
        if (performance === 'excelling') {
          // Encontra conceitos que dependem do atual
          const dependentConcepts = Object.entries(CONCEPT_PREREQUISITES as Record<string, string[]>)
            .filter(([, prereqs]) => prereqs.includes(currentConceptId))
            .map(([concept]) => concept)
            .filter((concept) => (CONCEPT_MIN_LEVEL as Record<string, number>)[concept] <= playerLevel + 2);

          return dependentConcepts[0] || null;
        }

        // Se está com dificuldade, sugere revisar pré-requisitos
        if (performance === 'struggling') {
          const prereqs = (CONCEPT_PREREQUISITES as Record<string, string[]>)[currentConceptId] || [];
          const weakPrereq = prereqs.find((p) => {
            const prereqStats = state.conceptStats[p];
            return !prereqStats || prereqStats.completedChallenges < 3;
          });
          return weakPrereq || null;
        }

        return null;
      },
    }),
    {
      name: 'syntax-gardens-learning-curve',
    }
  )
);

// Exporta constantes para uso externo
export const LEARNING_THRESHOLDS = {
  FAST_COMPLETION: FAST_COMPLETION_THRESHOLD,
  SLOW_COMPLETION: SLOW_COMPLETION_THRESHOLD,
  AUTO_HINT_ATTEMPTS: AUTO_HINT_ATTEMPTS_THRESHOLD,
};
