<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import SignIn from '$lib/components/SignIn.svelte';

	const MAX_LENGTH = 16;

	let value = $state($page.data.session?.user?.name ?? '');
	let saving = $state(false);

	// keep the field in sync with the saved name after a successful update
	$effect(() => {
		const NAME = $page.data.session?.user?.name;

		if (NAME !== undefined) {
			value = NAME ?? '';
		}
	});
</script>

<main class="h-full w-full flex-grow">
	<Navigation pageTitle={'Settings'} />

	{#if $page.data.session}
		<div class="flex h-full w-full flex-col items-center justify-center">
			<div class="flex w-80 flex-col rounded-lg border border-neutral-800 bg-neutral-950 p-6">
				<h1 class="text-xl font-extrabold text-[#2d9b55]">Change your name</h1>
				<p class="mb-4 mt-1 text-sm text-neutral-500">
					Pick a display name (up to {MAX_LENGTH} characters) so your real name stays private.
				</p>

				<form
					method="POST"
					use:enhance={() => {
						saving = true;
						return async ({ update }) => {
							await update({ invalidateAll: true });
							saving = false;
						};
					}}
				>
					<input
						name="username"
						bind:value
						maxlength={MAX_LENGTH}
						autocomplete="off"
						spellcheck="false"
						placeholder="New name"
						class="h-12 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 text-neutral-200 outline-none transition-colors focus:border-[#2da05a]"
					/>

					<div class="mt-1 flex justify-between text-xs text-neutral-600">
						<span>Letters, numbers, spaces and _ . -</span>
						<span>{value.length}/{MAX_LENGTH}</span>
					</div>

					<button
						type="submit"
						disabled={saving}
						class="mt-4 flex h-12 w-full items-center justify-center rounded-lg border border-[#36bf68] bg-[#2da05a] bg-gradient-to-t from-[#278c4c] to-[#36bf68] shadow-lg transition-transform hover:bg-[#36bf68] disabled:opacity-60"
					>
						{saving ? 'Saving...' : 'Save'}
					</button>

					{#if $page.form?.error}
						<p class="mt-3 text-sm text-red-400">{$page.form.error}</p>
					{:else if $page.form?.success}
						<p class="mt-3 text-sm text-[#36bf68]">Your name was updated.</p>
					{/if}
				</form>
			</div>
		</div>
	{:else}
		<SignIn />
	{/if}
</main>
