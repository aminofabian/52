import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId, startDate } = await request.json();

    // Create a new envelope challenge
    const challenge = await prisma.envelopeChallenge.create({
      data: {
        userId,
        startDate: new Date(startDate),
        endDate: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 364)), // 52 weeks
        envelopes: {
          create: Array.from({ length: 52 }, (_, i) => ({
            amount: (i + 1) * 100,
            isSelected: false,
          })),
        },
        envelopeStats: {
          create: {
            totalSaved: 0,
            remainingEnvelopes: 52,
            highestPicked: 0,
            lowestPicked: 0,
            averagePerWeek: 0,
          },
        },
      },
      include: {
        envelopes: true,
        envelopeStats: true,
      },
    });

    return NextResponse.json(challenge);
  } catch (error) {
    console.error('Error creating envelope challenge:', error);
    return NextResponse.json(
      { error: 'Failed to create envelope challenge' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const challenge = await prisma.envelopeChallenge.findFirst({
      where: {
        userId,
        status: 'IN_PROGRESS',
      },
      include: {
        envelopes: true,
        envelopeStats: true,
      },
    });

    return NextResponse.json(challenge);
  } catch (error) {
    console.error('Error fetching envelope challenge:', error);
    return NextResponse.json(
      { error: 'Failed to fetch envelope challenge' },
      { status: 500 }
    );
  }
} 