<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';

	import jsonEntries from '$lib/assets/entries/Entities.json';
	import SearchMob from '$lib/components/SearchMob.svelte';
	import Guesses from '$lib/components/Guesses.svelte';
	import { onMount } from 'svelte';

	interface Guess {
		dailyMob: DailyMob;
		pickedMob: Entry;
	}

	interface Entry {
		mob: string;
		release: string;
		health: number;
		height: number;
		behavior: string[];
		spawn: string[];
		classification: string[];
		ressource: string;
	}

	interface DailyMob {
		behavior: 'slot_right' | 'slot_wrong' | 'slot_kinda';
		classification: 'slot_right' | 'slot_wrong' | 'slot_kinda';
		health: 'slot_right' | 'slot_wrong_higher' | 'slot_wrong_lower';
		height: 'slot_right' | 'slot_wrong_higher' | 'slot_wrong_lower';
		mob: 'slot_right' | 'slot_wrong';
		release: 'slot_right' | 'slot_wrong_higher' | 'slot_wrong_lower';
		spawn: 'slot_right' | 'slot_wrong' | 'slot_kinda';
	}

	let entities: Entry[] = $state(jsonEntries);

	let searchTerm = $state('');
	let sortField = $state<keyof Entry>('mob');
	let sortDirection = $state('asc');
	let finished = $state(false);
	let mode: 'creative inventory' | 'search' | 'filter' = $state('search');
	let date = new Date();

	let filteredMobs: Entry[] = $derived.by(() => {
		let filtered = entities.filter(
			(mob) =>
				mob.mob.toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.behavior.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.spawn.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.classification.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.release.toString().toLowerCase().includes(searchTerm.toLowerCase())||
				mob.health.toString().toLowerCase().includes(searchTerm.toLowerCase())||
				mob.height.toString().toLowerCase().includes(searchTerm.toLowerCase())
		);

		function compareVersions(a: string, b: string): number {
			// Define version type precedence
			const versionTypeOrder = ['alpha', 'beta', 'release'];

			// Extract version type and number
			const parseVersion = (version: string) => {
				const alphaMatch = version.match(/^(alpha|beta)\s*([\d.]+)/i);
				const standardMatch = version.match(/^([\d.]+)/);

				if (alphaMatch) {
					return {
						type: alphaMatch[1].toLowerCase(),
						number: alphaMatch[2].split('.').map(Number)
					};
				}

				if (standardMatch) {
					return {
						type: 'release',
						number: standardMatch[1].split('.').map(Number)
					};
				}

				return { type: 'unknown', number: [0] };
			};

			const parsedA = parseVersion(a);
			const parsedB = parseVersion(b);

			// First, compare by version type
			const typeOrderDiff =
				versionTypeOrder.indexOf(parsedA.type) - versionTypeOrder.indexOf(parsedB.type);
			if (typeOrderDiff !== 0) return typeOrderDiff;

			// Then, compare by version number
			const maxLength = Math.max(parsedA.number.length, parsedB.number.length);

			for (let i = 0; i < maxLength; i++) {
				const numA = parsedA.number[i] || 0;
				const numB = parsedB.number[i] || 0;

				if (numA !== numB) {
					return numA - numB;
				}
			}

			return 0;
		}

		return filtered.sort((a, b) => {
			// If sorting by release, use custom version comparison
			if (sortField === 'release') {
				return compareVersions(a.release, b.release) * (sortDirection === 'asc' ? 1 : -1);
			}

			// Existing sorting logic for other fields
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

	let guesses: Guess[] = $state([]);

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
				<div
					class="relative flex h-fit w-[54rem] min-w-[54rem] px-8 4xl:w-[61rem] 4xl:min-w-[61rem]"
				>
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
					class:!bg-[#2da05a]={mode === 'filter'}
					class:!text-white={mode === 'filter'}
					onclick={() => (mode = 'filter')}
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
						class:!bg-[#2da05a]={mode === 'creative inventory'}
						class:!text-white={mode === 'creative inventory'}
						onclick={() => (mode = 'creative inventory')}
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
						onclick={() => (mode = 'search')}
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
					bind:sortField
					{mode}
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
				class="relative mt-14 flex w-full flex-col content-center items-center gap-2"
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
								<div class="relative z-10 flex h-12 w-28 items-center gap-4 text-lg 4xl:w-32">
									<span class="absolute left-0 right-0 my-auto text-center text-lg">{field}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<div class="ml-5 overflow-y-scroll">
					<Guesses {guesses} />
				</div>
			</div>
		</div>
	</main>
</div>
