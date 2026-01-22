export interface TestCase {
  input: unknown;
  expectedOutput: unknown;
  description: string;
}

export interface ChallengeDefinition {
  id: string;
  plantType: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  title: string;
  description: string;
  instructions: string;
  starterCode?: string;
  testCases: TestCase[];
  hints: string[];
  solution: string;
  experienceReward: number;
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
