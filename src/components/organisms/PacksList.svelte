<script context="module">
	import { onMount } from 'svelte'

	import Category from 'src/components/organisms/Category.svelte'

	import { allPacks } from 'src/stores/packs.js'
</script>

<script>
	export let list = {}

	onMount(() => {
		allPacks.set(list)
	})
</script>

{#each list.categories as category (category.id)}
	<Category {category} />
{/each}
