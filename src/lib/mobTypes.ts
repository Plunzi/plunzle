export interface Mob {
	mob: string;
	release: string;
	health: number;
	height: number;
	behavior: string[];
	spawn: string[];
	classification: string[];
	ressource: string;
}

export interface Guess {
	dailyMob: DailyMob;
	pickedMob: Entry;
}

interface DailyMob {
	release: 'slot_right' | 'slot_wrong_higher' | 'slot_wrong_lower';
	health: 'slot_right' | 'slot_wrong_higher' | 'slot_wrong_lower';
	height: 'slot_right' | 'slot_wrong_higher' | 'slot_wrong_lower';
	mob: 'slot_right' | 'slot_wrong';
	behavior: 'slot_right' | 'slot_wrong' | 'slot_kinda';
	spawn: 'slot_right' | 'slot_wrong' | 'slot_kinda';
	classification: 'slot_right' | 'slot_wrong' | 'slot_kinda';
}

export interface Entry {
	mob: string;
	release: string;
	health: number;
	height: number;
	behavior: string[];
	spawn: string[];
	classification: string[];
	ressource: string;
}