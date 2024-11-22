import { signIn, signOut } from '@auth/sveltekit/client';

export async function oAuthGoogle() {
	await signIn('google');
}

export async function oAuthGitHub() {
	await signIn('github');
}

export async function oAuthDiscord() {
	await signIn('discord');
}

export async function oAuthMicrosoft() {
	await signIn('microsoft-entra-id');
}

export async function signOutAction() {
	await signOut();
}
