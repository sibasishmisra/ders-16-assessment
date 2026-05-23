import { questions, Question } from './questions';

export interface ScoreResult {
  totalScore: number;
  awarenessScore: number;
  clarityScore: number;
  goalsScore: number;
  impulseScore: number;
  strategiesScore: number;
  nonAcceptanceScore: number;
}

export function calculateScores(responses: Record<number, number>): ScoreResult {
  let totalScore = 0;
  const subscaleScores: Record<string, number> = {
    awareness: 0,
    clarity: 0,
    goals: 0,
    impulse: 0,
    strategies: 0,
    nonAcceptance: 0
  };

  questions.forEach((question: Question) => {
    const response = responses[question.id];
    if (response) {
      // Reverse scoring for reverse-coded items
      const score = question.reverse ? (6 - response) : response;
      totalScore += score;
      subscaleScores[question.subscale] += score;
    }
  });

  return {
    totalScore,
    awarenessScore: subscaleScores.awareness,
    clarityScore: subscaleScores.clarity,
    goalsScore: subscaleScores.goals,
    impulseScore: subscaleScores.impulse,
    strategiesScore: subscaleScores.strategies,
    nonAcceptanceScore: subscaleScores.nonAcceptance
  };
}

export function getInterpretation(totalScore: number): string {
  if (totalScore <= 32) {
    return "Low difficulty with emotion regulation";
  } else if (totalScore <= 48) {
    return "Moderate difficulty with emotion regulation";
  } else if (totalScore <= 64) {
    return "High difficulty with emotion regulation";
  } else {
    return "Very high difficulty with emotion regulation";
  }
}
