"use server"

import prisma from "$lib/db/prisma";

export default async function (email: string) {
	const DB_DATA = await prisma.user.findFirst({
		where: {
			email
		}
	});

	if (!DB_DATA) return DB_DATA;

	return {
		...DB_DATA,
		unlocked: JSON.parse(DB_DATA.unlocked),
		provider: JSON.parse(DB_DATA.provider)
	};
}
