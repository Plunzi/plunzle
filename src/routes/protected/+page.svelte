<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';

	import jsonEntries from '$lib/assets/entries/Entities.json';
	import SearchMob from '$lib/components/SearchMob.svelte';
	import Guesses from '$lib/components/Guesses.svelte';
	import { onMount } from 'svelte';

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

	let entities: Entry[] = $state(jsonEntries);

	// Bee
	const selected = {
		mob: 'Iron Golem',
		release: '1.2.1',
		health: 100,
		height: 2.7,
		behavior: 'Neutral Passive',
		spawn: 'Structure Summon',
		classification: 'Golem',
		ressource: '/iron_golem.png'
	};

	// const selected = {
	// 	mob: 'Enderman',
	// 	release: 'Beta 1.8',
	// 	health: 40,
	// 	height: 2.9,
	// 	behavior: 'Neutral',
	// 	spawn: 'Light level Biome',
	// 	classification: 'None',
	// 	ressource: '/enderman.png'
	// };

	let searchTerm = $state('');
	let sortField = $state<keyof Entry>('mob');
	let sortDirection = $state('asc');
	let finished = $state(false);
	let mode = $state('search');
	let date = new Date();

	let filteredMobs: Entry[] = $derived.by(() => {
		let filtered = entities.filter(
			(mob) =>
				mob.mob.toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.behavior.toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.classification.toLowerCase().includes(searchTerm.toLowerCase())
		);

		return filtered.sort((a, b) => {
			let aValue = a[sortField];
			let bValue = b[sortField];

			// Handle numeric fields
			if (typeof aValue === 'number' && typeof bValue === 'number') {
				return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
			}

			// Handle string fields
			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return sortDirection === 'asc'
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}

			return 0; // Fallback return if types don't match
		});
	});

	const entryFields = [
		'mob',
		'release',
		'health',
		'height',
		'behavior',
		'spawn',
		'classification'
	] as const;

	let guesses: Entry[] = $state([]);

	onMount(() => {
		document.getElementById('searchTerm')!.focus();
	});
</script>

<div class="h-full w-full flex-grow">
	<Navigation pageTitle={'Home'} />

	<main
		class="flex h-full bg-cover bg-center bg-no-repeat pt-8"
		style="background-image: url('/blue-night-sky.webp');"
	>
		{#if !finished}
			<div class="relative ml-auto">
				<div class="relative flex h-fit w-[61rem] min-w-[61rem] px-8">
					<button
						aria-label="search"
						class="contens absolute rounded-l-lg border-r border-neutral-800 bg-neutral-900 text-neutral-500 hover:bg-[#278c4c] hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							fill="currentColor"
							viewBox="0 0 256 256"
							class="h-10 w-11 fill-[currentcolor] p-2 px-2.5"
							data-darkreader-inline-fill=""
							style="--darkreader-inline-fill: currentColor;"
							><rect width="256" height="256" fill="none"></rect><path
								d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
							></path></svg
						>
					</button>

					<input
						id="searchTerm"
						bind:value={searchTerm}
						name="quick-overall-search"
						placeholder="Search ..."
						class="mr-4 w-full rounded-lg bg-[#161616] px-3 py-2 pl-14 text-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
					/>
					<button
						aria-label="filter"
						class="contens rounded-l-lg border-r border-neutral-800 bg-neutral-900 text-neutral-500 hover:bg-[#278c4c] hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-10 w-11 fill-[currentcolor] p-2 px-2.5"
							width="32"
							height="32"
							fill="currentColor"
							viewBox="0 0 256 256"
							><path
								d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm106.18,74.58A8,8,0,0,0,144,136v58.66L112,216V136a8,8,0,0,0-2.16-5.47L40,56H216Z"
							></path></svg
						>
					</button>
					<button
						aria-label="creative inventory"
						class="contens border-r border-neutral-800 bg-neutral-900 text-neutral-500 hover:bg-[#278c4c] hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-10 w-11 fill-[currentcolor] p-2 px-2.5"
							width="32"
							height="32"
							fill="currentColor"
							viewBox="0 0 256 256"
							><path
								d="M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z"
							></path></svg
						>
					</button>
					<button
						class:!bg-[#2da05a]={mode === 'search'}
						class:!text-white={mode === 'search'}
						aria-label="search"
						class="contens rounded-r-lg border-r border-neutral-800 bg-neutral-900 text-neutral-500 hover:bg-[#278c4c] hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							fill="currentColor"
							viewBox="0 0 256 256"
							class="h-10 w-11 fill-[currentcolor] p-2 px-2.5"
							data-darkreader-inline-fill=""
							style="--darkreader-inline-fill: currentColor;"
							><rect width="256" height="256" fill="none"></rect><path
								d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
							></path></svg
						>
					</button>
				</div>

				<SearchMob
					bind:entities
					{entryFields}
					{filteredMobs}
					bind:finished
					bind:guesses
					{searchTerm}
					{selected}
					bind:sortField
				/>

				<!-- {#if searchTerm === ''}
					<div class="absolute top-14 px-8 left-0 right-0">
						<div class="bg-red-500">
							test
						</div>
					</div>
				{/if} -->
			</div>
		{/if}

		<div class="mr-auto w-fit pr-8" class:ml-auto={finished}>
			<div
				class:justify-center={finished}
				class="relative mt-14 flex w-full flex-col content-center items-center gap-2 overflow-y-scroll"
				style="height: calc(100vh - 11.5rem);"
			>
				{#if guesses.length !== 0}
					{#if finished}
						<h1 class="text-center font-minecraft text-4xl font-black leading-loose">
							Congratulations!
						</h1>
						<p class="-mt-4 text-center text-lg">
							You discovered <strong>{date.getDay()}.{date.getMonth()}.{date.getFullYear()}</strong
							>'s #Plunzle mob in
							<strong>{guesses.length} {guesses.length === 1 ? 'try' : 'tries'}</strong>! 🐸
						</p>
						<br />
						<img src="/brand-logo-white.svg" class="absolute h-96 w-96 opacity-10" alt="brand" />
					{:else}
						<!-- <p class="h-12">{date.getDay()}.{date.getMonth()}.{date.getFullYear()}</p> -->
					{/if}
					<div class="sticky left-8 right-0 top-0 z-10 h-16 w-fit rounded-xl bg-[#00000050] p-2">
						<div class="flex rounded-lg bg-[#00000090] backdrop-blur-sm">
							{#each entryFields as field}
								<div class="relative z-10 flex h-12 w-32 items-center gap-4 text-lg">
									<span class="absolute left-0 right-0 my-auto text-center text-lg">{field}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<Guesses {entryFields} {guesses} {selected} />
			</div>
		</div>
	</main>
</div>
