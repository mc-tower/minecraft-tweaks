<script>
	export let text = 'Select a file',
		files = null

	let input = null

	$: displayed = files ? files[0].name : text
</script>

<div class="mx-auto mt-3">
	<div class="relative rounded">
		<div
			class="relative border border-gray-200 border-dashed rounded"
			on:click={() => input.click()}>
			<input
				accept=".zip"
				type="file"
				bind:files
				on:change
				bind:this={input}
				class="hidden"
				title="" />

			<div class="py-1 px-2 text-center cursor-pointer">
				<p>{displayed}</p>
			</div>
		</div>
	</div>
</div>
