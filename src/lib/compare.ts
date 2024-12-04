interface Entry {
	mob: string;
	release: string;
	health: number;
	height: number;
	behavior: string[];
	spawn: string[];
	classification: string[];
	ressource: string;
}

/**
 * Compares the release version of a mob with a target version.
 * @param mob - The mob object with a `release` version.
 * @param targetVersion - The version to compare against.
 * @returns "Higher" if mob's release version is higher, "Lower" if it's lower, and "Equal" if they match.
 */
export function compareReleaseVersion(
    mob: Entry,
    targetVersion: string
): 'slot_right' | 'slot_wrong_higher' | 'slot_wrong_lower' {
    // Define version type precedence
    const versionTypeOrder = ['alpha', 'beta', 'release'];

    // Parse version with type extraction
    const parseVersion = (version: string) => {
        const alphaMatch = version.match(/^(alpha|beta)\s*([\d.]+)/i);
        const standardMatch = version.match(/^([\d.]+)/);

        if (alphaMatch) {
            return {
                type: alphaMatch[1].toLowerCase(),
                number: alphaMatch[2].split('.').map(Number)
            };
        }

        if (standardMatch) {
            return {
                type: 'release',
                number: standardMatch[1].split('.').map(Number)
            };
        }

        return { type: 'unknown', number: [0] };
    };

    // Parse both versions
    const mobParsedVersion = parseVersion(mob.release);
    const targetParsedVersion = parseVersion(targetVersion);

    // First, compare by version type
    const typeOrderDiff = 
        versionTypeOrder.indexOf(mobParsedVersion.type) - 
        versionTypeOrder.indexOf(targetParsedVersion.type);
    
    if (typeOrderDiff > 0) return 'slot_wrong_lower';
    if (typeOrderDiff < 0) return 'slot_wrong_higher';

    // Then, compare by version number
    const maxLength = Math.max(mobParsedVersion.number.length, targetParsedVersion.number.length);

    for (let i = 0; i < maxLength; i++) {
        const mobVersionPart = mobParsedVersion.number[i] || 0;
        const targetVersionPart = targetParsedVersion.number[i] || 0;

        if (mobVersionPart > targetVersionPart) return 'slot_wrong_lower';
        if (mobVersionPart < targetVersionPart) return 'slot_wrong_higher';
    }

    return 'slot_right';
}

/**
 * Compares the health of a mob with a target health.
 * @param mob - The mob object with a `health` property.
 * @param targetHeight - The health to compare against.
 * @returns "slot_wrong_lower" if mob's health is greater, "slot_wrong_higher" if it's smaller, and "slot_right" if they match.
 */
export function compareHealth(
	mob: Entry,
	targetHealth: number
): 'slot_right' | 'slot_wrong_higher' | 'slot_wrong_lower' {
	if (mob.health > targetHealth) {
		return 'slot_wrong_lower';
	} else if (mob.health < targetHealth) {
		return 'slot_wrong_higher';
	} else {
		return 'slot_right';
	}
}

/**
 * Compares the height of a mob with a target height.
 * @param mob - The mob object with a `height` property.
 * @param targetHeight - The height to compare against.
 * @returns "slot_wrong_lower" if mob's height is greater, "slot_wrong_higher" if it's smaller, and "slot_right" if they match.
 */
export function compareHeight(
	mob: Entry,
	targetHeight: number
): 'slot_right' | 'slot_wrong_higher' | 'slot_wrong_lower' {
	if (mob.height > targetHeight) {
		return 'slot_wrong_lower';
	} else if (mob.height < targetHeight) {
		return 'slot_wrong_higher';
	} else {
		return 'slot_right';
	}
}

export function compareRegular(
	mobField: string | number,
	dailyField: string | number
): 'slot_right' | 'slot_wrong' {
	if (mobField === dailyField) {
		return 'slot_right';
	} else {
		return 'slot_wrong';
	}
}

export function compareArrays(arr1: string[], arr2: string[]): 'slot_right' | 'slot_kinda' | 'slot_wrong' {
	// Check if arrays are identical
	if (arr1.length === arr2.length && arr1.every((item) => arr2.includes(item))) {
		return 'slot_right';
	}

	// Check if arrays have common elements
	const commonElements = arr1.filter((item) => arr2.includes(item));

	return commonElements.length > 0 ? 'slot_kinda' : 'slot_wrong';
}
