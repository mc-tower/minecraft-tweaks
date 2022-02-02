<script context="module">
	import Checkbox from 'src/components/atoms/Checkbox.svelte'

	import { selectedPacks, selectedPacksOrder } from 'src/stores/packs.js'
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

<Checkbox
	id={path}
	on:change={(e) => handleCheck(path, e)}
	bind:checked={$selectedPacks[path]}
	text_class={currently_incompatible ? 'text-red-500' : ''}>
	{name}
</Checkbox>
