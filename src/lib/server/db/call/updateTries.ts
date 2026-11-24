import { eq } from 'drizzle-orm';

import { db } from '#lib/server/db/index.ts';
import { user } from '#lib/server/db/schema.ts';

export default async function (email: string, tries: number): Promise<boolean> {
	await db
		.update(user)
		.set({
			daily_tries: tries,
			daily_tries_date: new Date()
		})
		.where(eq(user.email, email));

	return true;
}
