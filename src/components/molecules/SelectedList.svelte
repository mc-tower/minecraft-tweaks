<script context="module">
	import AkarIconsDragHorizontal from '~icons/akar-icons/drag-horizontal?raw&width=17&height=17'

	import {
		allPacksMapping as packs,
		selectedPacksOrder,
	} from 'src/stores/packs.js'
</script>

<script>
	let dragover_ind = -1,
		dragging_ind = -1

	$: ids = Array.from($selectedPacksOrder)
	$: incompatibles = ids.map((id, ind) =>
		// find packs that will be overwritten by packs from the top
		ids.slice(0, ind).some((p) => $packs[p].incompatible.some((i) => id === i))
	)
	$: mapping = ids.map((id, ind) => [ind, $packs[id]?.name])

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
			class:text-red-500={incompatibles[id]}
			class="bg-slate-700 px-2 mb-1 rounded flex justify-between">
			<i>{name}</i>
			<span class="icon mt-2" draggable="false">
				{@html AkarIconsDragHorizontal}
			</span>
		</li>
	{/each}
</ul>

<style>
	li {
		cursor: move;
		cursor: grab;
	}
	span.icon {
		@apply text-gray-300;
	}
	@media (pointer: coarse) {
		span.icon {
			@apply hidden;
		}
	}
</style>
