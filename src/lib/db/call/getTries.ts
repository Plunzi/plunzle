import redis from "$lib/db/redis";

export default async function (email: string): Promise<number> {
    const CACHED_TRIES = await redis.get(`tries.user.${email}`);

    if (CACHED_TRIES) {
        return JSON.parse(CACHED_TRIES);
    }

    // return 0 if cache is empty
    return 0;
}