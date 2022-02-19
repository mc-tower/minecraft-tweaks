<script context="module">
	import PhX from '~icons/ph/x?raw'

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

	<span
		on:click
		slot="content"
		on:focus={() => (show = true)}
		on:blur={() => (show = false)}
		use:a11yClick
		class:cursor-pointer={!disabled}
		class:disabled
		alt="clear">
		{@html PhX}
	</span>
</Tooltip>

<style>
	span {
		color: white;
	}
	span.disabled {
		@apply text-gray-400;
	}
</style>
