"use server"

import redis from "$lib/db/redis";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (email: string) {
    const CACHED_DATA = await redis.get(`data.user.${email}`);

    if (CACHED_DATA) {
        return JSON.parse(CACHED_DATA);
    }

	const DB_DATA = await prisma.user.findFirst({
		where: {
			email
		}
	});

    const CACHE_SECONDS = 60 * 60 * 24;
    redis.setex(`data.user.${email}`, CACHE_SECONDS, JSON.stringify(DB_DATA));

    return DB_DATA
}