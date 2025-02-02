import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const challengeId = searchParams.get('challengeId');

    if (!challengeId) {
      return NextResponse.json(
        { error: 'Challenge ID is required' },
        { status: 400 }
      );
    }

    const pickedEnvelopes = await prisma.envelope.findMany({
      where: {
        challengeId,
        isSelected: true,
      },
      orderBy: {
        selectedAt: 'desc',
      },
    });

    const statistics = await prisma.envelopeStatistics.findUnique({
      where: { challengeId },
    });

    return NextResponse.json({
      envelopes: pickedEnvelopes,
      statistics,
    });
  } catch (error) {
    console.error('Error fetching envelope history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch envelope history' },
      { status: 500 }
    );
  }
} 