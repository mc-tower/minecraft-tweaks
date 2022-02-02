<script context="module">
	import { loadResourcePacksList } from 'src/api/info.js'

	import DownloadBox from 'src/components/organisms/DownloadBox.svelte'
	import PacksList from 'src/components/organisms/PacksList.svelte'
	import RoundedBox from 'src/components/atoms/RoundedBox.svelte'
</script>

<main
	class="max-w-5xl mx-auto text-xl text-neutral-300 grid grid-cols-3 gap-4 px-4 pt-4">
	<div class="md:col-span-2 col-span-full">
		{#await loadResourcePacksList() then list}
			{#if Object.keys(list).length}
				<PacksList {list} />
			{:else}
				<RoundedBox class="bg-slate-700">
					Cannot load resource packs list.
				</RoundedBox>
			{/if}
		{/await}
	</div>
	<div class="md:col-span-1 col-span-full">
		<DownloadBox />
	</div>
</main>
