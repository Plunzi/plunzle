import { json } from '@sveltejs/kit';

// Import your entities JSON (adjust path as needed)
import minecraftEntities from '#lib/assets/entries/Entities.json';
import type { PageServerLoad } from '../$types';

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

// Optional: If you want to create an API endpoint
export const GET = async () => {
  const dailyEntity = selectDailyEntity(minecraftEntities);
  
  return json(dailyEntity)
};