<script context="module">
	import Checkbox from 'src/components/atoms/Checkbox.svelte'
	import Tooltip from 'src/components/atoms/Tooltip.svelte'

	import {
		getNamesByIds,
		selectedPacks,
		selectedPacksOrder,
	} from 'src/stores/packs.js'

	const danger_text = 'text-red-500'
</script>

<script>
	export let path,
		name,
		incompatible_list = []

	$: currently_incompatible =
		$selectedPacks[path] &&
		incompatible_list.some((p) => $selectedPacksOrder.has(p))

	function handleCheck(path, e) {
		if (e.target.checked) {
			selectedPacksOrder.add(path)
		} else {
			selectedPacksOrder.delete(path)
		}
	}
</script>

<Tooltip show={incompatible_list.length > 0}>
	<svelte:fragment slot="tooltip">
		<span class={danger_text}> Incompatible with </span>
		{getNamesByIds(incompatible_list).join(', ')}
	</svelte:fragment>

	<Checkbox
		slot="content"
		id={path}
		on:change={(e) => handleCheck(path, e)}
		bind:checked={$selectedPacks[path]}
		text_class={currently_incompatible ? danger_text : ''}>
		{name}
	</Checkbox>
</Tooltip>
