import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from '$env/static/private';
import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

const libsql = createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN
});

const adapter = new PrismaLibSQL(libsql);

export default new PrismaClient({ adapter });
