<script>
	export let color,
		className = ''
</script>

<div class="{color} {className} p-4 rounded-xl m-2">
	<slot />
</div>
