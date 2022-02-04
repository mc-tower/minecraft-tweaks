<!-- https://github.com/Cosbgn/tailwindcss-tooltips -->
<script context="module">
	const calcCenterMargin = (left, right) =>
		`calc(-${left}px / 2 + ${right}px / 2)`
</script>

<script>
	/** @type {Boolean} Show tooltip at all or not */
	export let has_tooltip = true,
		/** @type {Boolean} Show tooltip programmatically */
		show = false,
		/** @type {Boolean} Center tooltip vertically */
		center = false

	let tooltipEl,
		contentEl,
		margin_left,
		centered = false

	// calc margin on first 'show' change
	$: if (show) setMargin()

	function setMargin() {
		if (!centered && center) {
			margin_left = calcCenterMargin(
				tooltipEl.offsetWidth,
				contentEl.clientWidth
			)
		}
		centered = true
	}
</script>

<div class:has-tooltip={has_tooltip}>
	<span
		class:show
		bind:this={tooltipEl}
		style:margin-left={margin_left}
		class="tooltip rounded shadow-lg py-1 px-2 bg-gray-100 text-sm text-gray-900 -mt-8">
		<slot name="tooltip" />
	</span>

	<div bind:this={contentEl} on:mouseenter|once={setMargin}>
		<slot name="content" />
	</div>
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
