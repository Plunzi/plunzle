import { authClient } from '#lib/auth-client.ts';

export async function oAuthGitHub() {
	await authClient.signIn.social({ provider: 'github', callbackURL: '/' });
}

export async function oAuthDiscord() {
	await authClient.signIn.social({ provider: 'discord', callbackURL: '/' });
}

/**
 * Username/password sign-in. Returns the error (or `null` on success) so the
 * caller can surface validation problems in the UI.
 */
export async function signInWithUsername(username: string, password: string) {
	const { error } = await authClient.signIn.username({
		username,
		password,
		callbackURL: '/'
	});
	return error;
}

/**
 * Username/password sign-up. Better Auth requires a unique email per account,
 * so username-only accounts get a placeholder address derived from the (unique)
 * username.
 */
export async function signUpWithUsername(username: string, password: string) {
	const { error } = await authClient.signUp.email({
		email: `${username.toLowerCase()}@plunzle.local`,
		name: username,
		username,
		password,
		callbackURL: '/'
	});
	return error;
}

export async function signOutAction() {
	await authClient.signOut();
}
