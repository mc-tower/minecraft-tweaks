<script context="module">
	import Button from 'src/components/atoms/Button.svelte'
	import RoundedBox from 'src/components/atoms/RoundedBox.svelte'

	import { makeProgress, packStatus } from 'src/stores/packs.js'

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
	<h5 class="text-2xl pb-6">Selector</h5>
	<Button on:click={makePack} disabled={$packStatus !== 'waiting'}>
		{downloadButtonText($packStatus)}
	</Button>
	{#if $makeProgress >= 0}
		{$makeProgress}%
	{/if}
</RoundedBox>
