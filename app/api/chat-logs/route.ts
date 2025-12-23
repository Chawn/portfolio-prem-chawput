import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const sessions = await prisma.chatSession.findMany({
			where: {
				logs: {
					some: {},
				},
			},
			include: {
				_count: {
					select: { logs: true },
				},
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});

		return NextResponse.json(sessions);
	} catch (error) {
		console.error('Error fetching chat sessions:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch sessions' },
			{ status: 500 }
		);
	}
}
