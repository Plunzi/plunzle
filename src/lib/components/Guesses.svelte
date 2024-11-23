<script lang="ts">
	import { compareHealth, compareHeight, compareReleaseVersion } from "$lib/compare";
	import { flip } from "svelte/animate";
	import { fade } from "svelte/transition";

    const { guesses, entryFields, selected } = $props();
</script>

{#each guesses as mob (mob)}
	<div
		in:fade={{ duration: 250 }}
		out:fade={{ duration: 250 }}
		animate:flip={{ duration: 250 }}
		class="flex w-fit rounded-xl bg-[#00000050] p-2"
	>
		{#each entryFields as field, i}
			{#if i === 0}
				<div class="relative flex w-fit items-center gap-4 text-lg">
					<div
						class="flex h-32 w-32 rounded-l-lg bg-contain bg-center bg-no-repeat"
						style="background-image: url('/gui/sprites/{mob[field] === selected[field]
							? 'slot_right'
							: 'slot_wrong'}.png')"
					>
						<div
							class="mx-auto mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat"
							style="background-image: url('/entities{mob.ressource}')"
						></div>
					</div>
					<span
						class="absolute bottom-6 left-0 right-0 text-center font-minecraft text-lg leading-4"
						>{mob[field]}
					</span>
				</div>
			{:else if i === 1}
				<div
					style="background-image: url('/gui/sprites/{compareReleaseVersion(
						mob,
						selected.release
					)}.png')"
					class="relative flex h-32 w-32 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg"
				>
					<span
						class:bottom-6={compareReleaseVersion(mob, selected.release) !== 'slot_right'}
						class="absolute left-0 right-0 text-center font-minecraft text-lg leading-4"
						>{mob[field]}
					</span>
				</div>
			{:else if i === 2}
				<div
					style="background-image: url('/gui/sprites/{compareHealth(mob, selected.health)}.png')"
					class="relative flex h-32 w-32 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg"
				>
					<span
						class:bottom-6={compareHealth(mob, selected.health) !== 'slot_right'}
						class="absolute left-0 right-0 text-center font-minecraft text-lg leading-4"
						>{mob[field]}
					</span>
				</div>
			{:else if i === 3}
				<div
					style="background-image: url('/gui/sprites/{compareHeight(mob, selected.height)}.png')"
					class="relative flex h-32 w-32 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg"
				>
					<span
						class:bottom-6={compareHeight(mob, selected.height) !== 'slot_right'}
						class="absolute left-0 right-0 text-center font-minecraft text-lg leading-4"
						>{mob[field]}
					</span>
				</div>
			{:else}
				<div
					class:rounded-r-lg={i == 6}
					style="background-image: url('/gui/sprites/{mob[field] === selected[field]
						? 'slot_right'
						: 'slot_wrong'}.png')"
					class="relative flex h-32 w-32 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg"
				>
					<span
						class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-center font-minecraft text-lg leading-4"
						>{mob[field]}</span
					>
				</div>
			{/if}
		{/each}
	</div>
{/each}
