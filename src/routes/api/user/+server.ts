import { json } from '@sveltejs/kit';

import getUser from '#lib/server/db/call/getUser.ts';

export const GET = async ({ locals }) => {
	const { user, session } = locals;

	if (!session || !user) return json({ success: false, error: 'not authenticated' });
	if (!user.email) return json({ success: false, error: 'not in debug mode' });

	const PREVIOUS_DATA = await getUser(user.email);

	if (!PREVIOUS_DATA) {
		return json({ success: false, error: 'no account in database' });
	}

	return json({
		success: true,
		data: PREVIOUS_DATA
	});
};
