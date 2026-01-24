import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store para controlar quais tutoriais de conceito o jogador já viu.
 *
 * Cada conceito tem um tutorial introdutório que aparece antes do primeiro
 * desafio. Este store rastreia se o tutorial foi visto para não repetir.
 */

interface TutorialState {
  // Set de conceptIds que o jogador já viu o tutorial
  seenTutorials: string[];

  // Se o jogador optou por pular todos os tutoriais
  skipAllTutorials: boolean;

  // Ações
  hasSeenTutorial: (conceptId: string) => boolean;
  markTutorialSeen: (conceptId: string) => void;
  setSkipAllTutorials: (skip: boolean) => void;
  resetTutorials: () => void;
  getSeenTutorialCount: () => number;
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      seenTutorials: [],
      skipAllTutorials: false,

      /**
       * Verifica se o jogador já viu o tutorial de um conceito
       */
      hasSeenTutorial: (conceptId: string): boolean => {
        if (get().skipAllTutorials) return true;
        return get().seenTutorials.includes(conceptId);
      },

      /**
       * Marca um tutorial como visto
       */
      markTutorialSeen: (conceptId: string) => {
        set((state) => {
          if (state.seenTutorials.includes(conceptId)) {
            return state;
          }
          return {
            seenTutorials: [...state.seenTutorials, conceptId],
          };
        });
      },

      /**
       * Define se deve pular todos os tutoriais
       */
      setSkipAllTutorials: (skip: boolean) => {
        set({ skipAllTutorials: skip });
      },

      /**
       * Reseta todos os tutoriais (para debug/testes)
       */
      resetTutorials: () => {
        set({
          seenTutorials: [],
          skipAllTutorials: false,
        });
      },

      /**
       * Retorna quantos tutoriais foram vistos
       */
      getSeenTutorialCount: () => {
        return get().seenTutorials.length;
      },
    }),
    {
      name: 'syntax-gardens-tutorials',
    }
  )
);
