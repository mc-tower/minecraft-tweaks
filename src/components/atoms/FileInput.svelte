<script>
	/** @type {String} Text to show */
	export let text = 'Select a file',
		/** @type {String|null} Files from input */
		files = null,
		/** @type {String} Input accept attribute */
		accept = '.zip'

	$: displayed = files ? files[0].name : text
</script>

<div class="mx-auto">
	<div class="relative rounded">
		<div
			class="relative border border-gray-200 border-dashed rounded cursor-pointer">
			<input
				{accept}
				type="file"
				bind:files
				on:change
				class="absolute w-full h-full opacity-0"
				tabindex="0"
				title="" />

			<div class="py-1 px-2 text-center">
				<p class="m-0">{displayed}</p>
			</div>
		</div>
	</div>
</div>

<style>
	input[type='file'],
	input[type='file']::-webkit-file-upload-button {
		@apply cursor-pointer;
	}
	input:focus + div {
		@apply text-white;
	}
</style>
