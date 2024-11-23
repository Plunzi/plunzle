import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'minecraft': ['minecraft', 'inter'],
			},
			screens: {
				'3xl': '1792px', 
				'4xl': '2048px', 
			}
		}
	},

	plugins: []
} satisfies Config;
