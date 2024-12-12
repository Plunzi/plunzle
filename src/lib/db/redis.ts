import Redis from 'ioredis';

const getRedisUrl = () => {
    if (process.env.REDIS_USER && process.env.REDIS_HOST && process.env.REDIS_PORT) {
        return `rediss://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
    }

    /*
    redis://    <-   not encrypted
    rediss://   <-   encrypted
    */

    throw new Error("REDIS_URL not found");   
}

export default new Redis(getRedisUrl());