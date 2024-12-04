import { json } from '@sveltejs/kit';

// Import your entities JSON (adjust path as needed)
import minecraftEntities from '$lib/assets/entries/Entities.json';
import {
	compareArrays,
	compareHealth,
	compareHeight,
	compareRegular,
	compareReleaseVersion
} from '$lib/compare';
import { PrismaClient } from '@prisma/client';
import type { Guess, Mob } from '$lib/mobTypes';

const prisma = new PrismaClient();

function selectDailyEntity(entities: any[]) {
	// Create a seed based on the current date
	const today = new Date();
	const dayOfYear = Math.floor(
		(today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
	);

	// Use modulo to cycle through entities
	const dailyIndex = dayOfYear % entities.length;
	return entities[dailyIndex];
}

const debug = false;

interface Body {
	mob: string;
}

function updateUnlocked(unlocked: string[], mob: string): string[] {
	if (!unlocked.includes(mob)) {
		unlocked.push(mob);
	}
	return unlocked;
}

function updateStreak(
	streak: number,
	max_streak: number,
	last_found: Date
): { STREAK: number; MAX_STREAK: number; LAST_FOUND: Date } {
	const now = new Date();
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
	const endOfYesterday = new Date(startOfToday.getTime() - 1);

	const wasYesterday = last_found >= startOfYesterday && last_found <= endOfYesterday;

	if (wasYesterday) {
		streak++;
	} else {
		// Reset streak to 1 if last_found was not yesterday
		streak = 1;
	}

	if (streak > max_streak) {
		max_streak = streak;
	}

	last_found = now;

	return { STREAK: streak, MAX_STREAK: max_streak, LAST_FOUND: last_found };
}

function updateTries(tries: number): number {
	return tries + 1;
}

function updateFound(found: number): number {
	return found + 1;
}

function isToday(date: Date): boolean {
	const today = new Date();
	return (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	);
}

export const POST = async ({ locals, request }) => {
	const session = await locals.auth();
	const data: Body = await request.json();

	if (!session) return json({ success: false, error: 'not authenticated' });
	if (!session.user?.email) return json({ success: false, error: 'not in debug mode' });
	if (debug) return json({ success: false, error: 'not in debug mode' });

	const selectedMob: Mob | undefined = minecraftEntities.find((entity) => entity.mob === data.mob);

	if (!selectedMob) return json({ success: false, error: 'mob not found' });

	const PREVIOUS_DATA = await prisma.user.findFirst({
		where: {
			email: session.user.email
		}
	});

	if (!PREVIOUS_DATA) {
		return json({ success: false, error: 'no account in database' });
	}

	if (isToday(PREVIOUS_DATA.last_found)) {
		return json({ success: false, error: 'You have already done your daily plunzle' });
	}

	const dailyEntity: Mob = selectDailyEntity(minecraftEntities);

	const response = {
		mob: data.mob === dailyEntity.mob ? 'slot_right' : 'slot_wrong',
		release: compareReleaseVersion(selectedMob, dailyEntity.release),
		health: compareHealth(selectedMob, dailyEntity.health),
		height: compareHeight(selectedMob, dailyEntity.height),
		behavior: compareArrays(selectedMob.behavior, dailyEntity.behavior),
		spawn: compareArrays(selectedMob.spawn, dailyEntity.spawn),
		classification: compareArrays(selectedMob.classification, dailyEntity.classification)
	};

	const DAILY_MOB_GUESSES: Guess[] = [
		{
			dailyMob: response,
			pickedMob: selectedMob,
		},
		...JSON.parse(PREVIOUS_DATA.daily_mob_guesses),
	];

	const TRIES = updateTries(PREVIOUS_DATA?.tries);

	if (data.mob === dailyEntity.mob) {
		const UNLOCKED = updateUnlocked(PREVIOUS_DATA.unlocked, dailyEntity.mob);
		const { STREAK, MAX_STREAK, LAST_FOUND } = updateStreak(
			PREVIOUS_DATA.streak,
			PREVIOUS_DATA.max_streak,
			PREVIOUS_DATA.last_found
		);
		const FOUND = updateFound(PREVIOUS_DATA.found);

		await prisma.user.update({
			data: {
				found: FOUND,
				unlocked: UNLOCKED,
				streak: STREAK,
				max_streak: MAX_STREAK,
				last_found: LAST_FOUND
			},
			where: {
				email: session.user.email
			}
		});
	}

	await prisma.user.update({
		data: {
			tries: TRIES,
			// my code cannot currently handle storing mob guesses
			// daily_mob_guesses: JSON.stringify(DAILY_MOB_GUESSES)
		},
		where: {
			email: session.user.email
		}
	});

	return json({
		success: true,
		data: response
	});
};
