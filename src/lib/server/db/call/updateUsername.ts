import { eq } from 'drizzle-orm';

import { db } from '#lib/server/db/index.ts';
import { user } from '#lib/server/db/schema.ts';

export default async function (email: string, username: string): Promise<boolean> {
	await db.update(user).set({ username }).where(eq(user.email, email));

	return true;
}
