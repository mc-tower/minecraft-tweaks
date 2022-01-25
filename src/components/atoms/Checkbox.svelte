<script>
	export let name
</script>

<label for={name}>
	<input type="checkbox" {name} on:change />
	<slot />
</label>
