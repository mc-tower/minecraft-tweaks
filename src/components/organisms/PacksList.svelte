<script context="module">
	import Category from 'src/components/organisms/Category.svelte'
</script>

<script>
	export let list = []
</script>

{#each list.categories as category (category.id)}
	<Category {category} />
{/each}
