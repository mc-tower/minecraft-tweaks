<script context="module">
	import { a11yClick } from 'src/actions/a11yClick'

	import Tooltip from 'src/components/atoms/Tooltip.svelte'
</script>

<script>
	export let disabled = false,
		tooltip_text = 'Clear'

	let show = false
</script>

<Tooltip center {show}>
	<svelte:fragment slot="tooltip">{tooltip_text}</svelte:fragment>

	<img
		on:click
		slot="content"
		on:focus={() => (show = true)}
		on:blur={() => (show = false)}
		use:a11yClick
		src="/assets/images/icons/clear.svg"
		class="cursor-pointer"
		class:disabled
		alt="clear" />
</Tooltip>

<style>
	img {
		filter: invert(1);
	}
	img.disabled {
		filter: invert(0.6);
	}
</style>
