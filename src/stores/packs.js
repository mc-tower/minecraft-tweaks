import { derived, writable } from 'svelte/store'

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

// none, download, zip
export const makeStatus = writable('none')

export const makeProgress = writable(-1)

// ...makeStatus, waiting
export const packStatus = derived(
	[selectedPacks, makeStatus],
	([$selectedPacks, $makeStatus], set) => {
		if ($selectedPacks.size !== 0) {
			set($makeStatus === 'none' ? 'waiting' : $makeStatus)
		} else {
			set('none')
		}
	}
)
