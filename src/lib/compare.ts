interface Entry {
    mob: string;
    release: string;
    health: number;
    height: number;
    behavior: string;
    spawn: string;
    classification: string;
    ressource: string;
}

/**
 * Compares the release version of a mob with a target version.
 * @param mob - The mob object with a `release` version.
 * @param targetVersion - The version to compare against.
 * @returns "Higher" if mob's release version is higher, "Lower" if it's lower, and "Equal" if they match.
 */
export function compareReleaseVersion(mob: Entry, targetVersion: string): "slot_right" | "slot_wrong_higher" | "slot_wrong_lower" {
    const mobVersionParts = mob.release.split('.').map(Number);
    const targetVersionParts = targetVersion.split('.').map(Number);

    const maxLength = Math.max(mobVersionParts.length, targetVersionParts.length);

    for (let i = 0; i < maxLength; i++) {
        const mobVersionPart = mobVersionParts[i] || 0; // Default to 0 if undefined
        const targetVersionPart = targetVersionParts[i] || 0; // Default to 0 if undefined

        if (mobVersionPart > targetVersionPart) return "slot_wrong_lower";
        if (mobVersionPart < targetVersionPart) return "slot_wrong_higher";
    }

    return "slot_right";
}

/**
 * Compares the health of a mob with a target health.
 * @param mob - The mob object with a `health` property.
 * @param targetHeight - The health to compare against.
 * @returns "slot_wrong_lower" if mob's health is greater, "slot_wrong_higher" if it's smaller, and "slot_right" if they match.
 */
export function compareHealth(mob: Entry, targetHealth: number): "slot_right" | "slot_wrong_higher" | "slot_wrong_lower" {
    if (mob.health > targetHealth) {
        return "slot_wrong_lower";
    } else if (mob.health < targetHealth) {
        return "slot_wrong_higher";
    } else {
        return "slot_right";
    }
}

/**
 * Compares the height of a mob with a target height.
 * @param mob - The mob object with a `height` property.
 * @param targetHeight - The height to compare against.
 * @returns "slot_wrong_lower" if mob's height is greater, "slot_wrong_higher" if it's smaller, and "slot_right" if they match.
 */
export function compareHeight(mob: Entry, targetHeight: number): "slot_right" | "slot_wrong_higher" | "slot_wrong_lower" {
    if (mob.height > targetHeight) {
        return "slot_wrong_lower";
    } else if (mob.height < targetHeight) {
        return "slot_wrong_higher";
    } else {
        return "slot_right";
    }
}

export function compareRegular(mobField: string | number, dailyField: string | number): "slot_right" | "slot_wrong" {   
    if (mobField === dailyField) {
        return "slot_right";
    } else {
        return "slot_wrong";
    }
}