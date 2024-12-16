<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import SignIn from '$lib/components/SignIn.svelte';

	let user: any = $state();

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

	$effect(() => {
		if ($page.data.session) {
			if (!$page.data.session.user?.email) {
				return;
			}

			getUser();
		}
	});
</script>

<main class="h-full w-full flex-grow">
	<Navigation pageTitle={'Home'} />

	{#if $page.data.session}
		<div class="flex h-full w-full flex-col content-center items-center justify-center">
			{#if user}
				<h1 class="text-xl text-[#2d9b55]">Hello <span class="font-extrabold">{user.data.username}</span>!</h1>
				<h1 class="text-base text-neutral-500 -mt-2">Preview Version</h1>
				<!-- {JSON.stringify(user)} -->
				<div class="flex gap-2 mt-2">
					<p class="text-neutral-500">Your best streak: <span class="font-bold">{user.data.max_streak}</span></p>
					-
					<p class="text-neutral-500">Current streak: <span class="font-bold">{user.data.streak}</span></p>
				</div>
				<p class="text-neutral-500">{user.data.email}</p>
				
				<!-- <p class="text-neutral-500 mt-2">All unlocked mobs:</p>
				<div class="flex gap-1">
					{#each user.data.unlocked as mob}
					<p class="text-neutral-500 text-sm">{mob}</p>
				{/each}
				</div> -->
			{/if}
			<a
				href="/mob"
				class="4xl:w-32 mt-4 mx-auto flex h-12 w-28 items-center justify-center rounded-lg border border-[#36bf68] bg-[#2da05a] bg-gradient-to-t from-[#278c4c] to-[#36bf68] px-4 shadow-lg transition-transform hover:bg-[#36bf68]"
			>
				<p>Play</p>
			</a>
		</div>
	{:else}
		<SignIn />
	{/if}
</main>
