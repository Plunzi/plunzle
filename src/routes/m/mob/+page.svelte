<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Navigation from '$lib/components/Navigation.svelte';

	import jsonEntries from '$lib/assets/entries/Entities.json';
	import Guesses from '$lib/components/mobile/ui/Guesses.svelte';
	import { onMount } from 'svelte';
	import SearchMob from '$lib/components/mobile/ui/SearchMob.svelte';
	import SearchMobPopover from '$lib/components/mobile/ui/SearchMobPopover.svelte';

	interface Guess {
		dailyMob: DailyMob;
		pickedMob: Entry;
	}

	const guesses1: Guess[] = [
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_wrong',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_wrong',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		},
		{
			dailyMob: {
				behavior: 'slot_right',
				classification: 'slot_right',
				health: 'slot_right',
				height: 'slot_right',
				mob: 'slot_right',
				release: 'slot_right',
				spawn: 'slot_right'
			},
			pickedMob: {
				mob: 'Allay',
				release: '1.19',
				health: 20,
				height: 0.6,
				behavior: ['Passive'],
				spawn: ['Structure', 'Duplication'],
				classification: ['None'],
				ressource: '/allay.gif'
			}
		}
	];

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
	let innerWidth: number = $state(0);
	let forceOpen = $state(false);

	function onKeydown(e: KeyboardEvent) {}

	let sidepanel = $state({
		searchOpen: false
	});

	let filteredMobs: Entry[] = $derived.by(() => {
		let filtered = entities.filter(
			(mob) =>
				mob.mob.toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.behavior.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.spawn.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.classification.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.release.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
				mob.health.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
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

	guesses = guesses1;

	onMount(() => {
		innerWidth = window.innerWidth;
		document.getElementById('searchTerm')!.focus();
	});

	$effect(() => {
		if (forceOpen) {
			sidepanel.searchOpen = true;
		} else {
			sidepanel.searchOpen = Boolean(searchTerm);
		}
	});
</script>

<svelte:window bind:innerWidth />

<div class="h-full w-full flex-grow">
	<Navigation pageTitle={'Home'} />
	<main
		class="flex h-full bg-cover bg-center bg-no-repeat pt-8"
		style="background-image: url('/blue-night-sky.webp');"
	>
		{#if innerWidth > 1600}
			{#if !finished}
				<div class="hidden w-full lg:mx-auto lg:!block">
					<div class="relative mx-auto w-full lg:w-fit">
						<div
							class="4xl:w-[61rem] 4xl:min-w-[61rem] relative flex h-fit w-full px-8 lg:w-[52rem] lg:min-w-[52rem]"
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
								class:!bg-[#2da05a]={sidepanel.searchOpen}
								class:!text-white={sidepanel.searchOpen}
								onclick={() => ((mode = 'search'), (sidepanel.searchOpen = true))}
								aria-label="search"
								class="contens rounded-r-lg border-neutral-800 bg-neutral-900 text-neutral-500 transition-colors hover:bg-[#278c4c] hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
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
					</div>

					<div
						class:justify-center={finished}
						class="relative mx-auto mt-2 px-2 flex w-full flex-col content-center items-center lg:w-fit"
						style="height: calc(100vh - 9.5rem);"
					>
						<div class="relative right-0 top-0 z-10 h-fit w-full rounded-xl bg-[#00000090] px-2">
							<div class="flex rounded-lg backdrop-blur-sm">
								{#each entryFields as field, i}
									<!-- class:ml-2={i === 0}
							class:mr-2={i === 6} -->
									<button
										onclick={() => (sortField = field)}
										class="4xl:w-32 relative z-10 flex h-12 w-full items-center gap-4 overflow-hidden"
									>
										<span class="absolute left-0 right-0 my-auto text-center text-sm lg:text-base"
											>{field}</span
										>
									</button>
								{/each}
								<div
									class:translate-x-[97.5%]={sortField == 'release'}
									class:4xl:translate-x-[8rem]={sortField == 'release'}
									class:translate-x-[195%]={sortField == 'health'}
									class:4xl:translate-x-[16rem]={sortField == 'health'}
									class:translate-x-[292.5%]={sortField == 'height'}
									class:4xl:translate-x-[24rem]={sortField == 'height'}
									class:translate-x-[390%]={sortField == 'behavior'}
									class:4xl:translate-x-[32rem]={sortField == 'behavior'}
									class:translate-x-[487.5%]={sortField == 'spawn'}
									class:4xl:translate-x-[40rem]={sortField == 'spawn'}
									class:translate-x-[585%]={sortField == 'classification'}
									class:4xl:translate-x-[48rem]={sortField == 'classification'}
									class="4xl:w-32 absolute top-2 h-8 w-[6.9642857143rem] scale-y-105 rounded-lg border border-[#36bf68] bg-[#2da05a] bg-gradient-to-t from-[#278c4c] to-[#36bf68] px-4 shadow-lg transition-transform hover:bg-[#36bf68]"
								></div>
							</div>
						</div>
						{#if guesses.length !== 0}
							{#if finished}
								<h1 class="font-minecraft text-center text-2xl lg:text-4xl font-black leading-loose">
									Congratulations!
								</h1>
								<p class="-mt-4 text-center text-lg">
									You discovered <strong
										>{date.getDay()}.{date.getMonth()}.{date.getFullYear()}</strong
									>'s #Plunzle mob in
									<strong>{guesses.length} {guesses.length === 1 ? 'try' : 'tries'}</strong>! 🐸
								</p>
								<br />
								<img
									src="/brand-logo-white.svg"
									class="absolute h-96 w-96 opacity-10"
									alt="brand"
								/>
							{:else}
								<!-- <p class="h-12">{date.getDay()}.{date.getMonth()}.{date.getFullYear()}</p> -->
							{/if}
						{/if}
						<div class="mt-2 w-full max-w-none overflow-y-scroll">
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
						</div>
					</div>
				</div>
			{/if}
		{/if}
		<!-- <div class="w-full bg-green-500 lg:mx-auto" class:ml-auto={finished}> -->
		<div class="w-full lg:mx-auto" class:ml-auto={finished}>
			{#if !finished}
				<div class="relative mx-auto w-full lg:w-fit">
					<div
						class="4xl:w-[61rem] 4xl:min-w-[61rem] relative flex h-fit w-full px-2 lg:w-[52rem] lg:min-w-[52rem] lg:px-8"
					>
						<button
							onclick={() => {
								forceOpen = false;
								forceOpen = true;
							}}
							aria-label="search"
							class="contens absolute rounded-l-lg border-r border-neutral-800 bg-neutral-900 text-neutral-500 focus:outline-none"
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

						<button
							onclick={() => {
								forceOpen = false;
								forceOpen = true;
							}}
							id="searchTerm"
							name="quick-overall-search"
							class="mr-4 w-full rounded-lg bg-[#161616] px-3 py-2 pl-14 text-left text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
							>{searchTerm || 'Search ...'}
						</button>
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
							class:!bg-[#2da05a]={sidepanel.searchOpen}
							class:!text-white={sidepanel.searchOpen}
							onclick={() => ((mode = 'search'), (sidepanel.searchOpen = true))}
							aria-label="search"
							class="contens rounded-r-lg border-neutral-800 bg-neutral-900 text-neutral-500 transition-colors hover:bg-[#278c4c] hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
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
				</div>
			{/if}
			<div
				class:justify-center={finished}
				class="relative mx-auto mt-2 flex w-full flex-col content-center items-center lg:w-fit px-2 lg:px-0"
				style="height: calc(100vh - 9.5rem);"
			>
				{#if guesses.length !== 0}
					{#if finished}
						<h1 class="font-minecraft text-center text-3xl lg:text-4xl lg:mb-5 font-black leading-loose">
							Congratulations!
						</h1>
						<p class="-mt-4 text-center lg:text-lg">
							You discovered <strong>{date.getDay()}.{date.getMonth()}.{date.getFullYear()}</strong
							>'s #Plunzle mob in
							<strong>{guesses.length} {guesses.length === 1 ? 'try' : 'tries'}</strong>! 🐸
						</p>
						<br />
						<img src="/brand-logo-white.svg" class="absolute h-96 w-96 opacity-10" alt="brand" />
					{:else}
						<!-- <p class="h-12">{date.getDay()}.{date.getMonth()}.{date.getFullYear()}</p> -->
					{/if}
					<div class="left-8 right-0 top-0 z-10 h-fit w-full rounded-xl bg-[#00000090] px-2">
						<div class="flex rounded-lg backdrop-blur-sm">
							{#each entryFields as field}
								<div
									class="4xl:w-32 relative z-10 flex h-12 w-full items-center gap-4 overflow-hidden"
								>
									<span class="absolute left-0 right-0 my-auto text-center text-sm lg:text-base"
										>{field}</span
									>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<div class="mt-2 w-full max-w-none overflow-y-scroll relative z-50">
					<Guesses {guesses} />
				</div>

				{#if innerWidth < 1600}
					<Sheet.Root bind:open={sidepanel.searchOpen}>
						<Sheet.Content
							side={'bottom'}
							class="h-[90%] border-neutral-800 bg-neutral-950 !p-0"
							style="max-width: none;"
						>
							<div class="relative z-50 flex gap-2">
								<div
									class="4xl:w-[61rem] 4xl:min-w-[61rem] relative flex h-fit w-full px-4 pt-4 lg:w-[52rem] lg:min-w-[52rem] lg:px-8 mx-auto"
								>
									<div
										class="contens absolute rounded-l-lg border-r border-neutral-800 bg-neutral-900 text-neutral-500 hover:bg-[#278c4c] hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
									>
										<svg
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
									</div>

									<input
										id="searchTerm"
										bind:value={searchTerm}
										name="quick-overall-search"
										placeholder="Search ..."
										class="mr-4 w-full rounded-lg bg-[#161616] px-3 py-2 pl-14 text-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
									/>

									<Sheet.Close
										class="flex max-h-10 min-h-10 min-w-10 max-w-10 rounded-lg bg-neutral-900 text-neutral-500 ring-offset-background transition-opacity hover:bg-[#278c4c] hover:text-white hover:opacity-100 focus:bg-[#2da05a] focus:text-white focus:outline-none focus:ring-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											class="h-10 w-11 fill-[currentcolor] p-2 px-2"
											fill="currentcolor"
											viewBox="0 0 256 256"
											><path
												d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"
											></path></svg
										>
										<span class="sr-only">Close</span>
									</Sheet.Close>
								</div>
							</div>
							<div class="h-full pt-4">
								<Sheet.Header class="h-full overflow-y-scroll">
									<SearchMobPopover
										bind:forceOpen
										bind:entities
										{entryFields}
										{filteredMobs}
										bind:finished
										bind:guesses
										bind:searchTerm
										bind:sortField
										{mode}
									></SearchMobPopover>
									{#if filteredMobs.length === 0}
										<Sheet.Description class="lg:w-[52rem] lg:mx-auto lg:px-4 lg:text-center flex justify-center">
											No Minecraft mob was found with the search criteria and filters you entered!
										</Sheet.Description>
									{/if}
								</Sheet.Header>
							</div>
						</Sheet.Content>
					</Sheet.Root>
				{/if}
			</div>
		</div>
	</main>
</div>
