"use server"

import redis from "$lib/db/redis";
import { PrismaClient } from "@prisma/client";

export default async function () {
    const CACHED_DATA = await redis.get(`data.leaderboard.streak.max`);

    if (CACHED_DATA) {
        return JSON.parse(CACHED_DATA);
    }

    const prisma = new PrismaClient();

    const DB_DATA = await prisma.user.findMany({
        orderBy: {
            max_streak: 'desc',
        },
        take: 10,
    });

    	// Calculate time until midnight
	const NOW = new Date();
	const TOMORROW = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + 1);

	// Calculate seconds until midnight
	const SECONDS_UNTIL_MIDNIGHT = Math.floor((TOMORROW.getTime() - NOW.getTime()) / 1000);

    redis.setex(`data.leaderboard.streak.max`, SECONDS_UNTIL_MIDNIGHT, JSON.stringify(DB_DATA));

    return DB_DATA
}