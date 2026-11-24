import { eq } from 'drizzle-orm';

import { db } from '#lib/server/db/index.ts';
import { user } from '#lib/server/db/schema.ts';

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
	const [DB_DATA] = await db
		.select({ daily_tries: user.daily_tries, daily_tries_date: user.daily_tries_date })
		.from(user)
		.where(eq(user.email, email))
		.limit(1);

	if (!DB_DATA || !isToday(DB_DATA.daily_tries_date)) return 0;

	return DB_DATA.daily_tries ?? 0;
}
