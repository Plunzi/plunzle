import { json } from '@sveltejs/kit';

import getUser from '$lib/db/call/getUser';

export const GET = async ({ locals }) => {
	const SESSION = await locals.auth();

	console.log(SESSION);

	if (!SESSION) return json({ success: false, error: 'not authenticated' });
	if (!SESSION.user?.email) return json({ success: false, error: 'not in debug mode' });

    const PREVIOUS_DATA = await getUser(SESSION.user.email);

	if (!PREVIOUS_DATA) {
		return json({ success: false, error: 'no account in database' });
	}

	return json({
		success: true,
		data: PREVIOUS_DATA
	});
};
