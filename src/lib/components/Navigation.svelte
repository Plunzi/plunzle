<script lang="ts">
    const { pageTitle } = $props();
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
    let expanded = $state(false)
</script>

<nav
	class="fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-950"
>
	<div class="flex h-full items-center gap-4">
		<a
			href="/"
			class="grid h-full w-16 items-center hover:bg-[#0a2620] focus:bg-[#0a2620] focus:outline-none"
		>
			<img
				class="m-auto h-10 w-10 opacity-80 transition-all"
				src="/brand-logo-color.svg"
				alt="Plunzle"
			/>
		</a>
		<div class="flex flex-col">
			<h1 class="text-gradient text-lg font-bold text-neutral-200">Plunzle <span class="text-sm font-medium text-neutral-300">21.11.2024</span></h1>
			<span class="-mt-2 text-sm font-medium text-neutral-500">made by Plunzi</span>
		</div>
		<div class="text-neutral-500">/</div>
		<div class="text-neutral-500">{pageTitle}</div>
	</div>
	<div class="flex-grow px-8">
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
			></button
		>
		<input
			name="quick-overall-search"
			placeholder="Search ..."
			class="w-full rounded-lg bg-[#161616] px-3 py-2 pl-14 text-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#36bf68]"
		/>
	</div>
	<div class="flex mr-4 relative">
		{#if $page.data.session}
        <button
            onclick={() => expanded = !expanded}
			class:!bg-[#2da05a]={expanded}
			class:!ring-[#2da05a]={expanded}
			class:!ring={expanded}
			class:scale-95={expanded}
			class:!text-white={expanded}
			class="z-10 relative bg-neutral-950 focus:bg-neutral-900 hover:bg-neutral-900 flex items-center gap-2 rounded-lg pl-3 hover:ring-neutral-800 focus:ring-neutral-800 text-neutral-500  focus:outline-none focus:ring transition-all hover:ring"
			><p class="pb-0.5">{$page.data.session?.user?.name}</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				fill="currentColor"
				viewBox="0 0 256 256"
				class="h-6 w-6 fill-[currentcolor]"
				data-darkreader-inline-fill=""
				style="--darkreader-inline-fill: currentColor;"
				><rect width="256" height="256" fill="none"></rect><path
					d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"
				></path></svg
			>
			<div
				class="grid h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-lg bg-[#161616] pb-0.5 text-xl font-medium"
			>
				{#if $page.data.session?.user?.image}
					<img
						class="h-10 min-h-10 w-10 min-w-10 rounded-lg"
						src={$page.data.session?.user?.image}
						alt="avatar"
					/>
				{:else}
					{$page.data.session?.user?.name?.charAt(0)}
				{/if}
			</div>
        </button>
        <div class:mt-8={expanded} class:opacity-1={expanded} class:opacity-0={!expanded} class="bg-neutral-900 border hover:text-[#36bf68] hover:bg-green-950 hover:font-semibold hover:border-[#36bf68] transition-all border-neutral-800 text-neutral-500 shadow-lg scale-[0.98] rounded-b-xl absolute h-12 w-full flex items-center">
            <button onclick={() => signOut()} class="mt-1 w-full h-full">Log out</button>
        </div>
        {:else}
        <a
            href="/login"
			class="z-10 h-10 w-16 relative bg-neutral-950 hover:bg-neutral-900 flex items-center gap-2 rounded-lg pl-3 hover:ring-neutral-800 text-neutral-500 focus:bg-[#2da05a] focus:text-white focus:outline-none transition-all focus-within:scale-95 hover:ring focus:ring focus:ring-[#2da05a]"
			><p class="pb-0.5">Log in</p>
        </a>
        {/if}
	</div>
</nav>