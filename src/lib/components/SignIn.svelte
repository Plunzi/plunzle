<script lang="ts">
	import Discord from '#lib/assets/Discord.svg';
	import GitHub from '#lib/assets/GitHub.svg';
	import {
		oAuthDiscord,
		oAuthGitHub,
		signInWithUsername,
		signUpWithUsername
	} from '#lib/signInAction.ts';
	const {} = $props();

	const oAuth = 'w-48 p-4 flex gap-4 h-12 rounded-md bg-neutral-900 py-1 items-center justify-center';
	const oAuthImage = 'w-6 h-6';
	const input =
		'w-full rounded-md bg-neutral-900 px-3 py-2 outline-none border border-neutral-800 focus:border-neutral-600';

	let mode = $state<'sign-in' | 'sign-up'>('sign-in');
	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		error = '';
		loading = true;
		const result =
			mode === 'sign-up'
				? await signUpWithUsername(username, password)
				: await signInWithUsername(username, password);
		loading = false;
		if (result) error = result.message ?? 'Something went wrong.';
	}
</script>

<div class="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-neutral-950">
	<div class="lg:bg-neutral-950 lg:border lg:border-neutral-800 flex flex-col px-4 lg:p-10 rounded-lg">
		<h1 class="text-xl font-extrabold text-[#2d9b55]">Preview Version</h1>
		<p class="text-md -mt-1">Sign to beta test</p>
		<form class="mt-6 flex flex-col gap-3" onsubmit={submit}>
			<input
				class={input}
				type="text"
				name="username"
				placeholder="Username"
				autocomplete="username"
				bind:value={username}
				required
			/>
			<input
				class={input}
				type="password"
				name="password"
				placeholder="Password"
				autocomplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
				bind:value={password}
				required
			/>
			{#if error}
				<p class="text-sm text-red-500">{error}</p>
			{/if}
			<button
				type="submit"
				class="h-12 rounded-md bg-[#2d9b55] font-semibold text-white disabled:opacity-50"
				disabled={loading}
			>
				{mode === 'sign-up' ? 'Create account' : 'Sign in'}
			</button>
		</form>
		<button
			type="button"
			class="mt-2 text-sm text-neutral-400 hover:text-neutral-200"
			onclick={() => {
				mode = mode === 'sign-up' ? 'sign-in' : 'sign-up';
				error = '';
			}}
		>
			{mode === 'sign-up' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
		</button>
		<hr class="mb-8 mt-6 border-neutral-800" />
		<div class="grid grid-cols-2 gap-4">
			<button class={oAuth} onclick={oAuthDiscord} type="button">
				<img class={oAuthImage} src={Discord} alt="discord" />
				Discord
			</button>
			<button class={oAuth} onclick={oAuthGitHub} type="button">
				<img class={oAuthImage} src={GitHub} alt="github" />
				GitHub
			</button>
		</div>
	</div>
</div>
