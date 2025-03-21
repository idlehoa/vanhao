import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html', 
		}),
		paths: {
			base: process.env.NODE_ENV === "production" ? process.env.BASE_PATH || "" : "",
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				if (message.includes('404')) {
					console.warn(`R not found: ${path}`);
					return;
				}
				throw new Error(message);
			},
		},
	},
	extensions: ['.svelte', '.svx']
};

export default config;
