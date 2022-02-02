<script context="module">
	import { getNamesByIds, selectedPacksOrder } from 'src/stores/packs.js'
</script>

<script>
	let dragover_ind = -1,
		dragging_ind = -1

	$: ids = Array.from($selectedPacksOrder)
	$: names = getNamesByIds(ids)
	$: mapping = ids.map((_, ind) => [ind, names[ind]])

	function handleDragEnd() {
		dragover_ind = -1
		dragging_ind = -1
	}

	function handleDrop() {
		if (dragover_ind === -1 || dragover_ind === dragging_ind) {
			return
		}

		let list

		// set dragging_ind element on dragover_ind position
		if (dragover_ind < dragging_ind) {
			list = [
				ids.slice(0, dragover_ind),
				ids[dragging_ind],
				ids.slice(dragover_ind, dragging_ind),
				ids.slice(dragging_ind + 1),
			]
		} else {
			list = [
				ids.slice(0, dragging_ind),
				ids.slice(dragging_ind + 1, dragover_ind + 1),
				ids[dragging_ind],
				ids.slice(dragover_ind + 1),
			]
		}

		selectedPacksOrder.set(list.flat())

		handleDragEnd()
	}
</script>

<ul class="mb-4">
	{#each mapping as [id, name]}
		<li
			draggable="true"
			on:dragstart={() => (dragging_ind = id)}
			on:dragover|preventDefault={() => (dragover_ind = id)}
			on:dragend={handleDragEnd}
			on:drop={handleDrop}
			class:opacity-50={dragging_ind === id || dragover_ind === id}
			class="bg-slate-700 px-2 mb-1 rounded flex justify-between">
			<i>{name}</i>
			<img
				src="/assets/images/drag-horizontal.svg"
				width="17"
				class="hidden md:block"
				draggable="false"
				alt="" />
		</li>
	{/each}
</ul>

<style>
	li {
		cursor: move;
		cursor: grab;
	}
	img {
		filter: invert(0.8);
	}
</style>
