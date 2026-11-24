'use server';

import prisma from '$lib/db/prisma';

export default async function () {
	const DB_DATA = await prisma.user.findMany({
		orderBy: {
			max_streak: 'desc'
		},
		select: { max_streak: true, username: true },
		take: 10
	});

	return DB_DATA;
}
