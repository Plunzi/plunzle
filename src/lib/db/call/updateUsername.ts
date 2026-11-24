import prisma from '$lib/db/prisma';

export default async function (email: string, username: string): Promise<boolean> {
	await prisma.user.update({
		data: {
			username
		},
		where: {
			email
		}
	});

	return true;
}
