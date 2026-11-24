<script lang="ts">
	import './layout.css';
	let { children } = $props();
</script>


<main class="pt-16 flex-grow">
	{@render children()}
</main>
