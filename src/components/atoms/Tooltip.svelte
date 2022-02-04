<!-- https://github.com/Cosbgn/tailwindcss-tooltips -->
<script>
	/** @type {Boolean} Show tooltip at all or not */
	export let has_tooltip = true,
		/** @type {Boolean} Show tooltip programmatically */
		show = false,
		/** @type {Boolean} Center tooltip vertically */
		center = false

	let width
	$: margin_left = center ? `calc(-${width}px / 4)` : ''
</script>

<div class:has-tooltip={has_tooltip}>
	<span
		class:show
		bind:clientWidth={width}
		style:margin-left={margin_left}
		class="tooltip rounded shadow-lg py-1 px-2 bg-gray-100 text-sm text-gray-900 -mt-8">
		<slot name="tooltip" />
	</span>
	<slot name="content" />
</div>

<style>
	.tooltip {
		@apply invisible absolute;
	}
	.has-tooltip:hover .tooltip,
	.has-tooltip .show {
		@apply visible z-50;
	}
</style>
