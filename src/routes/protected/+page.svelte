<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';

	import entities from '$lib/assets/entries/Entities.json';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';

	let searchTerm = $state('');
	let sortField = $state('mob');
	let sortDirection = $state('asc');

	// Computed state for filtered and sorted mobs
	let filteredMobs = $derived.by(() => {
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

	function handleSort(field) {
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
		class="h-full bg-cover bg-center bg-no-repeat pt-8"
		style="background-image: url('/blue-night-sky.webp');"
	>
		<div class="relative mx-auto flex w-[61rem] flex-grow px-8">
			<button
				aria-label="search"
				class="contens absolute rounded-l-sm text-neutral-500 hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					fill="currentColor"
					viewBox="0 0 256 256"
					class="h-10 w-11 rounded-l-lg border-r border-neutral-800 fill-[currentcolor] p-2 px-2.5 hover:border-r-[#278c4c] hover:bg-[#278c4c]"
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
				aria-label="search"
				class="contens rounded-l-sm text-neutral-500 hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					fill="currentColor"
					viewBox="0 0 256 256"
					class="h-10 w-11 rounded-l-lg border-r border-neutral-800 bg-neutral-900 fill-[currentcolor] p-2 px-2.5 hover:border-r-[#278c4c] hover:bg-[#278c4c]"
					data-darkreader-inline-fill=""
					style="--darkreader-inline-fill: currentColor;"
					><rect width="256" height="256" fill="none"></rect><path
						d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
					></path></svg
				>
			</button>
			<button
				aria-label="search"
				class="contens rounded-l-sm text-neutral-500 hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					fill="currentColor"
					viewBox="0 0 256 256"
					class="h-10 w-11 border-r border-neutral-800 bg-neutral-900 fill-[currentcolor] p-2 px-2.5 hover:border-r-[#278c4c] hover:bg-[#278c4c]"
					data-darkreader-inline-fill=""
					style="--darkreader-inline-fill: currentColor;"
					><rect width="256" height="256" fill="none"></rect><path
						d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
					></path></svg
				>
			</button>
			<button
				aria-label="search"
				class="contens text-neutral-500 hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					fill="currentColor"
					viewBox="0 0 256 256"
					class="h-10 w-11 border-r border-neutral-800 bg-neutral-900 fill-[currentcolor] p-2 px-2.5 hover:border-r-[#278c4c] hover:bg-[#278c4c]"
					data-darkreader-inline-fill=""
					style="--darkreader-inline-fill: currentColor;"
					><rect width="256" height="256" fill="none"></rect><path
						d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
					></path></svg
				>
			</button>
			<button
				aria-label="search"
				class="contens text-neutral-500 hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					fill="currentColor"
					viewBox="0 0 256 256"
					class="h-10 w-11 border-r border-neutral-800 bg-neutral-900 fill-[currentcolor] p-2 px-2.5 hover:border-r-[#278c4c] hover:bg-[#278c4c]"
					data-darkreader-inline-fill=""
					style="--darkreader-inline-fill: currentColor;"
					><rect width="256" height="256" fill="none"></rect><path
						d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
					></path></svg
				>
			</button>
			<button
				aria-label="search"
				class="contens text-neutral-500 hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					fill="currentColor"
					viewBox="0 0 256 256"
					class="h-10 w-11 border-r border-neutral-800 bg-neutral-900 fill-[currentcolor] p-2 px-2.5 hover:border-r-[#278c4c] hover:bg-[#278c4c]"
					data-darkreader-inline-fill=""
					style="--darkreader-inline-fill: currentColor;"
					><rect width="256" height="256" fill="none"></rect><path
						d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
					></path></svg
				>
			</button>
			<button
				aria-label="search"
				class="contens rounded-r-sm text-neutral-500 hover:text-white focus:bg-[#2da05a] focus:text-white focus:outline-none"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					fill="currentColor"
					viewBox="0 0 256 256"
					class="h-10 w-11 rounded-r-lg bg-neutral-900 fill-[currentcolor] p-2 px-2.5 hover:bg-[#278c4c]"
					data-darkreader-inline-fill=""
					style="--darkreader-inline-fill: currentColor;"
					><rect width="256" height="256" fill="none"></rect><path
						d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
					></path></svg
				>
			</button>
		</div>

		<div
			class:opacity-0={!searchTerm}
			class:pointer-events-none={!searchTerm}
			class="fixed bottom-0 left-0 right-0 top-60 mx-auto w-[100rem] overflow-y-auto p-8 pt-0 transition-all"
		>
			<div class="relative flex w-full flex-col gap-2">
				<div
					class="fixed left-0 right-0 top-[9.5rem] z-10 mx-auto h-16 w-fit cursor-pointer rounded-xl bg-[#00000050] p-2"
				>
					<div class="bg-[#00000090] flex rounded-lg">
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
							<span class="absolute left-0 right-0 z-30 text-center text-lg"> Classification </span>
						</button>
						<div
							class:translate-x-[8rem]={sortField == 'release'}
							class:translate-x-[16rem]={sortField == 'health'}
							class:translate-x-[24rem]={sortField == 'height'}
							class:translate-x-[32rem]={sortField == 'behavior'}
							class:translate-x-[40rem]={sortField == 'spawn'}
							class:translate-x-[48rem]={sortField == 'classification'}
							class="absolute left-2 h-12 w-32 rounded-lg bg-[#2da05a] transition-transform"
						></div>
					</div>
				</div>

				<div class="fixed p-4">
					<div class="flex flex-col border-transparent">
						<div class="rounded-l-lg bg-neutral-950 p-2 text-center">
							<button
								onclick={() => (sortField = 'mob')}
								class:bg-[#2da05a]={sortField == 'mob'}
								class="w-full rounded-md py-1">Mob</button
							>
						</div>
						<div class="bg-neutral-950 p-2 text-center">
							<button
								onclick={() => (sortField = 'release')}
								class:bg-[#2da05a]={sortField == 'release'}
								class="w-full rounded-md py-1">Release</button
							>
						</div>
						<div class="bg-neutral-950 p-2 text-center">
							<button
								onclick={() => (sortField = 'health')}
								class:bg-[#2da05a]={sortField == 'health'}
								class="w-full rounded-md py-1">Health</button
							>
						</div>
						<div class="bg-neutral-950 p-2 text-center">
							<button
								onclick={() => (sortField = 'height')}
								class:bg-[#2da05a]={sortField == 'height'}
								class="w-full rounded-md py-1">Height</button
							>
						</div>
						<div class="bg-neutral-950 p-2 text-center">
							<button
								onclick={() => (sortField = 'behavior')}
								class:bg-[#2da05a]={sortField == 'behavior'}
								class="w-full rounded-md py-1">Behavior</button
							>
						</div>
						<div class="bg-neutral-950 p-2 text-center">
							<button
								onclick={() => (sortField = 'spawn')}
								class:bg-[#2da05a]={sortField == 'spawn'}
								class="w-full rounded-md py-1">Spawn</button
							>
						</div>
						<div class="rounded-r-lg bg-neutral-950 p-2 text-center">
							<button
								onclick={() => (sortField = 'classification')}
								class:bg-[#2da05a]={sortField == 'classification'}
								class="w-full rounded-md py-1">classification</button
							>
						</div>
					</div>
				</div>

				{#if filteredMobs.length === 0}
					<p>Nothing found</p>
				{:else}
					{#each filteredMobs as mob (mob)}
						<div
							in:fade={{ duration: 250 }}
							out:fade={{ duration: 250 }}
							animate:flip={{ duration: 250 }}
							class="mx-auto flex w-fit cursor-pointer rounded-xl bg-[#00000050] p-2 hover:bg-[#36bf6850]"
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
											class="font-minecraft absolute bottom-2.5 left-0 right-0 text-center text-lg"
											>{mob[field]}</span
										>
									</div>
								{:else}
									<div
										class:rounded-r-lg={i == 6}
										style="background-image: url('/gui/sprites/slot.png')"
										class="font-minecraft relative flex h-32 w-32 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-lg"
									>
										<span
											class="font-minecraft absolute bottom-2.5 left-0 right-0 text-center text-lg"
											>{mob[field]}</span
										>
									</div>
								{/if}
							{/each}
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</main>
</div>
