<script>
	export let name
</script>

<label for={name}>
	<input type="checkbox" {name} />
	<slot />
</label>
