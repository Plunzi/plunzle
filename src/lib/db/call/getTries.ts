import prisma from "$lib/db/prisma";

function isToday(date: Date | null): boolean {
	if (!date) return false;

	const NOW = new Date();
	return (
		date.getFullYear() === NOW.getFullYear() &&
		date.getMonth() === NOW.getMonth() &&
		date.getDate() === NOW.getDate()
	);
}

export default async function (email: string): Promise<number> {
	const USER = await prisma.user.findFirst({
		where: { email },
		select: { daily_tries: true, daily_tries_date: true }
	});

	if (!USER || !isToday(USER.daily_tries_date)) return 0;

	return USER.daily_tries;
}
