<script context="module">
	import Button from 'src/components/atoms/Button.svelte'
	import RoundedBox from 'src/components/atoms/RoundedBox.svelte'
	import SelectedList from 'src/components/molecules/SelectedList.svelte'

	import {
		allPacks,
		clearSelectedPacks,
		makeProgress,
		packStatus,
		selectedPacksOrder,
	} from 'src/stores/packs.js'

	import { makePack } from 'src/utils/creator.js'

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

<RoundedBox color="bg-slate-800">
	<h5 class="text-2xl mb-3">
		Selector
		{#if $selectedPacksOrder.size}
			({$selectedPacksOrder.size})
		{/if}
	</h5>

	{#if Object.keys($allPacks).length}
		<SelectedList />
	{/if}

	<div class="flex justify-between">
		<span>
			<Button on:click={makePack} disabled={$packStatus !== 'waiting'}>
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
</RoundedBox>
