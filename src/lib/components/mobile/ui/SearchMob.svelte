<script lang="ts">
	import { onMount } from 'svelte';
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
	let selectedTab:
		| 'Building Blocks'
		| 'Colored Blocks'
		| 'Natural Blocks'
		| 'Functional Blocks'
		| 'Redstone Blocks'
		| 'Saved Hotbars'
		| 'Search Items'
		| 'Tools & Utilities'
		| 'Combat'
		| 'Food & Drinks'
		| 'Ingredients'
		| 'Spawn Eggs'
		| 'Operator Utilities'
		| 'Survival Inventory' = $state('Building Blocks');

	let {
		searchTerm,
		entryFields,
		sortField = $bindable(),
		filteredMobs,
		entities = $bindable(),
		guesses = $bindable(),
		finished = $bindable(),
		mode
	} = $props();

	const verifyField = async (field: Entry) => {
		// remove entry from list
		entities = entities.filter((filterEntry: Entry) => filterEntry !== field);

		// send verification request
		const requestDailyMobVerification = await fetch('/api/verify/mob', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ mob: field.mob })
		});
		let dailyMob = await requestDailyMobVerification.json();

		// add guess or readd entry
		if (dailyMob.success === true) {
			guesses = [{ dailyMob: dailyMob.data, pickedMob: field }, ...guesses];

			if (dailyMob.data.mob === 'slot_right') {
				finished = true;
			}
		} else {
			alert(`Error: ${dailyMob.error}`);
			entities.push(field);
		}
	};

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

	function isVersionInRange(mob: Entry, minVersion: string, maxVersion: string): boolean {
		// If either min or max version is not provided, skip filtering
		if (!minVersion && !maxVersion) return true;
		if (!mob.release) return false;

		// Check min version
		const minCheck = minVersion ? compareVersions(mob.release, minVersion) >= 0 : true;

		// Check max version
		const maxCheck = maxVersion ? compareVersions(mob.release, maxVersion) <= 0 : true;

		return minCheck && maxCheck;
	}

	// Rune-based reactive variables
	let options = $state({
		minRelease: 'pre-alpha',
		maxRelease: '1.21.4',
		minHealth: '',
		maxHealth: '',
		minHeigth: '',
		maxHeigth: '',
		behavior: '',
		spawn: '',
		classification: ''
	});

	let releaseVersions: any = $state([]);

	onMount(() => {
		let versions = entities.map((mob: Entry) => mob.release);
		releaseVersions = [...new Set(versions)].sort();
	});

	// Derived rune for filtering
	const filteredEntries = $derived.by(() => {
		return filteredMobs.filter((entry: Entry) =>
			isVersionInRange(entry, options.minRelease, options.maxRelease)
		);
	});
</script>

{#if mode === 'search'}
	{#if filteredMobs.length === 0}
		<p class="flex h-16 items-center justify-center rounded-xl bg-[#00000050] text-center">
			There is currently no mob with this name!
		</p>
	{:else}
		{#each filteredMobs as mob, i (mob)}
			<button
				class:mt-2={i !== 0}
				onclick={() => verifyField(mob)}
				in:fade={{ duration: 250 }}
				out:fade={{ duration: 250 }}
				animate:flip={{ duration: 250 }}
				class="flex w-full cursor-pointer rounded-xl bg-[#00000050] p-2 hover:bg-[#36bf6850]"
			>
				{#each entryFields as field, i}
					{#if i === 0}
						<div
							class="4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat text-center text-base lg:h-28 lg:w-[6.75rem]"
							style="background-image: url('/gui/sprites/slot.png')"
						>
							<div
								class="4xl:h-32 4xl:w-32 flex aspect-square rounded-l-lg bg-contain bg-center bg-no-repeat lg:w-[6.75rem]"
							>
								<div
									class="font-minecraft mx-auto mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat"
									style="background-image: url('/entities{mob.ressource}')"
								></div>
							</div>
							<!-- <img class="w-16" src="/entities/{mob.ressource}" alt={`${mob[field]}`}> -->
							<span
								class="font-minecraft absolute bottom-6 left-0 right-0 text-center text-sm leading-6"
								>{mob[field]}</span
							>
						</div>
					{:else if i === 4}
						<div
							style="background-image: url('/gui/sprites/slot.png')"
							class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
						>
							{#each mob[field] as display}
								<p class="font-minecraft text-center text-base leading-5">
									{display}
								</p>
							{/each}
						</div>
					{:else if i === 5}
						<div
							style="background-image: url('/gui/sprites/slot.png')"
							class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
						>
							{#each mob[field] as display}
								<p class="font-minecraft text-center text-base leading-5">
									{display}
								</p>
							{/each}
						</div>
					{:else if i === 6}
						<div
							style="background-image: url('/gui/sprites/slot.png')"
							class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] flex-col items-center justify-center rounded-r-lg bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
						>
							{#each mob[field] as display}
								<p class="font-minecraft text-center text-base leading-5">
									{display}
								</p>
							{/each}
						</div>
					{:else}
						<div
							style="background-image: url('/gui/sprites/slot.png')"
							class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
						>
							<p class="font-minecraft text-center text-base leading-5">
								{mob[field]}
							</p>
						</div>
					{/if}
				{/each}
			</button>
		{/each}
	{/if}
{:else if mode === 'creative inventory'}
	<div class="relative">
		<h1 class="font-minecraft absolute left-[2.5rem] top-[9rem] z-50 text-[2.5rem] text-[#404040]">
			{selectedTab}
		</h1>
		<!-- top left -->
		<button
			style="transform: translate(1px, 17px);"
			onmousedown={() => (selectedTab = 'Building Blocks')}
			class="relative flex items-center justify-center {selectedTab === 'Building Blocks'
				? 'z-20'
				: ''}"
		>
			<img
				class="absolute z-50 h-16 w-16"
				src="/gui/categories/Building Blocks.png"
				alt="Building Blocks Category"
			/>
			<img
				style="image-rendering: pixelated; width: {width}rem;"
				src="/gui/sprites/tab_top_left_{selectedTab === 'Building Blocks' ? '' : 'un'}selected.png"
				alt="Building Blocks Icon"
			/>
		</button>
		<!-- top middle -->
		<button
			style="transform: translate(1px, 17px); left: {(width + gap) * 1}rem;"
			onmousedown={() => (selectedTab = 'Colored Blocks')}
			class="absolute top-0 flex items-center justify-center {selectedTab === 'Colored Blocks'
				? 'z-20'
				: ''}"
		>
			<img
				class="absolute z-50 h-16 w-16"
				src="/gui/categories/Colored Blocks.webp"
				alt="Colored Blocks Category"
			/>
			<img
				style="image-rendering: pixelated; width: {width}rem;"
				src="/gui/sprites/tab_top_middle_{selectedTab === 'Colored Blocks' ? '' : 'un'}selected.png"
				alt=""
			/>
		</button>
		<button
			style="transform: translate(1px, 17px); left: {(width + gap) * 2}rem;"
			onmousedown={() => (selectedTab = 'Natural Blocks')}
			class="absolute top-0 flex items-center justify-center {selectedTab === 'Natural Blocks'
				? 'z-20'
				: ''}"
		>
			<img
				class="absolute z-50 h-16 w-16"
				src="/gui/categories/Natural Blocks.png"
				alt="Natural Blocks Category"
			/>
			<img
				style="image-rendering: pixelated; width: {width}rem;"
				src="/gui/sprites/tab_top_middle_{selectedTab === 'Natural Blocks' ? '' : 'un'}selected.png"
				alt=""
			/>
		</button>
		<button
			style="transform: translate(1px, 17px); left: {(width + gap) * 3}rem;"
			onmousedown={() => (selectedTab = 'Functional Blocks')}
			class="absolute top-0 flex items-center justify-center {selectedTab === 'Functional Blocks'
				? 'z-20'
				: ''}"
		>
			<img
				class="absolute z-50 h-16 w-16"
				src="/gui/categories/Functional Blocks.png"
				alt="Functional Blocks Category"
			/>
			<img
				style="image-rendering: pixelated; width: {width}rem;"
				src="/gui/sprites/tab_top_middle_{selectedTab === 'Functional Blocks'
					? ''
					: 'un'}selected.png"
				alt=""
			/>
		</button>
		<button
			style="transform: translate(1px, 17px); left: {(width + gap) * 4}rem;"
			onmousedown={() => (selectedTab = 'Redstone Blocks')}
			class="absolute top-0 flex items-center justify-center {selectedTab === 'Redstone Blocks'
				? 'z-20'
				: ''}"
		>
			<img
				class="absolute z-50 h-16 w-16"
				src="/gui/categories/Redstone Blocks.png"
				alt="Redstone Blocks Category"
			/>
			<img
				style="image-rendering: pixelated; width: {width}rem;"
				src="/gui/sprites/tab_top_middle_{selectedTab === 'Redstone Blocks'
					? ''
					: 'un'}selected.png"
				alt=""
			/>
		</button>
		<!-- top right -->
		<button
			style="transform: translate(-1px, 17px); right: {(width + gap) * 1}rem;"
			onmousedown={() => (selectedTab = 'Saved Hotbars')}
			class="absolute top-0 flex items-center justify-center {selectedTab === 'Saved Hotbars'
				? 'z-20'
				: ''}"
		>
			<img
				class="absolute z-50 h-16 w-16"
				src="/gui/categories/Saved Hotbars.png"
				alt="Saved Hotbars Category"
			/>
			<img
				style="image-rendering: pixelated; width: {width}rem;"
				src="/gui/sprites/tab_top_middle_{selectedTab === 'Saved Hotbars' ? '' : 'un'}selected.png"
				alt=""
			/>
		</button>
		<button
			style="transform: translate(-1px, 17px); right: 0;"
			onmousedown={() => (selectedTab = 'Search Items')}
			class="absolute top-0 flex items-center justify-center {selectedTab === 'Search Items'
				? 'z-20'
				: ''}"
		>
			<img
				class="absolute z-50 h-16 w-16"
				src="/gui/categories/Search Items.png"
				alt="Search Items Category"
			/>
			<img
				style="image-rendering: pixelated; width: {width}rem;"
				src="/gui/sprites/tab_top_right_{selectedTab === 'Search Items' ? '' : 'un'}selected.png"
				alt=""
			/>
		</button>

		<!-- bottom left -->
		<button onmousedown={() => (selectedTab = 'Tools & Utilities')} class="contents">
			<img
				style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem;"
				src="/gui/sprites/tab_bottom_left_{selectedTab === 'Tools & Utilities'
					? ''
					: 'un'}selected.png"
				class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Tools & Utilities' ? 'z-20' : ''}"
				alt=""
			/>
		</button>
		<!-- bottom middle -->
		<button onmousedown={() => (selectedTab = 'Combat')} class="contents">
			<img
				style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem; left: {(width +
					gap) *
					1}rem;"
				src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Combat' ? '' : 'un'}selected.png"
				class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Combat' ? 'z-20' : ''}"
				alt=""
			/>
		</button>
		<button onmousedown={() => (selectedTab = 'Food & Drinks')} class="contents">
			<img
				style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem; left: {(width +
					gap) *
					2}rem;"
				src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Food & Drinks'
					? ''
					: 'un'}selected.png"
				class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Food & Drinks' ? 'z-20' : ''}"
				alt=""
			/>
		</button>
		<button onmousedown={() => (selectedTab = 'Ingredients')} class="contents">
			<img
				style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem; left: {(width +
					gap) *
					3}rem;"
				src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Ingredients' ? '' : 'un'}selected.png"
				class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Ingredients' ? 'z-20' : ''}"
				alt=""
			/>
		</button>
		<button onmousedown={() => (selectedTab = 'Spawn Eggs')} class="contents">
			<img
				style="image-rendering: pixelated; transform: translate(1px, 109px); width: {width}rem; left: {(width +
					gap) *
					4}rem;"
				src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Spawn Eggs' ? '' : 'un'}selected.png"
				class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Spawn Eggs' ? 'z-20' : ''}"
				alt=""
			/>
		</button>
		<!-- bottom right -->
		<button onmousedown={() => (selectedTab = 'Operator Utilities')} class="contents">
			<img
				style="image-rendering: pixelated; transform: translate(-1px, 109px); width: {width}rem; right: {(width +
					gap) *
					1}rem;"
				src="/gui/sprites/tab_bottom_middle_{selectedTab === 'Operator Utilities'
					? ''
					: 'un'}selected.png"
				class="w-[{width}rem] absolute bottom-0 {selectedTab === 'Operator Utilities'
					? 'z-20'
					: ''}"
				alt=""
			/>
		</button>
		<button onmousedown={() => (selectedTab = 'Survival Inventory')} class="contents">
			<img
				style="image-rendering: pixelated; transform: translate(-1px, 109px); width: {width}rem;"
				src="/gui/sprites/tab_bottom_right_{selectedTab === 'Survival Inventory'
					? ''
					: 'un'}selected.png"
				class="w-[{width}rem] absolute bottom-0 right-0 {selectedTab === 'Survival Inventory'
					? 'z-20'
					: ''}"
				alt=""
			/>
		</button>

		<img
			style="image-rendering: pixelated;"
			src="/gui/tab_items.png"
			class="relative z-10 w-[57.5rem]"
			alt=""
		/>
	</div>
{:else if mode === 'filter'}
	<div
		class="h-30 sticky left-8 right-0 top-0 z-10 w-fit rounded-xl bg-[#00000050] p-2 backdrop-blur-sm"
	>
		<div class="flex rounded-lg bg-[#00000090] backdrop-blur-sm">
			{#each entryFields as field}
				<button
					onclick={() => (sortField = field)}
					class="4xl:w-32 relative z-10 flex h-12 w-28 items-center gap-4 text-lg"
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
				class="4xl:w-32 absolute left-0 h-12 w-28 rounded-lg border border-[#36bf68] bg-[#2da05a] bg-gradient-to-t from-[#278c4c] to-[#36bf68] px-4 shadow-lg transition-transform hover:bg-[#36bf68]"
			></div>
		</div>
		<div class="mt-2 flex gap-2">
			<button
				class="4xl:w-32 relative z-10 flex h-12 w-40 items-center gap-4 rounded-lg border-neutral-800 bg-[#00000090] text-lg text-neutral-500 hover:bg-[#0a2620] hover:ring-1 hover:ring-[#36bf68] focus:bg-[#0a2620] focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
			>
				<span
					class="absolute left-0 right-0 my-auto text-center text-lg text-neutral-300"
					class:-translate-y-2={true}>release</span
				>
				<span class="absolute left-0 right-0 my-auto text-center text-sm" class:translate-y-3={true}
					>{options.minRelease} - {options.maxRelease}</span
				>
			</button>
			{#if options.minHealth || options.maxHealth}
				<button
					class="4xl:w-32 relative z-10 flex h-12 w-40 items-center gap-4 rounded-lg border-neutral-800 bg-[#00000090] text-lg text-neutral-500 hover:bg-[#0a2620] hover:ring-1 hover:ring-[#36bf68] focus:bg-[#0a2620] focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
				>
					<span
						class="absolute left-0 right-0 my-auto text-center text-lg text-neutral-300"
						class:-translate-y-2={true}>health</span
					>
					<span
						class="absolute left-0 right-0 my-auto text-center text-sm"
						class:translate-y-3={true}>{options.minHealth} - {options.maxHealth}</span
					>
				</button>
			{/if}
			{#if options.minHeigth || options.minHeigth}
				<button
					class="4xl:w-32 relative z-10 flex h-12 w-40 items-center gap-4 rounded-lg border-neutral-800 bg-[#00000090] text-lg text-neutral-500 hover:bg-[#0a2620] hover:ring-1 hover:ring-[#36bf68] focus:bg-[#0a2620] focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
				>
					<span
						class="absolute left-0 right-0 my-auto text-center text-lg text-neutral-300"
						class:-translate-y-2={true}>height</span
					>
					<span
						class="absolute left-0 right-0 my-auto text-center text-sm"
						class:translate-y-3={true}>{options.minHeigth} - {options.maxHealth}</span
					>
				</button>
			{/if}
			{#if options.behavior}
				<button
					class="4xl:w-32 relative z-10 flex h-12 w-40 items-center gap-4 rounded-lg border-neutral-800 bg-[#00000090] text-lg text-neutral-500 hover:bg-[#0a2620] hover:ring-1 hover:ring-[#36bf68] focus:bg-[#0a2620] focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
				>
					<span
						class="absolute left-0 right-0 my-auto text-center text-lg text-neutral-300"
						class:-translate-y-2={true}>behavior</span
					>
					<span
						class="absolute left-0 right-0 my-auto text-center text-sm"
						class:translate-y-3={true}>{options.behavior}</span
					>
				</button>
			{/if}
			{#if options.spawn}
				<button
					class="4xl:w-32 relative z-10 flex h-12 w-40 items-center gap-4 rounded-lg border-neutral-800 bg-[#00000090] text-lg text-neutral-500 hover:bg-[#0a2620] hover:ring-1 hover:ring-[#36bf68] focus:bg-[#0a2620] focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
				>
					<span
						class="absolute left-0 right-0 my-auto text-center text-lg text-neutral-300"
						class:-translate-y-2={true}>spawn</span
					>
					<span
						class="absolute left-0 right-0 my-auto text-center text-sm"
						class:translate-y-3={true}>{options.spawn}</span
					>
				</button>
			{/if}
			{#if options.classification}
				<button
					class="4xl:w-32 relative z-10 flex h-12 w-40 items-center gap-4 rounded-lg border-neutral-800 bg-[#00000090] text-lg text-neutral-500 hover:bg-[#0a2620] hover:ring-1 hover:ring-[#36bf68] focus:bg-[#0a2620] focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
				>
					<span
						class="absolute left-0 right-0 my-auto text-center text-lg text-neutral-300"
						class:-translate-y-2={true}>classification</span
					>
					<span
						class="absolute left-0 right-0 my-auto text-center text-sm"
						class:translate-y-3={true}>{options.classification}</span
					>
				</button>
			{/if}
			<div class="ml-auto flex items-center gap-2 text-gray-500">
				<span>soon</span>
				<button class="h-10 w-10 rounded-lg bg-[#00000090] text-lg text-gray-300">+</button>
			</div>
		</div>
		<div class="mt-2 flex h-20 w-full flex-col rounded-lg bg-[#00000050] p-2">
			<h1 class="-translate-y-1 font-medium text-neutral-300">
				Edit filter: <span class="text-[#2da05a]">Release</span>
			</h1>
			<div class="flex h-10 items-center gap-2">
				<select class="h-10 w-full rounded-lg text-center" bind:value={options.minRelease}>
					{#each releaseVersions as version}
						<option value={version}>{version}</option>
					{/each}
				</select>
				to
				<select class="h-10 w-full rounded-lg text-center" bind:value={options.maxRelease}>
					{#each releaseVersions as version}
						<option value={version}>{version}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	{#if filteredEntries.length === 0}
		<p class="flex h-16 items-center justify-center rounded-xl bg-[#00000050] text-center">
			There is currently no mob with this name!
		</p>
	{:else}
		{#each filteredEntries as mob (mob)}
			<button
				onclick={() => verifyField(mob)}
				in:fade={{ duration: 250 }}
				out:fade={{ duration: 250 }}
				animate:flip={{ duration: 250 }}
				class="flex w-fit cursor-pointer rounded-xl bg-[#00000050] p-2 hover:bg-[#36bf6850]"
			>
				{#each entryFields as field, i}
					{#if i === 0}
						<div class="relative flex w-fit items-center gap-4 text-lg">
							<div
								class="4xl:h-32 4xl:w-32 flex h-28 w-28 rounded-l-lg bg-contain bg-center bg-no-repeat"
								style="background-image: url('/gui/sprites/slot.png')"
							>
								<div
									class="mx-auto mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat"
									style="background-image: url('/entities{mob.ressource}')"
								></div>
							</div>
							<!-- <img class="w-16" src="/entities/{mob.ressource}" alt={`${mob[field]}`}> -->
							<span
								class="font-minecraft absolute bottom-6 left-0 right-0 text-center text-sm leading-6"
								>{mob[field]}</span
							>
						</div>
					{:else if i === 4}
						<div
							style="background-image: url('/gui/sprites/slot.png')"
							class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
						>
							{#each mob[field] as display}
								<p class="font-minecraft text-center text-base leading-5">
									{display}
								</p>
							{/each}
						</div>
					{:else if i === 5}
						<div
							style="background-image: url('/gui/sprites/slot.png')"
							class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
						>
							{#each mob[field] as display}
								<p class="font-minecraft text-center text-base leading-5">
									{display}
								</p>
							{/each}
						</div>
					{:else if i === 6}
						<div
							style="background-image: url('/gui/sprites/slot.png')"
							class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] flex-col items-center justify-center rounded-r-lg bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
						>
							{#each mob[field] as display}
								<p class="font-minecraft text-center text-base leading-5">
									{display}
								</p>
							{/each}
						</div>
					{:else}
						<div
							style="background-image: url('/gui/sprites/slot.png')"
							class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
						>
							<p class="font-minecraft text-center text-base leading-5">
								{mob[field]}
							</p>
						</div>
					{/if}
				{/each}
			</button>
		{/each}
	{/if}
{/if}
