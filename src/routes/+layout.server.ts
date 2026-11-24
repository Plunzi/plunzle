import type { LayoutServerLoad } from './$types';
import getUser from '#lib/server/db/call/getUser.ts';

export const load: LayoutServerLoad = async (event) => {
	const { session: sessionData, user } = event.locals;

	const session = sessionData && user ? { ...sessionData, user } : null;

	// show the name the user chose instead of the one provided by the login provider
	if (session?.user?.email) {
		const profile = await getUser(session.user.email);

		if (profile?.username) {
			session.user.name = profile.username;
		}
	}

	return {
		session
	};
};
