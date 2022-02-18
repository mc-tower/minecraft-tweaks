<script context="module">
	import Modal from 'src/components/atoms/Modal.svelte'

	import { description } from 'src/stores/modal'
</script>

<script>
	function close() {
		description.set({ content: '' })
	}
</script>

<Modal show={$description.content !== ''} on:close={close}>
	<svelte:fragment slot="header">{$description.name}</svelte:fragment>
	<svelte:fragment slot="body">{@html $description.content}</svelte:fragment>
</Modal>
