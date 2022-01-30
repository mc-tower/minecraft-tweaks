<script>
	export let name
</script>

<div class="flex">
	<div class="form-check">
		<input
			class="form-check-input appearance-none h-4 w-4 border rounded-sm checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1.5 align-top mr-2 cursor-pointer"
			type="checkbox"
			on:change
			id={name} />
		<label class="form-check-label cursor-pointer select-none" for={name}>
			<slot />
		</label>
	</div>
</div>
