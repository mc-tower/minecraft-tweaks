import { writable } from 'svelte/store'

function setStore() {
	const { subscribe, set, update } = writable(new Set())

	return {
		subscribe,
		set,
		add: (element) =>
			update((elements) => {
				elements.add(element)
				return elements
			}),
		delete: (element) =>
			update((elements) => {
				elements.delete(element)
				return elements
			}),
	}
}

export const selectedPacks = setStore()
