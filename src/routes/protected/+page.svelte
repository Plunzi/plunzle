<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';

	import jsonEntries from '$lib/assets/entries/Entities.json';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

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

	let searchTerm = $state('');
	let sortField = $state('mob');
	let sortDirection = $state('asc');

	// Computed state for filtered and sorted mobs
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
			if (typeof aValue === 'number') {
				return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
			}

			// Handle string fields
			if (sortDirection === 'asc') {
				return aValue.localeCompare(bValue);
			} else {
				return bValue.localeCompare(aValue);
			}
		});
	});

	let guesses: Entry[] = $state([]);

	function handleSort(field: string) {
		if (sortField === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field;
			sortDirection = 'asc';
		}
	}
</script>

<div class="h-full w-full flex-grow">
	<Navigation pageTitle={'Home'} />

	<main
		class="flex h-full bg-cover bg-center bg-no-repeat pt-8"
		style="background-image: url('/blue-night-sky.webp');"
	>
		<div class="ml-auto">
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
				<button
					aria-label="search"
					class="contens ml-3 rounded-sm text-neutral-500 hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
				>
					<svg
						class="h-10 w-11 rounded-lg border-neutral-800 bg-neutral-900 fill-[currentcolor] p-2 px-1 hover:border-r-[#278c4c] hover:bg-[#278c4c]"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						fill="currentcolor"
						viewBox="0 0 256 256"
						><path
							d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
						></path></svg
					>
				</button>
			</div>

			<div
				class:opacity-0={!searchTerm}
				style="height: calc(100vh - 11.5rem);"
				class="mt-4 w-fit min-w-[50rem] overflow-y-scroll py-8 pl-8 pt-0 transition-all"
			>
				<div class="relative flex w-full flex-col gap-2">
					<div
						class="sticky left-8 right-0 top-0 z-10 h-16 w-fit cursor-pointer rounded-xl bg-[#00000050] p-2"
					>
						<div class="flex rounded-lg bg-[#00000090]">
							<button
								onclick={() => (sortField = 'mob')}
								class="relative z-10 flex h-12 w-32 items-center gap-4 text-lg"
							>
								<span class="absolute left-0 right-0 my-auto text-center text-lg"> Mob </span>
							</button>
							<button
								onclick={() => (sortField = 'release')}
								class="relative z-10 flex h-12 w-32 items-center gap-4 text-lg"
							>
								<span class="absolute left-0 right-0 text-center text-lg"> Release </span>
							</button>
							<button
								onclick={() => (sortField = 'health')}
								class="relative z-10 flex h-12 w-32 items-center gap-4 text-lg"
							>
								<span class="absolute left-0 right-0 text-center text-lg"> Health </span>
							</button>
							<button
								onclick={() => (sortField = 'height')}
								class="relative z-10 flex h-12 w-32 items-center gap-4 text-lg"
							>
								<span class="absolute left-0 right-0 text-center text-lg"> Height </span>
							</button>
							<button
								onclick={() => (sortField = 'behavior')}
								class="relative z-10 flex h-12 w-32 items-center gap-4 text-lg"
							>
								<span class="absolute left-0 right-0 text-center text-lg"> Behavior </span>
							</button>
							<button
								onclick={() => (sortField = 'spawn')}
								class="relative z-10 flex h-12 w-32 items-center gap-4 text-lg"
							>
								<span class="absolute left-0 right-0 text-center text-lg"> Spawn </span>
							</button>
							<button
								onclick={() => (sortField = 'classification')}
								class="relative z-10 flex h-12 w-32 items-center gap-4 text-lg"
							>
								<span class="absolute left-0 right-0 z-30 text-center text-lg">
									Classification
								</span>
							</button>
							<div
								class:translate-x-[8rem]={sortField == 'release'}
								class:translate-x-[16rem]={sortField == 'health'}
								class:translate-x-[24rem]={sortField == 'height'}
								class:translate-x-[32rem]={sortField == 'behavior'}
								class:translate-x-[40rem]={sortField == 'spawn'}
								class:translate-x-[48rem]={sortField == 'classification'}
								class="absolute left-2 h-12 w-32 rounded-lg border border-[#36bf68] bg-[#2da05a] bg-gradient-to-t from-[#278c4c] to-[#36bf68] px-4 shadow-lg transition-transform hover:bg-[#36bf68]"
							></div>
						</div>
					</div>

					{#if filteredMobs.length === 0}
						<p>Nothing found</p>
					{:else}
						{#each filteredMobs as mob (mob)}
							<button
								onclick={() => {
									entities = entities.filter((filterEntry) => filterEntry !== mob);
									guesses.push(mob);
								}}
								in:fade={{ duration: 250 }}
								out:fade={{ duration: 250 }}
								animate:flip={{ duration: 250 }}
								class="flex w-fit cursor-pointer rounded-xl bg-[#00000050] p-2 hover:bg-[#36bf6850]"
							>
								{#each Object.keys(mob).slice(0, 7) as field, i}
									{#if i === 0}
										<div class="relative flex w-fit items-center gap-4 text-lg">
											<div
												class="flex h-32 w-32 rounded-l-lg bg-contain bg-center bg-no-repeat"
												style="background-image: url('/gui/sprites/slot.png')"
											>
												<div
													class="mx-auto mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat"
													style="background-image: url('/entities{mob.ressource}')"
												></div>
											</div>
											<!-- <img class="w-16" src="/entities/{mob.ressource}" alt={`${mob[field]}`}> -->
											<span
												class="absolute bottom-2.5 left-0 right-0 text-center font-minecraft text-lg"
												>{mob[field]}</span
											>
										</div>
									{:else}
										<div
											class:rounded-r-lg={i == 6}
											style="background-image: url('/gui/sprites/slot.png')"
											class="relative flex h-32 w-32 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg"
										>
											<span
												class="absolute bottom-2.5 left-0 right-0 text-center font-minecraft text-lg"
												>{mob[field]}</span
											>
										</div>
									{/if}
								{/each}
							</button>
						{/each}
					{/if}
				</div>
			</div>
		</div>

		<div class="mr-auto w-fit pr-8">
			<div class="w-full overflow-y-scroll" style="height: calc(100vh - 8rem);">
				{#each guesses as mob (mob)}
					<div
						in:fade={{ duration: 250 }}
						out:fade={{ duration: 250 }}
						animate:flip={{ duration: 250 }}
						class="flex w-fit rounded-xl bg-[#00000050] p-2 hover:bg-[#36bf6850]"
					>
						{#each Object.keys(mob).slice(0, 7) as field, i}
							{#if i === 0}
								<div class="relative flex w-fit items-center gap-4 text-lg">
									<div
										class="flex h-32 w-32 rounded-l-lg bg-contain bg-center bg-no-repeat"
										style="background-image: url('/gui/sprites/slot.png')"
									>
										<div
											class="mx-auto mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat"
											style="background-image: url('/entities{mob.ressource}')"
										></div>
									</div>
									<!-- <img class="w-16" src="/entities/{mob.ressource}" alt={`${mob[field]}`}> -->
									<span
										class="absolute bottom-2.5 left-0 right-0 text-center font-minecraft text-lg"
										>{mob[field]}</span
									>
								</div>
							{:else}
								<div
									class:rounded-r-lg={i == 6}
									style="background-image: url('/gui/sprites/slot.png')"
									class="relative flex h-32 w-32 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg"
								>
									<span
										class="absolute bottom-2.5 left-0 right-0 text-center font-minecraft text-lg"
										>{mob[field]}</span
									>
								</div>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>
