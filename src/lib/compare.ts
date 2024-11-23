/**
 * Compares the release version of a mob with a target version.
 * @param mob - The mob object with a `release` version.
 * @param targetVersion - The version to compare against.
 * @returns "Higher" if mob's release version is higher, "Lower" if it's lower, and "Equal" if they match.
 */

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