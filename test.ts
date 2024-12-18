import getUser from './src/lib/db/call/getUser';
import updateUser from './src/lib/db/call/updateUser';
import getTries from './src/lib/db/call/getTries';

function updateUnlocked(unlocked: string[], mob: string): string[] {
	if (!unlocked.includes(mob)) {
		unlocked.push(mob);
	}
	return unlocked;
}

function isYesterday(date: Date): boolean {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const yesterdayStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0);
  
  const yesterdayEnd = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);
  
  return date >= yesterdayStart && date <= yesterdayEnd;
}

function updateStreak(
	streak: number,
	max_streak: number,
	last_found: Date
): { STREAK: number; MAX_STREAK: number; LAST_FOUND: Date } {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	const isOneDayAgo = isYesterday(last_found)

	if (isOneDayAgo) {
		streak++;
	} else {
		streak = 1;
	}

	if (streak > max_streak) {
		max_streak = streak;
	}

	last_found = today;

	return { STREAK: streak, MAX_STREAK: max_streak, LAST_FOUND: last_found };
}

const last_found = new Date('2024-12-17');

const PREVIOUS_DATA = {
	unlocked: ['Horse', 'Ocelot'],
	streak: 17,
	max_streak: 17,
	last_found: last_found,
	tries: 1
};

console.log(PREVIOUS_DATA.last_found);

const UNLOCKED = PREVIOUS_DATA.unlocked;

console.log(UNLOCKED);

const { STREAK, MAX_STREAK, LAST_FOUND } = updateStreak(
	PREVIOUS_DATA.streak,
	PREVIOUS_DATA.max_streak,
	PREVIOUS_DATA.last_found
);

console.log(PREVIOUS_DATA.streak, PREVIOUS_DATA.max_streak, PREVIOUS_DATA.last_found);
console.log(STREAK, MAX_STREAK, LAST_FOUND);

// const FOUND = updateFound(PREVIOUS_DATA.found);

// await updateUser(
// 	'lukas.weiss-moser@outlook.com',
// 	FOUND,
// 	UNLOCKED,
// 	STREAK,
// 	MAX_STREAK,
// 	LAST_FOUND,
// 	FINAL_TRIES
// );
