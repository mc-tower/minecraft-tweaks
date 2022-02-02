<script context="module">
	import {
		allPacks,
		getNamesByIds,
		selectedPacksOrder,
	} from 'src/stores/packs.js'
</script>

{#if Object.keys($allPacks).length}
	<ul class="mb-3">
		{#each getNamesByIds(Array.from($selectedPacksOrder)) as pack}
			<li><i>{pack}</i></li>
		{/each}
	</ul>
{/if}
