<script context="module">
	import { slide } from 'svelte/transition'

	import RoundedBox from 'src/components/atoms/RoundedBox.svelte'
	import PackCheckbox from 'src/components/molecules/PackCheckbox.svelte'
</script>

<script>
	export let category

	let opened = false
	function toggleOpen() {
		opened = !opened
	}
</script>

<RoundedBox class="bg-slate-700 select-none">
	<h5 class="text-3xl cursor-pointer" role="button" on:click={toggleOpen}>
		{category.name}
	</h5>

	{#if opened}
		<div class="pt-6" transition:slide={{ duration: 100 }}>
			{#each category.packs as pack (pack.id)}
				<PackCheckbox
					path={category.id + '/' + pack.id}
					name={pack.name}
					incompatible_list={pack.incompatible} />
			{/each}
		</div>
	{/if}
</RoundedBox>
