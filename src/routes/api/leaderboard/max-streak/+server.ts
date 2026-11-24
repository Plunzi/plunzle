import { json } from '@sveltejs/kit';

import getMaxStreakLeaderboard from '#lib/server/db/call/getMaxStreakLeaderboard.ts';

export const GET = async () => {
    const LEADERBOARD_DATA = await getMaxStreakLeaderboard();

	if (!LEADERBOARD_DATA) {
		return json({ success: false, error: 'no leaderboard in database' });
	}

	return json({
		success: true,
		data: LEADERBOARD_DATA
	});
};
