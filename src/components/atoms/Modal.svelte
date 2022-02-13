<script context="module">
	import { createEventDispatcher } from 'svelte'
	import { fly, slide } from 'svelte/transition'

	import ClearIcon from 'src/components/atoms/ClearIcon.svelte'

	function noop() {}
</script>

<script>
	export let show = false

	const dispatch = createEventDispatcher()

	function open() {
		show = true
	}
	function close() {
		show = false

		dispatch('close')
	}
</script>

<span on:click={open}>
	<slot name="trigger" />
</span>

{#if show}
	<div
		class="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50 overflow-y-auto"
		on:click={close}
		transition:fly>
		<div
			class="relative sm:w-3/4 md:w-1/2 lg:w-1/3 mx-2 sm:mx-auto my-10 opacity-100">
			<div
				class="relative bg-slate-800 shadow-lg rounded-md text-neutral-300 z-20"
				on:click|stopPropagation={noop}
				transition:slide>
				<header class="flex items-center justify-between p-2 pt-4">
					<h2 class="font-semibold px-2">
						<slot name="header">Header</slot>
					</h2>
					<ClearIcon on:click={close} tooltip_text="Close" />
				</header>
				<main class="px-2 pb-6 text-center">
					<slot name="body">Body</slot>
				</main>
				<!-- <footer class="flex justify-center p-2"></footer> -->
			</div>
		</div>
	</div>
{/if}
