<script lang="ts">
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

	interface Props {
		searchTerm: string;
		entryFields: Entry[];
		sortField: string;
		filteredMobs: Entry[];
		entities: Entry[];
		guesses: Entry[];
		selected: string;
		finished: boolean;
	}

	let {
		searchTerm,
		entryFields,
		sortField = $bindable(),
		filteredMobs,
		entities = $bindable(),
		guesses = $bindable(),
		selected,
		finished = $bindable()
	} = $props();
</script>

<div
	class:opacity-0={!searchTerm}
	class:pointer-events-none={!searchTerm}
	style="height: calc(100vh - 11.5rem);"
	class="mt-4 w-fit min-w-[50rem] overflow-y-scroll pl-8 pt-0 transition-all"
>
	<div class="relative flex w-full flex-col gap-2">
		<div
			class="sticky left-8 right-0 top-0 z-10 h-16 w-fit cursor-pointer rounded-xl bg-[#00000050] p-2"
		>
			<div class="flex rounded-lg bg-[#00000090] backdrop-blur-sm">
				{#each entryFields as field}
					<button
						onclick={() => (sortField = field)}
						class="relative z-10 flex h-12 w-28 items-center gap-4 text-lg 4xl:w-32"
					>
						<span class="absolute left-0 right-0 my-auto text-center text-lg">{field}</span>
					</button>
				{/each}
				<div
					class:translate-x-[7rem]={sortField == 'release'}
					class:4xl:translate-x-[8rem]={sortField == 'release'}
					class:translate-x-[14rem]={sortField == 'health'}
					class:4xl:translate-x-[16rem]={sortField == 'health'}
					class:translate-x-[21rem]={sortField == 'height'}
					class:4xl:translate-x-[24rem]={sortField == 'height'}
					class:translate-x-[28rem]={sortField == 'behavior'}
					class:4xl:translate-x-[32rem]={sortField == 'behavior'}
					class:translate-x-[35rem]={sortField == 'spawn'}
					class:4xl:translate-x-[40rem]={sortField == 'spawn'}
					class:translate-x-[42rem]={sortField == 'classification'}
					class:4xl:translate-x-[48rem]={sortField == 'classification'}
					class="absolute left-0 h-12 w-28 rounded-lg border border-[#36bf68] bg-[#2da05a] bg-gradient-to-t from-[#278c4c] to-[#36bf68] px-4 shadow-lg transition-transform hover:bg-[#36bf68] 4xl:w-32"
				></div>
			</div>
		</div>

		{#if filteredMobs.length === 0}
			<p class="flex h-16 items-center justify-center rounded-xl bg-[#00000050] text-center">
				There is currently no mob with this name!
			</p>
		{:else}
			{#each filteredMobs as mob (mob)}
				<button
					onclick={() => {
						entities = entities.filter((filterEntry: Entry) => filterEntry !== mob);
						guesses = [mob, ...guesses];
						if (JSON.stringify(selected) === JSON.stringify(mob)) {
							finished = true;
						}
					}}
					in:fade={{ duration: 250 }}
					out:fade={{ duration: 250 }}
					animate:flip={{ duration: 250 }}
					class="flex w-fit cursor-pointer rounded-xl bg-[#00000050] p-2 hover:bg-[#36bf6850]"
				>
					{#each entryFields as field, i}
						{#if i === 0}
							<div class="relative flex w-fit items-center gap-4 text-lg">
								<div
									class="flex h-28 w-28 rounded-l-lg bg-contain bg-center bg-no-repeat 4xl:h-32 4xl:w-32"
									style="background-image: url('/gui/sprites/slot.png')"
								>
									<div
										class="mx-auto mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat"
										style="background-image: url('/entities{mob.ressource}')"
									></div>
								</div>
								<!-- <img class="w-16" src="/entities/{mob.ressource}" alt={`${mob[field]}`}> -->
								<span
									class="absolute bottom-6 left-0 right-0 text-center font-minecraft text-lg leading-4"
									>{mob[field]}</span
								>
							</div>
						{:else}
							<div
								class:rounded-r-lg={i == 6}
								style="background-image: url('/gui/sprites/slot.png')"
								class="relative flex h-28 w-28 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg 4xl:h-32 4xl:w-32"
							>
								<span
									class="absolute bottom-6 left-0 right-0 text-center font-minecraft text-lg leading-4"
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
