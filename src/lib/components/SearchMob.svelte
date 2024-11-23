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
		mode: 'search' | 'creative inventory';
	}

	const width = 6.5;
	const gap = 0.8;
	let selectedTab: 'Building Blocks' | 'Colored Blocks' | 'Natural Blocks' | 'Functional Blocks' | 'Redstone Blocks' | 'Saved Hotbars' | 'Search Items' | 'Tools & Utilities' | 'Combat' | 'Food & Drinks' | 'Ingredients' | 'Spawn Eggs' | 'Operator Utilities' | 'Survival Inventory' = $state('Building Blocks');

	let {
		searchTerm,
		entryFields,
		sortField = $bindable(),
		filteredMobs,
		entities = $bindable(),
		guesses = $bindable(),
		selected,
		finished = $bindable(),
		mode
	} = $props();
</script>

<div
	class:opacity-0={!searchTerm && mode === 'search'}
	class:pointer-events-none={!searchTerm && mode === 'search'}
	style="height: calc(100vh - 11.5rem);"
	class="mt-4 w-fit min-w-[50rem] overflow-y-scroll pl-8 pt-0 transition-all"
>
	<div class="relative flex w-full flex-col gap-2">
		{#if mode === 'search'}
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
		{:else if mode === 'creative inventory'}
			<div class="relative">
				<h1 class="font-minecraft text-[2.5rem] text-[#404040] absolute left-[2.5rem] top-[9rem] z-50">{selectedTab}</h1>
				<!-- top left -->
				<button style="transform: translate(1px, 17px);" onmousedown={() => selectedTab = 'Building Blocks'} class="flex items-center justify-center relative {selectedTab === 'Building Blocks' ? 'z-20' : ''}">
					<img class="w-16 h-16 z-50 absolute" src="/gui/categories/Building Blocks.png" alt="Building Blocks Category">
					<img style="image-rendering: pixelated; width: {width}rem;" src="/gui/sprites/tab_top_left_{selectedTab === 'Building Blocks' ? '' : 'un'}selected.png" alt="Building Blocks Icon">
				</button>
				<!-- top middle -->
				<button style="transform: translate(1px, 17px); left: {(width + gap) * 1}rem;" onmousedown={() => selectedTab = 'Colored Blocks'} class="absolute flex justify-center items-center top-0 {selectedTab === 'Colored Blocks' ? 'z-20' : ''}">
					<img class="w-16 h-16 z-50 absolute" src="/gui/categories/Colored Blocks.webp" alt="Colored Blocks Category">
					<img style="image-rendering: pixelated; width: {width}rem;" src="/gui/sprites/tab_top_middle_{selectedTab === 'Colored Blocks' ? '' : 'un'}selected.png" alt="">
				</button>
				<button style="transform: translate(1px, 17px); left: {(width + gap) * 2}rem;" onmousedown={() => selectedTab = 'Natural Blocks'} class="absolute flex justify-center items-center top-0 {selectedTab === 'Natural Blocks' ? 'z-20' : ''}">
					<img class="w-16 h-16 z-50 absolute" src="/gui/categories/Natural Blocks.png" alt="Natural Blocks Category">
					<img style="image-rendering: pixelated; width: {width}rem;" src="/gui/sprites/tab_top_middle_{selectedTab === 'Natural Blocks' ? '' : 'un'}selected.png" alt="">
				</button>
				<button style="transform: translate(1px, 17px); left: {(width + gap) * 3}rem;" onmousedown={() => selectedTab = 'Functional Blocks'} class="absolute flex justify-center items-center top-0 {selectedTab === 'Functional Blocks' ? 'z-20' : ''}">
					<img class="w-16 h-16 z-50 absolute" src="/gui/categories/Functional Blocks.png" alt="Functional Blocks Category">
					<img style="image-rendering: pixelated; width: {width}rem;" src="/gui/sprites/tab_top_middle_{selectedTab === 'Functional Blocks' ? '' : 'un'}selected.png" alt="">
				</button>
				<button style="transform: translate(1px, 17px); left: {(width + gap) * 4}rem;" onmousedown={() => selectedTab = 'Redstone Blocks'} class="absolute flex justify-center items-center top-0 {selectedTab === 'Redstone Blocks' ? 'z-20' : ''}">
					<img class="w-16 h-16 z-50 absolute" src="/gui/categories/Redstone Blocks.png" alt="Redstone Blocks Category">
					<img style="image-rendering: pixelated; width: {width}rem;" src="/gui/sprites/tab_top_middle_{selectedTab === 'Redstone Blocks' ? '' : 'un'}selected.png" alt="">
				</button>
				<!-- top right -->
				<button style="transform: translate(-1px, 17px); right: {(width + gap) * 1}rem;" onmousedown={() => selectedTab = 'Saved Hotbars'} class="absolute flex justify-center items-center top-0 {selectedTab === 'Saved Hotbars' ? 'z-20' : ''}">
					<img class="w-16 h-16 z-50 absolute" src="/gui/categories/Saved Hotbars.png" alt="Saved Hotbars Category">
					<img style="image-rendering: pixelated; width: {width}rem;" src="/gui/sprites/tab_top_middle_{selectedTab === 'Saved Hotbars' ? '' : 'un'}selected.png" alt="">
				</button>
				<button style="transform: translate(-1px, 17px); right: 0;" onmousedown={() => selectedTab = 'Search Items'} class="absolute flex justify-center items-center top-0 {selectedTab === 'Search Items' ? 'z-20' : ''}">
					<img class="w-16 h-16 z-50 absolute" src="/gui/categories/Search Items.png" alt="Search Items Category">
					<img style="image-rendering: pixelated; width: {width}rem;" src="/gui/sprites/tab_top_right_{selectedTab === 'Search Items' ? '' : 'un'}selected.png" alt="">
				</button>

				<!-- bottom left -->
				<button onmousedown={() => selectedTab = 'Tools & Utilities'} class="contents">
					<img style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem;" src="/gui/sprites/tab_bottom_left_{selectedTab === 'Tools & Utilities' ? '' : 'un'}selected.png"   class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Tools & Utilities' ? 'z-20' : ''}" alt="">				
				</button>
				<!-- bottom middle -->
				<button onmousedown={() => selectedTab = 'Combat'} class="contents">
					<img style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem; left: {(width + gap) * 1}rem;" src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Combat' ? '' : 'un'}selected.png" class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Combat' ? 'z-20' : ''}" alt="">
				</button>
				<button onmousedown={() => selectedTab = 'Food & Drinks'} class="contents">
					<img style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem; left: {(width + gap) * 2}rem;" src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Food & Drinks' ? '' : 'un'}selected.png" class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Food & Drinks' ? 'z-20' : ''}" alt="">
				</button>
				<button onmousedown={() => selectedTab = 'Ingredients'} class="contents">
					<img style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem; left: {(width + gap) * 3}rem;" src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Ingredients' ? '' : 'un'}selected.png" class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Ingredients' ? 'z-20' : ''}" alt="">
				</button>
				<button onmousedown={() => selectedTab = 'Spawn Eggs'} class="contents">
					<img style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem; left: {(width + gap) * 4}rem;" src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Spawn Eggs' ? '' : 'un'}selected.png" class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Spawn Eggs' ? 'z-20' : ''}" alt="">
				</button>
				<!-- bottom right -->
				<button onmousedown={() => selectedTab = 'Operator Utilities'} class="contents">
					<img style="image-rendering: pixelated; transform: translate(-1px, 109px); width: {width}rem; right: {(width + gap) * 1}rem;" src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Operator Utilities' ? '' : 'un'}selected.png" class="w-[{width}rem] bottom-0 absolute {selectedTab === 'Operator Utilities' ? 'z-20' : ''}" alt="">
				</button>
				<button onmousedown={() => selectedTab = 'Survival Inventory'} class="contents">
					<img style="image-rendering: pixelated; transform: translate(-1px, 109px); width: {width}rem;" src="/gui/sprites/tab_bottom_right_{selectedTab === 'Survival Inventory' ? '' : 'un'}selected.png" class="w-[{width}rem] right-0 bottom-0 absolute {selectedTab === 'Survival Inventory' ? 'z-20' : ''}" alt="">
				</button>

				<img style="image-rendering: pixelated;" src="/gui/tab_items.png" class="w-[57.5rem] z-10 relative" alt="">
			</div>
		{/if}
	</div>
</div>
