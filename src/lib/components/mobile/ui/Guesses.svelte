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
		class="flex w-full rounded-xl bg-[#00000050] p-2 lg:max-h-32"
	>
		<div
			class="4xl:h-32 4xl:w-32 relative flex lg:hidden min-w-20 max-w-20 flex-col items-center justify-center lg:w-[108px] lg:max-w-none lg:!bg-transparent {guess
				.dailyMob.mob === 'slot_right'
				? 'bg-green-500'
				: 'bg-red-500'} rounded-l-lg bg-contain bg-center bg-no-repeat text-center text-base"
		>
			<span class="absolute left-4 top-2 font-medium text-neutral-200"
				>{guesses.length - tries}</span
			>
			<div
				class="4xl:h-32 4xl:w-32 flex aspect-square rounded-l-lg bg-contain bg-center bg-no-repeat lg:w-[6.75rem]"
			>
				<div
					class="mx-auto mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat font-minecraft"
					style="background-image: url('/entities{guess.pickedMob.ressource}')"
				></div>
			</div>
			<span class="absolute bottom-6 left-0 right-0 text-center font-minecraft text-base leading-4"
				>{guess.pickedMob.mob}
			</span>
		</div>
		<div
			class="hidden lg:flex 4xl:h-32 4xl:w-32 relative aspect-square w-[14.285%] items-center justify-center bg-contain bg-center bg-no-repeat text-center text-base lg:h-28 lg:w-[6.75rem]"
			style="background-image: url('/gui/sprites/{guess.dailyMob.mob}.png')"
		>
			<div
				class="4xl:h-32 4xl:w-32 flex aspect-square rounded-l-lg bg-contain bg-center bg-no-repeat lg:w-[6.75rem]"
			>
				<div
					class="mx-auto mt-4 h-20 w-20 bg-contain bg-center bg-no-repeat font-minecraft"
					style="background-image: url('/entities{guess.pickedMob.ressource}')"
				></div>
			</div>
			<!-- <img class="w-16" src="/entities/{mob.ressource}" alt={`${mob[field]}`}> -->
			<span class="absolute bottom-6 left-0 right-0 text-center font-minecraft text-sm leading-6"
				>{guess.pickedMob.mob}</span
			>
		</div>
		<div
			class="grid h-[12.5rem] w-full grid-cols-3 grid-rows-2 overflow-hidden rounded-r-lg lg:!bg-transparent {guess
				.dailyMob.mob === 'slot_right'
				? 'bg-green-900'
				: 'bg-red-900'} p-2 sm:h-[7.1rem] sm:grid-cols-6 sm:grid-rows-1 lg:p-0"
		>
			<div
				style="background-image: url('/gui/sprites/{guess.dailyMob.release}.png')"
				class="relative flex aspect-square w-full max-w-[100px] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem] lg:max-w-none"
			>
				<span
					class:bottom-6={guess.dailyMob.release !== 'slot_right'}
					class="absolute left-0 right-0 text-center text-base leading-4"
					>{guess.pickedMob.release}
				</span>
			</div>
			<div
				style="background-image: url('/gui/sprites/{guess.dailyMob.health}.png')"
				class="relative flex aspect-square w-full max-w-[100px] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem] lg:max-w-none"
			>
				<span
					class:bottom-6={guess.dailyMob.health !== 'slot_right'}
					class="absolute left-0 right-0 text-center text-base leading-4"
					>{guess.pickedMob.health}
				</span>
			</div>
			<div
				style="background-image: url('/gui/sprites/{guess.dailyMob.height}.png')"
				class="relative flex aspect-square w-full max-w-[100px] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem] lg:max-w-none"
			>
				<span
					class:bottom-6={guess.dailyMob.height !== 'slot_right'}
					class="absolute left-0 right-0 text-center text-base leading-4"
					>{guess.pickedMob.height}
				</span>
			</div>
			<div
				style="background-image: url('/gui/sprites/{guess.dailyMob.behavior}.png')"
				class="relative flex aspect-square w-full max-w-[100px] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem] lg:max-w-none"
			>
				{#each guess.pickedMob.behavior as behavior}
					<p
						class=" text-center text-base leading-5 {guess.pickedMob.behavior.length >= 4
							? '!text-[10px] !leading-tight'
							: ''} {guess.pickedMob.behavior.length === 3 ? '!text-[14px] !leading-snug' : ''}"
					>
						{behavior}
					</p>
				{/each}
			</div>
			<div
				style="background-image: url('/gui/sprites/{guess.dailyMob.spawn}.png')"
				class="relative flex aspect-square w-full max-w-[100px] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem] lg:max-w-none"
			>
				{#each guess.pickedMob.spawn as spawn}
					<p
						class=" text-center text-base leading-5 {guess.pickedMob.spawn.length >= 4
							? '!text-[10px] !leading-tight'
							: ''} {guess.pickedMob.spawn.length === 3 ? '!text-[14px] !leading-snug' : ''}"
					>
						{spawn}
					</p>
				{/each}
			</div>
			<div
				style="background-image: url('/gui/sprites/{guess.dailyMob.classification}.png')"
				class="relative flex aspect-square w-full max-w-[100px] flex-col items-center justify-center bg-contain bg-center bg-no-repeat p-2 text-center text-base lg:h-28 lg:w-[6.75rem] lg:max-w-none"
			>
				{#each guess.pickedMob.classification as classification}
					<p
						class=" text-center text-base leading-5 {guess.pickedMob.classification.length >= 4
							? '!text-[10px] !leading-tight'
							: ''} {guess.pickedMob.classification.length === 3
							? '!text-[14px] !leading-snug'
							: ''}"
					>
						{classification}
					</p>
				{/each}
			</div>
		</div>
	</div>
{/each}
