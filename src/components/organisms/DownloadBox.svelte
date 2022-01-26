<script context="module">
	import Button from 'src/components/atoms/Button.svelte'
	import RoundedBox from 'src/components/atoms/RoundedBox.svelte'

	import { makePack } from 'src/utils/creator.js'
</script>

<RoundedBox color="bg-slate-800">
	<h5 class="text-2xl pb-6">Selector</h5>
	<Button on:click={makePack}>Download</Button>
</RoundedBox>
