<script context="module">
	import { pack_format_mapping } from 'src/utils/pack_format.js'
</script>

<script>
	export let value
</script>

<div class="flex justify-between">
	<select name="pack_format" bind:value class="rounded mb-3 bg-slate-800">
		{#each Object.keys(pack_format_mapping).reverse() as format}
			<option value={format}>{pack_format_mapping[format]}</option>
		{/each}
	</select>
</div>
