import {
	AUTH_DISCORD_ID,
	AUTH_DISCORD_SECRET,
	AUTH_GITHUB_ID,
	AUTH_GITHUB_SECRET,
	AUTH_GOOGLE_ID,
	AUTH_GOOGLE_SECRET,
	AUTH_MICROSOFT_ENTRA_ID_ID,
	AUTH_MICROSOFT_ENTRA_ID_ISSUER,
	AUTH_MICROSOFT_ENTRA_ID_SECRET,
	AUTH_SECRET
} from '$env/static/private';
import Discord from '@auth/core/providers/discord';
import Google from '@auth/core/providers/google';
import MicrosoftEntraID from '@auth/core/providers/microsoft-entra-id';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

import prisma from '$lib/db/prisma';

import type { Profile, User, Account } from '@auth/core/types';

interface CallBacks {
	profile: Profile;
	user: User;
	account: Account;
}

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	const authOptions = {
		providers: [
			GitHub({
				clientId: AUTH_GITHUB_ID,
				clientSecret: AUTH_GITHUB_SECRET
			}),
			Google({
				clientId: AUTH_GOOGLE_ID,
				clientSecret: AUTH_GOOGLE_SECRET
			}),
			Discord({
				clientId: AUTH_DISCORD_ID,
				clientSecret: AUTH_DISCORD_SECRET
			}),
			MicrosoftEntraID({
				clientId: AUTH_MICROSOFT_ENTRA_ID_ID,
				clientSecret: AUTH_MICROSOFT_ENTRA_ID_SECRET,
				issuer: AUTH_MICROSOFT_ENTRA_ID_ISSUER
			})
		],

		// {
		//   id: '461865555725516800',
		//   username: 'plunzi',
		//   avatar: 'd6c5a71a1a9f3653b1cdd5d5838f0fd4',
		//   discriminator: '0',
		//   public_flags: 256,
		//   flags: 256,
		//   banner: '07636efc5db88240b5550500ef5c58a7',
		//   accent_color: null,
		//   global_name: 'Lukas',
		//   avatar_decoration_data: null,
		//   banner_color: null,
		//   clan: null,
		//   primary_guild: null,
		//   mfa_enabled: true,
		//   locale: 'de',
		//   premium_type: 2,
		//   email: 'moser.weiss@aon.at',
		//   verified: true,
		//   image_url: 'https://cdn.discordapp.com/avatars/461865555725516800/d6c5a71a1a9f3653b1cdd5d5838f0fd4.png'
		// }

		callbacks: {
			// async signIn({ profile, user, account }: { profile: Profile; user: User; account: Account }) {
			async signIn({ profile, user, account }: any) {
				if (!user.email || !user.name) {
				  return false;
				}

        // TODO: get the login provider => account.provider
        // makes it possible for only allowing certain login providers for account

				const prismaUser = await prisma.user.findFirst({
				  where: {
				    email: user.email
				  }
				})

				if (!prismaUser) {
				  const createPrismaUser = await prisma.user.create({
				    data: {
				      email: user.email,
				      username: user.name,
				      last_found: new Date(0),
				      roles: {
				        connect: [{ id: 1 }]
				      }
				    }
				  })
				}

				// console.log('Profile:', profile);
				// console.log('User:', user);
				// console.log('Account:', account);

				return true;
			}
		},
		secret: AUTH_SECRET,
		trustHost: true
	};
	return authOptions;
});
