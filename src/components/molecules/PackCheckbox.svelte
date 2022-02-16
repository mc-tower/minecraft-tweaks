<script context="module">
	import Checkbox from 'src/components/atoms/Checkbox.svelte'
	import Tooltip from 'src/components/atoms/Tooltip.svelte'

	import { description as descriptionStore } from 'src/stores/modal'
	import {
		allPacksMapping,
		selectedPacks,
		selectedPacksOrder,
	} from 'src/stores/packs.js'
	import { showPreview, hidePreview } from 'src/stores/preview'

	const danger_text = 'text-red-500'
</script>

<script>
	/** @type {String} Path of pack: 'category/pack' */
	export let path,
		/** @type {String} Name of pack */
		name,
		/** @type {string[]} List of incompatibilities */
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

	$: description = $allPacksMapping[path].description

	function showDescriptionModal() {
		descriptionStore.set({
			name: $allPacksMapping[path].name,
			content: description,
		})
	}

	function handleFocus() {
		show_tooltip = true
		showPreview()
	}
	function handleBlur() {
		show_tooltip = false
		hidePreview()
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
		on:focus={handleFocus}
		on:blur={handleBlur}
		on:mouseenter={() => showPreview(path)}
		on:mouseleave={() => hidePreview()}
		class={currently_incompatible ? danger_text : ''}>
		{name}

		<img
			class:hidden={description === ''}
			on:click={showDescriptionModal}
			class="cursor-pointer"
			src="/assets/images/icons/question-circle.svg"
			slot="right"
			alt="" />
	</Checkbox>
</Tooltip>

<style>
	img {
		filter: invert(1);
	}
</style>
