import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { allChallenges, getChallengesByPlantType } from '../data/challenges';
import type { ChallengeDefinition } from '../types';

// Sistema de Modo Revisão com Spaced Repetition
// - Gera desafio aleatório de conceitos já aprendidos
// - Recompensa menor mas mantém conhecimento fresco
// - Notificação se não praticar por 3+ dias

interface ReviewRecord {
  challengeId: string;
  lastReviewed: number; // timestamp
  reviewCount: number;
  easeFactor: number; // 1.3 a 2.5 (quanto maior, mais fácil)
  interval: number; // dias até próxima revisão
}

interface ReviewState {
  reviews: Record<string, ReviewRecord>;
  lastPracticeDate: number | null;
  reviewStreak: number;

  // Ações
  recordReview: (challengeId: string, wasCorrect: boolean) => void;
  getNextReviewChallenge: (completedChallengeIds: string[]) => ChallengeDefinition | null;
  getRandomReviewChallenge: (completedChallengeIds: string[]) => ChallengeDefinition | null;
  getDueReviews: (completedChallengeIds: string[]) => ChallengeDefinition[];
  getDaysSinceLastPractice: () => number;
  shouldShowReviewReminder: () => boolean;
  getReviewStats: () => { total: number; dueToday: number; streak: number };
}

// Algoritmo SM-2 simplificado para spaced repetition
function calculateNextInterval(
  currentInterval: number,
  easeFactor: number,
  wasCorrect: boolean
): { interval: number; easeFactor: number } {
  if (!wasCorrect) {
    // Reset ao errar
    return { interval: 1, easeFactor: Math.max(1.3, easeFactor - 0.2) };
  }

  // Aumenta intervalo progressivamente
  let newInterval: number;
  if (currentInterval === 0) {
    newInterval = 1;
  } else if (currentInterval === 1) {
    newInterval = 3;
  } else {
    newInterval = Math.round(currentInterval * easeFactor);
  }

  // Aumenta ease factor levemente ao acertar
  const newEaseFactor = Math.min(2.5, easeFactor + 0.1);

  return { interval: newInterval, easeFactor: newEaseFactor };
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: {},
      lastPracticeDate: null,
      reviewStreak: 0,

      recordReview: (challengeId: string, wasCorrect: boolean) => {
        set((state) => {
          const now = Date.now();
          const today = new Date().toDateString();
          const lastPractice = state.lastPracticeDate
            ? new Date(state.lastPracticeDate).toDateString()
            : null;

          // Atualiza streak
          let newStreak = state.reviewStreak;
          if (lastPractice !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastPractice === yesterday.toDateString()) {
              newStreak += 1;
            } else if (lastPractice !== today) {
              newStreak = 1; // Reset streak se pulou dias
            }
          }

          // Atualiza ou cria registro de revisão
          const existing = state.reviews[challengeId];
          const currentInterval = existing?.interval || 0;
          const currentEaseFactor = existing?.easeFactor || 2.0;

          const { interval, easeFactor } = calculateNextInterval(
            currentInterval,
            currentEaseFactor,
            wasCorrect
          );

          return {
            reviews: {
              ...state.reviews,
              [challengeId]: {
                challengeId,
                lastReviewed: now,
                reviewCount: (existing?.reviewCount || 0) + 1,
                easeFactor,
                interval,
              },
            },
            lastPracticeDate: now,
            reviewStreak: newStreak,
          };
        });
      },

      // Retorna o próximo desafio que precisa de revisão (baseado em spaced repetition)
      getNextReviewChallenge: (completedChallengeIds: string[]) => {
        const state = get();
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;

        // Filtra desafios que estão "devidos" para revisão
        const dueReviews = completedChallengeIds
          .map((id) => {
            const review = state.reviews[id];
            if (!review) {
              // Nunca revisado - prioridade alta
              return { id, priority: 100, daysOverdue: 100 };
            }

            const daysSinceReview = (now - review.lastReviewed) / oneDayMs;
            const daysOverdue = daysSinceReview - review.interval;

            if (daysOverdue >= 0) {
              return { id, priority: daysOverdue + 1, daysOverdue };
            }
            return null;
          })
          .filter((x): x is { id: string; priority: number; daysOverdue: number } => x !== null)
          .sort((a, b) => b.priority - a.priority);

        if (dueReviews.length === 0) return null;

        // Retorna o mais atrasado
        const nextId = dueReviews[0].id;
        return allChallenges.find((c) => c.id === nextId) || null;
      },

      // Retorna um desafio aleatório para praticar
      getRandomReviewChallenge: (completedChallengeIds: string[]) => {
        if (completedChallengeIds.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * completedChallengeIds.length);
        const challengeId = completedChallengeIds[randomIndex];
        return allChallenges.find((c) => c.id === challengeId) || null;
      },

      // Retorna todos os desafios que precisam de revisão hoje
      getDueReviews: (completedChallengeIds: string[]) => {
        const state = get();
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;

        return completedChallengeIds
          .filter((id) => {
            const review = state.reviews[id];
            if (!review) return true; // Nunca revisado

            const daysSinceReview = (now - review.lastReviewed) / oneDayMs;
            return daysSinceReview >= review.interval;
          })
          .map((id) => allChallenges.find((c) => c.id === id))
          .filter((c): c is ChallengeDefinition => c !== undefined);
      },

      getDaysSinceLastPractice: () => {
        const lastPractice = get().lastPracticeDate;
        if (!lastPractice) return Infinity;

        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        return Math.floor((now - lastPractice) / oneDayMs);
      },

      shouldShowReviewReminder: () => {
        const daysSince = get().getDaysSinceLastPractice();
        return daysSince >= 3;
      },

      getReviewStats: () => {
        const state = get();
        const allReviews = Object.values(state.reviews);

        return {
          total: allReviews.length,
          dueToday: allReviews.filter((r) => {
            const now = Date.now();
            const oneDayMs = 24 * 60 * 60 * 1000;
            const daysSince = (now - r.lastReviewed) / oneDayMs;
            return daysSince >= r.interval;
          }).length,
          streak: state.reviewStreak,
        };
      },
    }),
    {
      name: 'syntax-gardens-review',
    }
  )
);

// Constantes para recompensas de revisão (50% do normal)
export const REVIEW_XP_MULTIPLIER = 0.5;
export const REVIEW_COINS_MULTIPLIER = 0.5;
