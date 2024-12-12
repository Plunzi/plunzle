import redis from "$lib/db/redis";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (email: string, found: number, unlocked: string[], streak: number, max_streak: number, last_found: Date, tries: number): Promise<boolean> {
    const DB_DATA = await prisma.user.update({
        data: {
            found,
            unlocked,
            streak,
            max_streak,
            last_found,
            tries
        },
        where: {
            email
        }
    });

    const CACHE_SECONDS = 60 * 60 * 24;
    redis.setex(`data.user.${email}`, CACHE_SECONDS, JSON.stringify(DB_DATA));

    return true;
}
