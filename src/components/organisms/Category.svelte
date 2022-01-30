<script context="module">
	import { slide } from 'svelte/transition'

	import Checkbox from 'src/components/atoms/Checkbox.svelte'
	import RoundedBox from 'src/components/atoms/RoundedBox.svelte'

	import { selectedPacks } from 'src/stores/packs.js'
</script>

<script>
	export let category

	let opened = false
	function toggleOpen() {
		opened = !opened
	}
</script>

<RoundedBox color="bg-slate-700" className="select-none">
	<h5 class="text-3xl cursor-pointer" on:click={toggleOpen}>
		{category.name}
	</h5>

	{#if opened}
		<div class="pt-6" transition:slide={{ duration: 100 }}>
			{#each category.packs as pack (pack.id)}
				{@const path = category.id + '/' + pack.id}
				<Checkbox name={path} bind:checked={$selectedPacks[path]}>
					{pack.name}
				</Checkbox>
			{/each}
		</div>
	{/if}
</RoundedBox>
