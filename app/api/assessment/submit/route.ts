import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateScores, getInterpretation } from '@/lib/scoring';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateName, candidateEmail, responses, timeTaken, startedAt } = body;

    // Calculate scores
    const scores = calculateScores(responses);
    const interpretation = getInterpretation(scores.totalScore);

    // Save to database
    const assessment = await prisma.assessment.create({
      data: {
        candidateName,
        candidateEmail,
        responses: JSON.stringify(responses),
        totalScore: scores.totalScore,
        awarenessScore: scores.awarenessScore,
        clarityScore: scores.clarityScore,
        goalsScore: scores.goalsScore,
        impulseScore: scores.impulseScore,
        strategiesScore: scores.strategiesScore,
        nonAcceptanceScore: scores.nonAcceptanceScore,
        timeTaken,
        startedAt: new Date(startedAt),
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      id: assessment.id,
      ...scores,
      interpretation,
      timeTaken,
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return NextResponse.json(
      { error: 'Failed to submit assessment' },
      { status: 500 }
    );
  }
}
