import {
	ORIGIN,
	BETTER_AUTH_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET
} from '$app/env/private';

import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { username } from 'better-auth/plugins/username';
import { getRequestEvent } from '$app/server';
import { db } from '#lib/server/db/index.ts';

export const auth = betterAuth({
	baseURL: ORIGIN,
	secret: BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'sqlite' }),
	emailAndPassword: { enabled: true },
	socialProviders: {
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		},
		discord: {
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET
		}
	},
	user: {
		additionalFields: {
			tries: { type: 'number', required: true, defaultValue: 0, input: false },
			found: { type: 'number', required: true, defaultValue: 0, input: false },
			streak: { type: 'number', required: true, defaultValue: 0, input: false },
			max_streak: { type: 'number', required: true, defaultValue: 0, input: false },
			last_found: { type: 'date', required: true, defaultValue: () => new Date(0), input: false },
			unlocked: { type: 'string', required: true, defaultValue: '[]', input: false },
			daily_tries: { type: 'number', required: true, defaultValue: 0, input: false },
			daily_tries_date: { type: 'date', required: false, input: false }
		}
	},
	plugins: [
		username({
			minUsernameLength: 3,
			maxUsernameLength: 30
		}),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
