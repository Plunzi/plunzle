<script>
	import GitLab from '$lib/assets/GitLab.svg';
	import Discord from '$lib/assets/Discord.svg';
	import GitHub from '$lib/assets/GitHub.svg';
	import Microsoft from '$lib/assets/Microsoft.svg';
	import Steam from '$lib/assets/Steam.svg';
	import Google from '$lib/assets/Google.svg';
	import { oAuthDiscord, oAuthGitHub, oAuthGoogle, oAuthMicrosoft } from '$lib/signInAction';
	const {} = $props();

    const oAuth = "w-48 p-4 flex gap-4 h-12 rounded-md bg-neutral-900 py-1 items-center";
    const oAuthImage = "w-6 h-6";
</script>

<div class="m-auto flex h-full w-full bg-neutral-950">
	<div class="bg-neutral-950 border border-neutral-800 m-auto p-10 rounded-lg">
		<h1 class="text-lg font-bold">Sign in with</h1>
		<div class="grid grid-cols-2 gap-4">
            <button class={oAuth} onclick={oAuthDiscord}>
                <img class={oAuthImage} src={Discord} alt="gitlab" />
                Discord
            </button>
            <button class={oAuth} onclick={oAuthGitHub}>
                <img class={oAuthImage} src={GitHub} alt="gitlab" />
                GitHub
            </button>
            <button class={oAuth} onclick={oAuthMicrosoft}>
                <img class={oAuthImage} src={Microsoft} alt="gitlab" />
                Microsoft
            </button>
            <button class={oAuth} onclick={oAuthGoogle}>
                <img class={oAuthImage} src={Google} alt="gitlab" />
                Google
            </button>
            <!-- <button class={oAuth} onclick={oAuthGoogle}>
                <img class={oAuthImage} src={Steam} alt="gitlab" />
                Steam
            </button>
            <button class={oAuth} onclick={oAuthGoogle}>
                <img class={oAuthImage} src={GitLab} alt="gitlab" />
                GitLab
            </button> -->
        </div>
	</div>
</div>
