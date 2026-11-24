<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import SignIn from '$lib/components/SignIn.svelte';

	let user: any = $state();
	let leaderboard: any = $state();

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
		if ($page.data.session) {
			if (!$page.data.session.user?.email) {
				return;
			}

			getUser();
			getMaxStreakLeaderboard();
		}
	});
</script>

<main class="h-full w-full flex-grow">
	<Navigation pageTitle={'Home'} />

	{#if $page.data.session}
		<div class="flex h-full w-full flex-col content-center items-center justify-center">
			<h2 class="-mt-2 text-base text-neutral-700">Preview Version</h2>
			{#if leaderboard}
				<h1 class="mt-2 text-xl text-[#2d9b55]">Top 10 Max Streaks!</h1>
				<div class="rounded-lg bg-neutral-950 p-4">
					<table>
						<thead>
							<tr class="border-b border-neutral-700">
								<td class="w-16">Rank</td>
								<td>Username</td>
								<td>Max Streak</td>
							</tr>
						</thead>
						<tbody>
							{#each leaderboard as entry, i}
								<tr class="border-b border-neutral-800">
									<td>
										{#if i === 0}
											<b class="text-yellow-200">{i + 1}</b><span class="text-yellow-300">st</span>
										{:else if i === 1}
											<b class="text-neutral-200">{i + 1}</b><span class="text-neutral-300">nd</span
											>
										{:else if i === 2}
											<b class="text-orange-200">{i + 1}</b><span class="text-orange-300">rd</span>
										{:else}
											<span class="text-neutral-400">{i + 1}</span><span class="text-neutral-500"
												>th</span
											>
										{/if}
									</td>
									<td class:!text-neutral-500={i > 2} class="text-neutral-300">{entry.username}</td>
									<td
										class:text-neutral-500={i > 2}
										class:text-yellow-200={i == 0}
										class:text-neutral-200={i == 1}
										class:text-orange-200={i == 2}
										class="text-right">{entry.max_streak}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
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
