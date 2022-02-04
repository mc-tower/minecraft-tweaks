<script context="module">
	import Tooltip from 'src/components/atoms/Tooltip.svelte'
</script>

<script>
	let show = false
</script>

<Tooltip center {show}>
	<svelte:fragment slot="tooltip">Clear</svelte:fragment>

	<img
		on:click
		slot="content"
		on:focus={() => (show = true)}
		on:blur={() => (show = false)}
		src="/assets/images/icons/clear.svg"
		class="cursor-pointer"
		tabindex="0"
		alt="clear" />
</Tooltip>

<style>
	img {
		filter: invert(1);
	}
</style>
