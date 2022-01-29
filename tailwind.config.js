// yes, hardcode
const ui_components = ['Navbar']

module.exports = {
	content: [
		'./src/**/*.svelte',
		...ui_components.map((c) =>
			require.resolve(`@minetower/ui-components/src/${c}.svelte`)
		),
	],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
}
