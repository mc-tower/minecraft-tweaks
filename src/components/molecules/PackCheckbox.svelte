<script context="module">
	import Checkbox from 'src/components/atoms/Checkbox.svelte'
	import Tooltip from 'src/components/atoms/Tooltip.svelte'

	import {
		allPacksMapping,
		selectedPacks,
		selectedPacksOrder,
	} from 'src/stores/packs.js'

	const danger_text = 'text-red-500'
</script>

<script>
	export let path,
		name,
		incompatible_list = []

	let show_tooltip = false

	$: currently_incompatible =
		$selectedPacks[path] &&
		incompatible_list.some((p) => $selectedPacksOrder.has(p))
	$: incompatibles = incompatible_list.map((p) => $allPacksMapping[p].name)

	function handleCheck(path, e) {
		if (e.target.checked) {
			selectedPacksOrder.add(path)
		} else {
			selectedPacksOrder.delete(path)
		}
	}
</script>

<Tooltip has_tooltip={incompatible_list.length > 0} show={show_tooltip}>
	<svelte:fragment slot="tooltip">
		<span class={danger_text}>Incompatible with</span>
		{incompatibles.join(', ')}
	</svelte:fragment>

	<Checkbox
		slot="content"
		id={path}
		on:change={(e) => handleCheck(path, e)}
		bind:checked={$selectedPacks[path]}
		on:focus={() => (show_tooltip = true)}
		on:blur={() => (show_tooltip = false)}
		class={currently_incompatible ? danger_text : ''}>
		{name}
	</Checkbox>
</Tooltip>
