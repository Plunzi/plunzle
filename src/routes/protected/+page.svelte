<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';

	import entities from '$lib/assets/entries/Entities.json';
	import { flip } from 'svelte/animate';

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

	<main class="pt-8">
		<div class="relative flex flex-grow px-8">
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

		{#if searchTerm !== ''}
			<div class="fixed bottom-0 left-0 right-0 top-36 overflow-y-auto p-8">
				<table class="w-full border-collapse">
					<thead class="-translate-y-4 p-4">
						<tr class=" border-transparent">
							<td class="w-[14.25%] rounded-l-lg bg-neutral-950 px-2 py-1 text-center">
								<button
									onclick={() => (sortField = 'mob')}
									class:bg-[#2da05a]={sortField == 'mob'}
									class="w-full rounded-md py-1">Mob</button
								>
							</td>
							<td class="w-[14.25%] bg-neutral-950 p-2 text-center">
								<button
									onclick={() => (sortField = 'release')}
									class:bg-[#2da05a]={sortField == 'release'}
									class="w-full rounded-md py-1">Release</button
								>
							</td>
							<td class="w-[14.25%] bg-neutral-950 p-2 text-center">
								<button
									onclick={() => (sortField = 'health')}
									class:bg-[#2da05a]={sortField == 'health'}
									class="w-full rounded-md py-1">Health</button
								>
							</td>
							<td class="w-[14.25%] bg-neutral-950 p-2 text-center">
								<button
									onclick={() => (sortField = 'height')}
									class:bg-[#2da05a]={sortField == 'height'}
									class="w-full rounded-md py-1">Height</button
								>
							</td>
							<td class="w-[14.25%] bg-neutral-950 p-2 text-center">
								<button
									onclick={() => (sortField = 'behavior')}
									class:bg-[#2da05a]={sortField == 'behavior'}
									class="w-full rounded-md py-1">Behavior</button
								>
							</td>
							<td class="w-[14.25%] bg-neutral-950 p-2 text-center">
								<button
									onclick={() => (sortField = 'spawn')}
									class:bg-[#2da05a]={sortField == 'spawn'}
									class="w-full rounded-md py-1">Spawn</button
								>
							</td>
							<td class="w-[14.25%] rounded-r-lg bg-neutral-950 p-2 text-center">
								<button
									onclick={() => (sortField = 'classification')}
									class:bg-[#2da05a]={sortField == 'classification'}
									class="w-full rounded-md py-1">classification</button
								>
							</td>
						</tr>
					</thead>
					<tbody>
						{#if filteredMobs.length === 0}
							<tr>
								<td>Nothing found</td>
							</tr>
						{:else}
							{#each filteredMobs as mob (mob)}
								<tr animate:flip={{ duration: 250 }}>
									{#each Object.keys(mob) as field, i}
										<td class:rounded-l-lg={i == 0} class:rounded-r-lg={i == 6} class="w-[14.25%] p-2 bg-neutral-950">{mob[field]}</td>
									{/each}
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		{/if}
	</main>
</div>
