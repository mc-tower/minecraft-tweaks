<!-- https://github.com/Cosbgn/tailwindcss-tooltips -->
<script>
	export let show = true
</script>

<div class:has-tooltip={show}>
	<span
		class="tooltip rounded shadow-lg py-1 px-2 bg-gray-100 text-sm text-gray-900 -mt-7">
		<slot name="tooltip" />
	</span>
	<slot name="content" />
</div>

<style>
	.tooltip {
		@apply invisible absolute;
	}
	.has-tooltip:hover .tooltip {
		@apply visible z-50;
	}
</style>
