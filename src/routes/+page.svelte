<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import SignIn from '$lib/components/SignIn.svelte';
</script>

<main class="w-full flex-grow h-full">
	<Navigation pageTitle={"Home"} />

	<!-- <a class="absolute inline-flex min-w-max px-6 py-3 justify-center items-center text-xl font-medium border border-[#8043C8] rounded-lg transition-[background-size,box-shadow] duration-[150ms] ease-in-out [--c1:#B301B3] [--c2:#381DBD] [--c3:#381dbd] [--rx:18px] [background-image:radial-gradient(134.26%_244.64%_at_42.92%_-80.36%,var(--c1)_25.45%,var(--c2)_100%)] [background-size:100%_100%] hover:bg-[length:100%_200%] hover:shadow-[0px_0px_8px_0px_rgba(180,40,180,0.35),0px_0px_24px_0px_rgba(102,43,223,0.35)] active:[--c1:#9A059A] active:[--c2:#2409A9] active:scale-95 active:bg-[length:100%_100%] active:shadow-[0px_0px_11.7px_0px_rgba(180,40,180,0.50),0px_0px_28.8px_0px_rgba(102,43,223,0.50)] focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600" href="/new">Deploy a new project</a> -->


	{#if $page.data.session}
		<div class="w-full flex h-full items-center content-center">
			<a href="/mob" class="flex items-center justify-center mx-auto h-12 w-28 rounded-lg border border-[#36bf68] bg-[#2da05a] bg-gradient-to-t from-[#278c4c] to-[#36bf68] px-4 shadow-lg transition-transform hover:bg-[#36bf68] 4xl:w-32">
				<p>Play</p>
			</a>
		</div>
	{:else}
		<SignIn/>
	{/if}
</main>
