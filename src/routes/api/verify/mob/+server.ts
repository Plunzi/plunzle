import { json } from '@sveltejs/kit';

// Import your entities JSON (adjust path as needed)
import minecraftEntities from '$lib/assets/entries/Entities.json';
import { compareHealth, compareHeight, compareRegular, compareReleaseVersion } from '$lib/compare';

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

interface Mob {
  "mob": string
  "release": string
  "health": number
  "height": number
  "behavior": string
  "spawn": string
  "classification": string
  "ressource": string
}

interface Body {
  "mob": string
}

export const POST = async ({ locals, request }) => {
  const session = await locals.auth()
  const data: Body = await request.json();

  if (!session && !debug) return json({ "success": false, error: "not authenticated" })

  const selectedMob: Mob | undefined = minecraftEntities.find(entity => entity.mob === data.mob);

  if (!selectedMob) return json({ "success": false, error: "mob not found" })

  const dailyEntity: Mob = selectDailyEntity(minecraftEntities);

  const response = {
    mob: data.mob === dailyEntity.mob ? "slot_right" : "slot_wrong",
    release: compareReleaseVersion(selectedMob, dailyEntity.release),
    health: compareHealth(selectedMob, dailyEntity.health),
    height: compareHeight(selectedMob, dailyEntity.height),
    behavior: compareRegular(selectedMob.behavior, dailyEntity.behavior),
    spawn: compareRegular(selectedMob.spawn, dailyEntity.spawn),
    classification: compareRegular(selectedMob.classification, dailyEntity.classification),
  }

  return json({
    "success": true,
    "data": response
  })
};