import { json } from '@sveltejs/kit';

// Import your entities JSON (adjust path as needed)
import minecraftEntities from '$lib/assets/entries/Entities.json';
import {
	compareArrays,
	compareHealth,
	compareHeight,
	compareReleaseVersion
} from '$lib/compare';
import { PrismaClient } from '@prisma/client';
import type { Guess, Mob } from '$lib/mobTypes';
import getUser from '$lib/db/call/getUser';
import getTries from '$lib/db/call/getTries.js';
import updateTries from '$lib/db/call/updateTries';
import updateUser from '$lib/db/call/updateUser.js';

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

function updateFound(found: number): number {
	return found + 1;
}

function isToday(date: Date): boolean {
	const TODAY = new Date();
	const DATE = new Date(date);
	return (
		DATE.getFullYear() === TODAY.getFullYear() &&
		DATE.getMonth() === TODAY.getMonth() &&
		DATE.getDate() === TODAY.getDate()
	);
}

export const POST = async ({ locals, request }) => {
	const SESSION = await locals.auth();
	const DATA: Body = await request.json();

	if (!SESSION) return json({ success: false, error: 'not authenticated' });
	if (!SESSION.user?.email) return json({ success: false, error: 'not in debug mode' });
	if (debug) return json({ success: false, error: 'not in debug mode' });

	const SELECTED_MOB: Mob | undefined = minecraftEntities.find((entity) => entity.mob === DATA.mob);

	if (!SELECTED_MOB) return json({ success: false, error: 'mob not found' });

	const PREVIOUS_DATA = await getUser(SESSION.user.email);

	if (!PREVIOUS_DATA) {
		return json({ success: false, error: 'no account in database' });
	}

	if (isToday(PREVIOUS_DATA.last_found)) {
		return json({ success: false, error: 'You have already done your daily plunzle' });
	}

	const DAILY_ENTRY: Mob = selectDailyEntity(minecraftEntities);

	const response = {
		mob: DATA.mob === DAILY_ENTRY.mob ? 'slot_right' : 'slot_wrong',
		release: compareReleaseVersion(SELECTED_MOB, DAILY_ENTRY.release),
		health: compareHealth(SELECTED_MOB, DAILY_ENTRY.health),
		height: compareHeight(SELECTED_MOB, DAILY_ENTRY.height),
		behavior: compareArrays(SELECTED_MOB.behavior, DAILY_ENTRY.behavior),
		spawn: compareArrays(SELECTED_MOB.spawn, DAILY_ENTRY.spawn),
		classification: compareArrays(SELECTED_MOB.classification, DAILY_ENTRY.classification)
	};

	// const DAILY_MOB_GUESSES: Guess[] = [
	// 	{
	// 		dailyMob: response,
	// 		pickedMob: selectedMob,
	// 	},
	// 	...JSON.parse(PREVIOUS_DATA.daily_mob_guesses),
	// ];

	const TRIES = await getTries(SESSION.user.email);

    await updateTries(SESSION.user.email, TRIES + 1);

    // guessed correctly
	if (DATA.mob === DAILY_ENTRY.mob) {
        const FINAL_TRIES = PREVIOUS_DATA.tries + await getTries(SESSION.user.email);

		const UNLOCKED = updateUnlocked(PREVIOUS_DATA.unlocked, DAILY_ENTRY.mob);
		const { STREAK, MAX_STREAK, LAST_FOUND } = updateStreak(
			PREVIOUS_DATA.streak,
			PREVIOUS_DATA.max_streak,
			PREVIOUS_DATA.last_found
		);
		const FOUND = updateFound(PREVIOUS_DATA.found);

		await updateUser(SESSION.user.email, FOUND, UNLOCKED, STREAK, MAX_STREAK, LAST_FOUND, FINAL_TRIES);

        return json({
            success: true,
            data: response
        });
	}

	return json({
		success: true,
		data: response
	});
};
