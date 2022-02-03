<script>
	export let disabled = false,
		light = false

	$: bg = light ? 'bg-indigo-800' : 'bg-indigo-600'
</script>

<button
	type="button"
	on:click
	class="py-2 px-3 {bg} hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-md focus:outline-none focus:bg-indigo-700 {$$props.class}"
	class:cursor-pointer={!disabled}
	{disabled}>
	<slot />
</button>
