export interface TestCase {
  input: unknown;
  expectedOutput: unknown;
  description: string;
}

// Níveis de dificuldade por conceito: Iniciante (30%), Praticante (50%), Mestre (20%)
export type DifficultyTier = 'beginner' | 'practitioner' | 'master';

export interface ChallengeDefinition {
  id: string;
  plantType: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  difficultyTier: DifficultyTier; // Classificação por nível: beginner, practitioner, master
  title: string;
  description: string;
  instructions?: string; // Instruções detalhadas (opcional, usa description como fallback)
  starterCode?: string;
  testCases: TestCase[];
  hints: string[];
  solution: string;
  experienceReward: number;
  conceptsUsed?: string[]; // Tags de conceitos usados (opcional)
}

// Progresso do jogador em um conceito específico
export interface ConceptProgress {
  conceptId: string;
  completedChallenges: string[];
  beginnerCompleted: number;
  beginnerTotal: number;
  practitionerCompleted: number;
  practitionerTotal: number;
  masterCompleted: number;
  masterTotal: number;
  badge: 'none' | 'bronze' | 'silver' | 'gold';
}

export interface ChallengeCompletion {
  challengeId: string;
  code: string;
  passedAt: Date;
  attempts: number;
}

export interface ValidationResult {
  success: boolean;
  passedTests: number;
  totalTests: number;
  errors: string[];
  output?: unknown;
}
