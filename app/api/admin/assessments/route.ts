import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const assessments = await prisma.assessment.findMany({
      orderBy: { completedAt: 'desc' },
      select: {
        id: true,
        candidateName: true,
        candidateEmail: true,
        totalScore: true,
        awarenessScore: true,
        clarityScore: true,
        goalsScore: true,
        impulseScore: true,
        strategiesScore: true,
        nonAcceptanceScore: true,
        timeTaken: true,
        completedAt: true,
      },
    });

    return NextResponse.json(assessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    );
  }
}
