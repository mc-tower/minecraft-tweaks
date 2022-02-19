import { derived, get, writable } from 'svelte/store'

import { sessionStore } from 'svelte-storages'

import { sessionSetStore } from 'src/stores/sessionSetStore.js'

// listing of all packs
export const allPacks = writable({})

export const allPacksMapping = derived(allPacks, ($allPacks, set) => {
	if (Object.keys($allPacks).length === 0) {
		set({})
		return
	}

	let mapping = {}

	$allPacks.categories.forEach((c) => {
		c.packs.forEach((p) => {
			mapping[c.id + '/' + p.id] = {
				description: p.description,
				name: p.name,
				incompatible: p.incompatible,
				extends: p.extends,
				versions: p.versions,
			}
		})
	})

	set(mapping)
})

/**
 * Selected packs
 *
 * ```js
 * {
 *   'pack': true,
 *   'pack2': false,
 * }
 * ```
 *
 * where keys are `category_id/pack_id`
 *
 * @type {[type]}
 */
export const selectedPacks = sessionStore('selected')

// save insertion order
export const selectedPacksOrder = sessionSetStore('selected-order')

export function clearSelectedPacks() {
	Object.keys(get(selectedPacks)).forEach((p) => selectedPacks.set(p, false))
	selectedPacksOrder.clear()
}

// none, download, zip
export const makeStatus = writable('none')

// percentage
export const makeProgress = writable(-1)

// ...makeStatus, waiting
export const packStatus = derived(
	[selectedPacks, makeStatus],
	([$selectedPacks, $makeStatus], set) => {
		if (Object.values($selectedPacks).some(Boolean)) {
			set($makeStatus === 'none' ? 'waiting' : $makeStatus)
		} else {
			set('none')
		}
	}
)
