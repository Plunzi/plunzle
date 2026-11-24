import { eq } from 'drizzle-orm';

import { db } from '#lib/server/db/index.ts';
import { user } from '#lib/server/db/schema.ts';

export default async function (
	email: string,
	found: number,
	unlocked: string[],
	streak: number,
	max_streak: number,
	last_found: Date,
	tries: number
): Promise<boolean> {
	const LAST_FOUND = new Date(
		`${last_found.getFullYear()}-${last_found.getMonth() + 1}-${last_found.getDate()}`
	);

	await db
		.update(user)
		.set({
			found,
			unlocked: JSON.stringify(unlocked),
			streak,
			max_streak,
			last_found: LAST_FOUND,
			tries
		})
		.where(eq(user.email, email));

	return true;
}
