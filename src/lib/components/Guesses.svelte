<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	const { guesses } = $props();
</script>

{#each guesses as guess, tries (guess)}
	<div
		in:fade={{ duration: 250 }}
		out:fade={{ duration: 250 }}
		animate:flip={{ duration: 250 }}
		class="flex w-fit rounded-xl bg-[#00000050] p-2"
	>
		<div class="relative flex w-fit items-center gap-4 text-lg">
			<span class="absolute left-4 top-2 font-bold text-neutral-300">{guesses.length - tries}</span>
			<div
				class="flex h-28 w-28 rounded-l-lg bg-contain bg-center bg-no-repeat 4xl:h-32 4xl:w-32"
				style="background-image: url('/gui/sprites/{guess.dailyMob.mob}.png')"
			>
				<div
					class="mx-auto mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat"
					style="background-image: url('/entities{guess.pickedMob.ressource}')"
				></div>
			</div>
			<span class="absolute bottom-6 left-0 right-0 text-center font-minecraft text-lg leading-4"
				>{guess.pickedMob.mob}
			</span>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.release}.png')"
			class="relative flex h-28 w-28 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg 4xl:h-32 4xl:w-32"
		>
			<span
				class:bottom-6={guess.dailyMob.release !== 'slot_right'}
				class="absolute left-0 right-0 text-center font-minecraft text-lg leading-4"
				>{guess.pickedMob.release}
			</span>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.health}.png')"
			class="relative flex h-28 w-28 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg 4xl:h-32 4xl:w-32"
		>
			<span
				class:bottom-6={guess.dailyMob.health !== 'slot_right'}
				class="absolute left-0 right-0 text-center font-minecraft text-lg leading-4"
				>{guess.pickedMob.health}
			</span>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.height}.png')"
			class="relative flex h-28 w-28 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg 4xl:h-32 4xl:w-32"
		>
			<span
				class:bottom-6={guess.dailyMob.height !== 'slot_right'}
				class="absolute left-0 right-0 text-center font-minecraft text-lg leading-4"
				>{guess.pickedMob.height}
			</span>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.behavior}.png')"
			class="relative flex h-28 w-28 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg 4xl:h-32 4xl:w-32"
		>
			<span
				class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-center font-minecraft text-lg leading-4"
				>{guess.pickedMob.behavior}</span
			>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.spawn}.png')"
			class="relative flex h-28 w-28 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg 4xl:h-32 4xl:w-32"
		>
			<span
				class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-center font-minecraft text-lg leading-4"
				>{guess.pickedMob.spawn}</span
			>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.classification}.png')"
			class="rounded-r-lg relative flex h-28 w-28 items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center font-minecraft text-lg 4xl:h-32 4xl:w-32"
		>
			<span
				class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-center font-minecraft text-lg leading-4"
				>{guess.pickedMob.classification}</span
			>
		</div>
	</div>
{/each}
