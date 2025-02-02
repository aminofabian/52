import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { challengeId } = await request.json();

    // Get all unselected envelopes
    const availableEnvelopes = await prisma.envelope.findMany({
      where: {
        challengeId,
        isSelected: false,
      },
    });

    if (availableEnvelopes.length === 0) {
      return NextResponse.json(
        { error: 'No more envelopes available' },
        { status: 400 }
      );
    }

    // Pick a random envelope
    const randomIndex = Math.floor(Math.random() * availableEnvelopes.length);
    const selectedEnvelope = availableEnvelopes[randomIndex];

    // Update the envelope as selected
    const updatedEnvelope = await prisma.envelope.update({
      where: { id: selectedEnvelope.id },
      data: {
        isSelected: true,
        selectedAt: new Date(),
      },
    });

    // Update statistics
    const stats = await prisma.envelopeStatistics.findUnique({
      where: { challengeId },
    });

    let newRemainingEnvelopes = 0;
    if (stats) {
      const newTotalSaved = stats.totalSaved + selectedEnvelope.amount;
      newRemainingEnvelopes = stats.remainingEnvelopes - 1;
      const completedCount = 52 - newRemainingEnvelopes;

      await prisma.envelopeStatistics.update({
        where: { challengeId },
        data: {
          totalSaved: newTotalSaved,
          remainingEnvelopes: newRemainingEnvelopes,
          highestPicked: Math.max(stats.highestPicked, selectedEnvelope.amount),
          lowestPicked: stats.lowestPicked === 0 
            ? selectedEnvelope.amount 
            : Math.min(stats.lowestPicked, selectedEnvelope.amount),
          averagePerWeek: newTotalSaved / completedCount,
          lastPickedAmount: selectedEnvelope.amount,
          lastPickedAt: new Date(),
        },
      });
    }

    // Check if challenge is completed
    if (newRemainingEnvelopes === 0) {
      await prisma.envelopeChallenge.update({
        where: { id: challengeId },
        data: { status: 'COMPLETED' },
      });
    }

    return NextResponse.json(updatedEnvelope);
  } catch (error) {
    console.error('Error picking envelope:', error);
    return NextResponse.json(
      { error: 'Failed to pick envelope' },
      { status: 500 }
    );
  }
} 