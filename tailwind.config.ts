import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'minecraft': ['minecraft', 'inter'],
			  }
		}
	},

	plugins: []
} satisfies Config;
