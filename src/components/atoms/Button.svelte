<script>
	export let className = ''
</script>

<button
	type="button"
	class="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-md focus:outline-none cursor-pointer {className}">
	<slot />
</button>
