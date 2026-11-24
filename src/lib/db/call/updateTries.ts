import prisma from '$lib/db/prisma';

export default async function (email: string, tries: number): Promise<boolean> {
	await prisma.user.update({
		data: {
			daily_tries: tries,
			daily_tries_date: new Date()
		},
		where: {
			email
		}
	});

	return true;
}
