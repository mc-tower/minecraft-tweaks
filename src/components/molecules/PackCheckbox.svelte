<script context="module">
	import Checkbox from 'src/components/atoms/Checkbox.svelte'

	import { selectedPacks, selectedPacksOrder } from 'src/stores/packs.js'
</script>

<script>
	export let path, name

	function handleCheck(pack_path, e) {
		if (e.target.checked) {
			selectedPacksOrder.add(pack_path)
		} else {
			selectedPacksOrder.delete(pack_path)
		}
	}
</script>

<Checkbox
	name={path}
	on:change={(e) => handleCheck(path, e)}
	bind:checked={$selectedPacks[path]}>
	{name}
</Checkbox>
