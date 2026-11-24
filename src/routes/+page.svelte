<script lang="ts">
	import { page } from '$app/state';
	import Navigation from '#lib/components/Navigation.svelte';
	import SignIn from '#lib/components/SignIn.svelte';

	let user: any = $state();
	let leaderboard: any = $state();

	const isCurrentUser = (entry: any) =>
		!!user?.data?.username && entry.username === user.data.username;

	const rankBadgeClass = (i: number) => {
		if (i === 0) return 'bg-yellow-500/15 text-yellow-200 ring-1 ring-inset ring-yellow-500/40';
		if (i === 1) return 'bg-neutral-400/15 text-neutral-100 ring-1 ring-inset ring-neutral-400/30';
		if (i === 2) return 'bg-orange-500/15 text-orange-200 ring-1 ring-inset ring-orange-500/40';
		return 'bg-neutral-900 text-neutral-500';
	};

	const rankValueClass = (i: number) => {
		if (i === 0) return 'text-yellow-200';
		if (i === 1) return 'text-neutral-100';
		if (i === 2) return 'text-orange-200';
		return 'text-neutral-400';
	};

	const getUser = async () => {
		try {
			const request = await fetch('/api/user', {
				method: 'GET'
			});

			if (!request.ok) {
				throw new Error(`Error: ${request.status} ${request.statusText}`);
			}

			const response = await request.json();

			user = response;

			return response;
		} catch (error) {
			console.error('Failed to fetch user data:', error);
			return null;
		}
	};

	const getMaxStreakLeaderboard = async () => {
		try {
			const request = await fetch('/api/leaderboard/max-streak', {
				method: 'GET'
			});

			if (!request.ok) {
				throw new Error(`Error: ${request.status} ${request.statusText}`);
			}

			const response = await request.json();

			leaderboard = response.data;

			return response;
		} catch (error) {
			console.error('Failed to fetch max streak leaderboard:', error);
			return null;
		}
	};

	$effect(() => {
		if (page.data.session) {
			if (!page.data.session.user?.email) {
				return;
			}

			getUser();
			getMaxStreakLeaderboard();
		}
	});
</script>

<main>
	<Navigation pageTitle={'Home'} />

	{#if page.data.session}
		<div class="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">
			<h2 class="-mt-2 text-base text-neutral-700">Preview Version</h2>
			{#if leaderboard}
				<div
					class="mt-4 w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl"
				>
					<div
						class="flex items-center gap-2 border-b border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 px-5 py-3"
					>
						<span class="h-2 w-2 rounded-full bg-[#36bf68]"></span>
						<h1 class="text-xs font-semibold uppercase tracking-[0.15em] text-[#36bf68]">
							Top 10 Max Streaks
						</h1>
					</div>

					{#if leaderboard.length === 0}
						<p class="px-5 py-6 text-center text-sm text-neutral-500">No streaks yet.</p>
					{:else}
						<table class="w-full border-collapse text-sm">
							<thead>
								<tr class="text-left text-[0.65rem] uppercase tracking-wider text-neutral-600">
									<th class="w-14 px-4 py-2 font-medium">#</th>
									<th class="px-2 py-2 font-medium">Player</th>
									<th class="px-4 py-2 text-right font-medium">Streak</th>
								</tr>
							</thead>
							<tbody>
								{#each leaderboard as entry, i}
									{@const me = isCurrentUser(entry)}
									<tr
										class="border-t border-neutral-900 transition-colors hover:bg-neutral-900/60 {me
											? 'bg-green-950/40'
											: ''}"
									>
										<td class="px-4 py-2.5">
											<span
												class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold {rankBadgeClass(
													i
												)}"
											>
												{i + 1}
											</span>
										</td>
										<td class="px-2 py-2.5 font-medium {i > 2 ? 'text-neutral-500' : 'text-neutral-200'}">
											{entry.username}
											{#if me}
												<span class="ml-1 text-xs font-normal text-[#36bf68]">you</span>
											{/if}
										</td>
										<td class="px-4 py-2.5 text-right font-bold tabular-nums {rankValueClass(i)}">
											{entry.max_streak}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{/if}
				</div>
			{/if}
			{#if user}
				<div class="mt-2 flex gap-2">
					<p class="text-neutral-500">
						Your best streak: <span class="font-bold">{user.data.max_streak}</span>
					</p>
					-
					<p class="text-neutral-500">
						Current streak: <span class="font-bold">{user.data.streak}</span>
					</p>
				</div>
				<p class="text-neutral-500">{user.data.email}</p>
			{/if}
			<a href="/settings" class="mt-2 text-base text-[#2d9b55] hover:underline"
				>Change username</a
			>
			<a
				href="/mob"
				class="4xl:w-32 mx-auto mt-4 flex h-12 w-28 items-center justify-center rounded-lg border border-[#36bf68] bg-[#2da05a] bg-gradient-to-t from-[#278c4c] to-[#36bf68] px-4 shadow-lg transition-transform hover:bg-[#36bf68]"
			>
				<p>Play</p>
			</a>
		</div>
	{:else}
		<SignIn />
	{/if}
</main>
