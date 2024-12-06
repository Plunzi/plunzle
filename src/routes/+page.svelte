<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import SignIn from '$lib/components/SignIn.svelte';
</script>

<main class="w-full flex-grow h-full">
	<Navigation pageTitle={"Home"} />

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
