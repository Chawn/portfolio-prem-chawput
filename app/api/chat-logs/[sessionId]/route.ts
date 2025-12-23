import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ sessionId: string }> }
) {
	try {
		const { sessionId } = await params;

		const session = await prisma.chatSession.findUnique({
			where: { id: sessionId },
			include: {
				logs: {
					orderBy: {
						createdAt: 'asc',
					},
				},
			},
		});

		if (!session) {
			return NextResponse.json({ error: 'Session not found' }, { status: 404 });
		}

		return NextResponse.json(session);
	} catch (error) {
		console.error('Error fetching chat logs:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch logs' },
			{ status: 500 }
		);
	}
}
