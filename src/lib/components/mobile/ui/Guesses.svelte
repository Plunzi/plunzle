<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	('lg:');

	const { guesses } = $props();
</script>

{#each guesses as guess, tries (guess)}
	<div
		class:mt-2={tries !== 0}
		in:fade={{ duration: 250 }}
		out:fade={{ duration: 250 }}
		animate:flip={{ duration: 250 }}
		class="flex w-full rounded-xl bg-[#00000050] p-2"
	>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.mob}.png')"
			class="4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat text-center text-base lg:h-28 lg:w-[6.75rem]"
		>
			<span class="absolute left-4 top-2 font-medium text-neutral-200">{guesses.length - tries}</span>
			<div
				class="4xl:h-32 4xl:w-32 flex aspect-square rounded-l-lg bg-contain bg-center bg-no-repeat lg:w-[6.75rem]"
			>
				<div
					class="mx-auto font-minecraft mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat"
					style="background-image: url('/entities{guess.pickedMob.ressource}')"
				></div>
			</div>
			<span class="font-minecraft absolute bottom-6 left-0 right-0 text-center text-base leading-4"
				>{guess.pickedMob.mob}
			</span>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.release}.png')"
			class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
		>
			<span
				class:bottom-6={guess.dailyMob.release !== 'slot_right'}
				class="font-minecraft absolute left-0 right-0 text-center text-base leading-4"
				>{guess.pickedMob.release}
			</span>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.health}.png')"
			class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
		>
			<span
				class:bottom-6={guess.dailyMob.health !== 'slot_right'}
				class="font-minecraft absolute left-0 right-0 text-center text-base leading-4"
				>{guess.pickedMob.health}
			</span>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.height}.png')"
			class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
		>
			<span
				class:bottom-6={guess.dailyMob.height !== 'slot_right'}
				class="font-minecraft absolute left-0 right-0 text-center text-base leading-4"
				>{guess.pickedMob.height}
			</span>
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.behavior}.png')"
			class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
		>
			{#each guess.pickedMob.behavior as behavior}
				<p
					class="font-minecraft bottom-0 left-0 right-0 top-0 flex items-center justify-center text-center text-base leading-4"
				>
					{behavior}
				</p>
			{/each}
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.spawn}.png')"
			class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
		>
			{#each guess.pickedMob.spawn as spawn}
				<p
					class="font-minecraft bottom-0 left-0 right-0 top-0 flex items-center justify-center text-center text-base leading-4"
				>
					{spawn}
				</p>
			{/each}
		</div>
		<div
			style="background-image: url('/gui/sprites/{guess.dailyMob.classification}.png')"
			class="font-minecraft 4xl:h-32 4xl:w-32 relative flex aspect-square w-[14.285%] flex-col items-center justify-center rounded-r-lg bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem]"
		>
			{#each guess.pickedMob.classification as classification}
				<p
					class="font-minecraft bottom-0 left-0 right-0 top-0 flex items-center justify-center text-center text-base leading-4"
				>
					{classification}
				</p>
			{/each}
		</div>
	</div>
{/each}
