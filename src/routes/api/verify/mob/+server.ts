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

export const POST = async ({ locals, request }) => {
  const session = await locals.auth()
  const data: Mob = await request.json();

  if (!session && !debug) return json({ "success": false, error: "not authenticated" })

  const dailyEntity: Mob = selectDailyEntity(minecraftEntities);

  const response = {
    mob: data.mob === dailyEntity.mob ? "slot_right" : "slot_wrong",
    release: compareReleaseVersion(data, dailyEntity.release),
    health: compareHealth(data, dailyEntity.health),
    height: compareHeight(data, dailyEntity.height),
    behavior: compareRegular(data.behavior, dailyEntity.behavior),
    spawn: compareRegular(data.spawn, dailyEntity.spawn),
    classification: compareRegular(data.classification, dailyEntity.classification),
  }

  return json({
    "success": true,
    "data": response
  })
};