<script context="module">
	import Button from 'src/components/atoms/Button.svelte'
	import FileInput from 'src/components/atoms/FileInput.svelte'
	import RoundedBox from 'src/components/atoms/RoundedBox.svelte'
	import SelectedList from 'src/components/molecules/SelectedList.svelte'

	import {
		allPacks,
		clearSelectedPacks,
		makeProgress,
		packStatus,
		selectedPacks,
		selectedPacksOrder,
	} from 'src/stores/packs.js'

	import { makePack } from 'src/utils/creator.js'
	import { getPackInfo } from 'src/utils/extractor.js'
	import { pack_format_mapping } from 'src/utils/pack_format.js'

	function downloadButtonText(status) {
		switch (status) {
			case 'none':
			case 'waiting':
				return 'Download'
			case 'download':
				return 'Downloading'
			case 'zip':
				return 'Zipping'
		}
	}
</script>

<script>
	let uploaded = null,
		pack_format = '8'

	async function onFileUpload() {
		if (uploaded) {
			let info = await getPackInfo(uploaded[0])

			clearSelectedPacks()

			info
				.split(';')
				.map((p) => p.replace('rp/', ''))
				.forEach((p) => {
					$selectedPacks[p] = true
					selectedPacksOrder.add(p)
				})
		}
	}
</script>

<RoundedBox class="bg-slate-800">
	<h5 class="text-2xl mb-3">Selector</h5>

	{#if Object.keys($allPacks).length}
		<SelectedList />
	{/if}

	{#if $selectedPacksOrder.size}
		<div class="flex justify-between">
			<select
				name="pack_format"
				bind:value={pack_format}
				class="rounded mb-3 bg-slate-800">
				{#each Object.keys(pack_format_mapping).reverse() as format}
					<option value={format}>{pack_format_mapping[format]}</option>
				{/each}
			</select>
		</div>
	{/if}

	<div class="flex justify-between mb-3">
		<span>
			<Button
				on:click={() => makePack(pack_format)}
				disabled={$packStatus !== 'waiting'}>
				{downloadButtonText($packStatus)}
			</Button>
			<span class="notranslate">
				{#if $makeProgress >= 0}
					{$makeProgress}%
				{/if}
			</span>
		</span>
		<Button on:click={clearSelectedPacks} light>Clear</Button>
	</div>

	<FileInput
		text="Select a pack to edit"
		bind:files={uploaded}
		on:change={onFileUpload} />
</RoundedBox>
