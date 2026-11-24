import { eq } from 'drizzle-orm';

import { db } from '#lib/server/db/index.ts';
import { user } from '#lib/server/db/schema.ts';

export default async function (email: string) {
	const [DB_DATA] = await db.select().from(user).where(eq(user.email, email)).limit(1);

	if (!DB_DATA) return DB_DATA;

	return {
		...DB_DATA,
		unlocked: JSON.parse(DB_DATA.unlocked ?? '[]') as string[]
	};
}
