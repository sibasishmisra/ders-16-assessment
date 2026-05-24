import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateScores } from '@/lib/scoring';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateName, candidateEmail, responses, timeTaken, startedAt } = body;

    if (!candidateName || !candidateEmail || !responses) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // JSON keys are always strings — coerce to numbers so responses[1] works
    const numericResponses: Record<number, number> = {};
    for (const [k, v] of Object.entries(responses)) {
      numericResponses[Number(k)] = Number(v);
    }

    // Validate all 16 responses are present and in range 1–5
    for (let i = 1; i <= 16; i++) {
      const val = numericResponses[i];
      if (!val || val < 1 || val > 5) {
        return NextResponse.json(
          { error: `Invalid or missing response for item ${i}` },
          { status: 400 }
        );
      }
    }

    const scores = calculateScores(numericResponses);

    const assessment = await prisma.assessment.create({
      data: {
        candidateName,
        candidateEmail,
        responses: JSON.stringify(numericResponses),
        totalScore:         scores.totalScore,
        clarityScore:       scores.clarityScore,
        goalsScore:         scores.goalsScore,
        impulseScore:       scores.impulseScore,
        strategiesScore:    scores.strategiesScore,
        nonAcceptanceScore: scores.nonAcceptanceScore,
        band:               scores.band,
        timeTaken,
        startedAt:   new Date(startedAt),
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      id:              assessment.id,
      totalScore:      scores.totalScore,
      clarityScore:    scores.clarityScore,
      goalsScore:      scores.goalsScore,
      impulseScore:    scores.impulseScore,
      strategiesScore: scores.strategiesScore,
      nonAcceptanceScore: scores.nonAcceptanceScore,
      band:            scores.band,
      bandDescription: scores.bandDescription,
      pctOfRange:      scores.pctOfRange,
      subscales:       scores.subscales,
      timeTaken,
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return NextResponse.json({ error: 'Failed to submit assessment' }, { status: 500 });
  }
}
