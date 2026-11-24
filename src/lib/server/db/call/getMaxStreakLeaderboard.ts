import { desc } from 'drizzle-orm';

import { db } from '#lib/server/db/index.ts';
import { user } from '#lib/server/db/schema.ts';

export default async function () {
	return db
		.select({ username: user.username, max_streak: user.max_streak })
		.from(user)
		.orderBy(desc(user.max_streak))
		.limit(10);
}
