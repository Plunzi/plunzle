<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    if (browser && !$page.data.session) {
        goto('/');
    }
</script>

<main class="w-full flex-grow h-full">
	<Navigation pageTitle={"Home"} />

	<p>Protected</p>
</main>
