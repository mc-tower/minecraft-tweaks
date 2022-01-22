/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	alias: {
		src: './src',
	},
	mount: {
		public: {
			url: '/',
			static: true,
			resolve: false,
		},
		src: '/dist',
	},
	plugins: ['@snowpack/plugin-svelte', '@snowpack/plugin-postcss'],
	routes: [
		/* Enable an SPA Fallback in development: */
		// { match: 'routes', src: '.*', dest: '/index.html' },
	],
	optimize: {
		// bundle: true,
		minify: true,
		sourcemap: false,
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		open: 'none',
		tailwindConfig: './tailwind.config.js',
	},
	buildOptions: {
		htmlFragments: true,
		// baseUrl: '/',
		metaUrlPath: 'snowpack',
	},
}
