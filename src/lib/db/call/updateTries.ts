import redis from '$lib/db/redis';

export default async function (email: string, tries: number): Promise<boolean> {
	// Calculate time until midnight
	const NOW = new Date();
	const TOMORROW = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + 1);

	// Calculate seconds until midnight
	const SECONDS_UNTIL_MIDNIGHT = Math.floor((TOMORROW.getTime() - NOW.getTime()) / 1000);

	const SET_CACHE = redis.setex(`tries.user.${email}`, SECONDS_UNTIL_MIDNIGHT, JSON.stringify(tries));
	if (!SET_CACHE) return false;
	return true;
}
