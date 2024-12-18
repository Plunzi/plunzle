import { json } from '@sveltejs/kit';

import getUser from '$lib/db/call/getUser';
import getMaxStreakLeaderboard from '$lib/db/call/getMaxStreakLeaderboard.js';

export const GET = async ({ locals }) => {
    const LEADERBOARD_DATA = await getMaxStreakLeaderboard();

	if (!LEADERBOARD_DATA) {
		return json({ success: false, error: 'no leaderboard in database' });
	}

	return json({
		success: true,
		data: LEADERBOARD_DATA
	});
};
