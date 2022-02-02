<script>
	export let id,
		checked,
		text_class = ''
</script>

<div class="flex">
	<div class="form-check">
		<input
			class="form-check-input appearance-none h-4 w-4 border rounded-sm checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1.5 align-top mr-2 cursor-pointer"
			type="checkbox"
			bind:checked
			on:change
			{id} />
		<label class="form-check-label cursor-pointer {text_class}" for={id}>
			<slot />
		</label>
	</div>
</div>
