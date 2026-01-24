import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getChallengesByPlantType, getChallengeById } from '../data/challenges';
import type { ChallengeDefinition, DifficultyTier } from '../types';

/**
 * Store para gerenciar a progressão sequencial de desafios.
 *
 * Problema resolvido: Antes os desafios eram selecionados ALEATORIAMENTE,
 * fazendo um iniciante pular de desafios básicos para avançados.
 *
 * Solução: Agora os desafios seguem ordem progressiva baseada na dificuldade.
 */

// Informações sobre o próximo desafio
export interface NextChallengeInfo {
  challengeId: string;
  challenge: ChallengeDefinition;
  position: number;          // 1-based position (ex: 3 de 15)
  total: number;             // Total de desafios no conceito
  tier: DifficultyTier;      // beginner/practitioner/master
  tierPosition: number;      // Posição dentro do tier (ex: 2 de 5 beginners)
  tierTotal: number;         // Total no tier atual
  isReview: boolean;         // Se é revisão (todos já completados)
  isFirstOfConcept: boolean; // Se é o primeiro desafio do conceito
}

// Calcula o tier baseado na posição do desafio
function calculateTier(index: number, total: number): DifficultyTier {
  const beginnerThreshold = Math.ceil(total * 0.3);
  const practitionerThreshold = Math.ceil(total * 0.8);

  if (index < beginnerThreshold) return 'beginner';
  if (index < practitionerThreshold) return 'practitioner';
  return 'master';
}

// Calcula os limites de cada tier
function getTierBounds(total: number) {
  const beginnerEnd = Math.ceil(total * 0.3);
  const practitionerEnd = Math.ceil(total * 0.8);

  return {
    beginner: { start: 0, end: beginnerEnd },
    practitioner: { start: beginnerEnd, end: practitionerEnd },
    master: { start: practitionerEnd, end: total },
  };
}

interface ChallengeProgressionState {
  // Mapa de conceito -> lista de IDs de desafios completados (em ordem)
  completedByConceptOrdered: Record<string, string[]>;

  // Ações
  getNextChallenge: (plantType: string) => NextChallengeInfo | null;
  markChallengeCompleted: (challengeId: string, plantType: string) => void;
  getConceptCompletionInfo: (plantType: string) => {
    completed: number;
    total: number;
    percentage: number;
    currentTier: DifficultyTier;
  };
  isAllCompleted: (plantType: string) => boolean;
  getChallengePosition: (challengeId: string) => NextChallengeInfo | null;
  resetConceptProgress: (plantType: string) => void;
}

export const useChallengeProgressionStore = create<ChallengeProgressionState>()(
  persist(
    (set, get) => ({
      completedByConceptOrdered: {},

      /**
       * Retorna o próximo desafio na sequência para um conceito.
       * Se todos foram completados, retorna um aleatório para revisão.
       */
      getNextChallenge: (plantType: string): NextChallengeInfo | null => {
        const challenges = getChallengesByPlantType(plantType);
        if (challenges.length === 0) return null;

        // Ordena por dificuldade (difficulty: 1-5)
        const sortedChallenges = [...challenges].sort((a, b) => a.difficulty - b.difficulty);
        const total = sortedChallenges.length;
        const tierBounds = getTierBounds(total);

        const completed = get().completedByConceptOrdered[plantType] || [];
        const completedSet = new Set(completed);

        // Encontra o primeiro não completado
        let nextIndex = sortedChallenges.findIndex(c => !completedSet.has(c.id));
        let isReview = false;

        // Se todos completados, escolhe um aleatório para revisão
        if (nextIndex === -1) {
          nextIndex = Math.floor(Math.random() * total);
          isReview = true;
        }

        const challenge = sortedChallenges[nextIndex];
        const tier = calculateTier(nextIndex, total);
        const bounds = tierBounds[tier];
        const tierPosition = nextIndex - bounds.start + 1;
        const tierTotal = bounds.end - bounds.start;

        return {
          challengeId: challenge.id,
          challenge,
          position: nextIndex + 1,
          total,
          tier,
          tierPosition,
          tierTotal,
          isReview,
          isFirstOfConcept: completed.length === 0,
        };
      },

      /**
       * Marca um desafio como completado (mantém ordem)
       */
      markChallengeCompleted: (challengeId: string, plantType: string) => {
        set((state) => {
          const completed = state.completedByConceptOrdered[plantType] || [];

          // Se já está completado, não adiciona novamente
          if (completed.includes(challengeId)) {
            return state;
          }

          return {
            completedByConceptOrdered: {
              ...state.completedByConceptOrdered,
              [plantType]: [...completed, challengeId],
            },
          };
        });
      },

      /**
       * Retorna informações sobre o progresso em um conceito
       */
      getConceptCompletionInfo: (plantType: string) => {
        const challenges = getChallengesByPlantType(plantType);
        const total = challenges.length;
        const completed = (get().completedByConceptOrdered[plantType] || []).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Determina o tier atual baseado no progresso
        let currentTier: DifficultyTier = 'beginner';
        if (total > 0) {
          const tierBounds = getTierBounds(total);
          if (completed >= tierBounds.practitioner.end) {
            currentTier = 'master';
          } else if (completed >= tierBounds.beginner.end) {
            currentTier = 'practitioner';
          }
        }

        return { completed, total, percentage, currentTier };
      },

      /**
       * Verifica se todos os desafios de um conceito foram completados
       */
      isAllCompleted: (plantType: string) => {
        const challenges = getChallengesByPlantType(plantType);
        const completed = get().completedByConceptOrdered[plantType] || [];
        return completed.length >= challenges.length;
      },

      /**
       * Retorna informações de posição para um desafio específico
       */
      getChallengePosition: (challengeId: string): NextChallengeInfo | null => {
        const challenge = getChallengeById(challengeId);
        if (!challenge) return null;

        const plantType = challenge.plantType;
        const challenges = getChallengesByPlantType(plantType);
        const sortedChallenges = [...challenges].sort((a, b) => a.difficulty - b.difficulty);
        const total = sortedChallenges.length;

        const index = sortedChallenges.findIndex(c => c.id === challengeId);
        if (index === -1) return null;

        const tierBounds = getTierBounds(total);
        const tier = calculateTier(index, total);
        const bounds = tierBounds[tier];
        const tierPosition = index - bounds.start + 1;
        const tierTotal = bounds.end - bounds.start;

        const completed = get().completedByConceptOrdered[plantType] || [];

        return {
          challengeId,
          challenge,
          position: index + 1,
          total,
          tier,
          tierPosition,
          tierTotal,
          isReview: completed.includes(challengeId),
          isFirstOfConcept: completed.length === 0,
        };
      },

      /**
       * Reseta o progresso de um conceito (para testes/debug)
       */
      resetConceptProgress: (plantType: string) => {
        set((state) => ({
          completedByConceptOrdered: {
            ...state.completedByConceptOrdered,
            [plantType]: [],
          },
        }));
      },
    }),
    {
      name: 'syntax-gardens-challenge-progression',
    }
  )
);

// Helper para obter o nome legível do tier
export function getTierDisplayName(tier: DifficultyTier): string {
  switch (tier) {
    case 'beginner':
      return 'Iniciante';
    case 'practitioner':
      return 'Praticante';
    case 'master':
      return 'Mestre';
  }
}

// Helper para obter a cor do tier
export function getTierColor(tier: DifficultyTier): string {
  switch (tier) {
    case 'beginner':
      return 'text-green-400';
    case 'practitioner':
      return 'text-blue-400';
    case 'master':
      return 'text-purple-400';
  }
}

// Helper para obter a cor de fundo do tier
export function getTierBgColor(tier: DifficultyTier): string {
  switch (tier) {
    case 'beginner':
      return 'bg-green-500/20 border-green-500/50';
    case 'practitioner':
      return 'bg-blue-500/20 border-blue-500/50';
    case 'master':
      return 'bg-purple-500/20 border-purple-500/50';
  }
}
