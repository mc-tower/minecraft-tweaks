<script>
	export let disabled = false
</script>

<button
	type="button"
	on:click
	class="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-md focus:outline-none {$$props.class}"
	class:cursor-pointer={!disabled}
	{disabled}>
	<slot />
</button>
