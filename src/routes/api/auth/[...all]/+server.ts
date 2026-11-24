import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '#lib/server/auth.ts';

// Fallback for better-auth requests that don't reach the hook's origin-matched
// handler (e.g. a different host/port than ORIGIN).
export const GET: RequestHandler = ({ request }) => auth.handler(request);
export const POST: RequestHandler = ({ request }) => auth.handler(request);
