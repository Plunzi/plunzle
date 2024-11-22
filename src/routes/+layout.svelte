<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>


<main class="pt-16 flex-grow">
	{@render children()}
</main>
