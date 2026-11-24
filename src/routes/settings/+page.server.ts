import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

import updateUsername from '$lib/db/call/updateUsername';

const MAX_LENGTH = 16;
const NAME_PATTERN = /^[A-Za-z0-9 _.-]+$/;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const SESSION = await locals.auth();

		if (!SESSION?.user?.email) {
			return fail(401, { error: 'You must be signed in to change your name.' });
		}

		const DATA = await request.formData();
		const USERNAME = (DATA.get('username') ?? '').toString().trim();

		if (USERNAME.length === 0) {
			return fail(400, { error: 'Please enter a name.', username: USERNAME });
		}

		if (USERNAME.length > MAX_LENGTH) {
			return fail(400, {
				error: `Names can be at most ${MAX_LENGTH} characters.`,
				username: USERNAME
			});
		}

		if (!NAME_PATTERN.test(USERNAME)) {
			return fail(400, {
				error: 'Only letters, numbers, spaces and _ . - are allowed.',
				username: USERNAME
			});
		}

		await updateUsername(SESSION.user.email, USERNAME);

		return { success: true, username: USERNAME };
	}
};
