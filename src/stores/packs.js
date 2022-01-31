import { derived, get, writable } from 'svelte/store'

import { sessionStore } from 'svelte-storages'

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
export const selectedPacks = sessionStore()

export function getSelectedPacksList() {
	let packs = get(selectedPacks)
	return Object.keys(packs).filter((i) => packs[i])
}

export function clearSelectedPacks() {
	Object.keys(get(selectedPacks)).forEach((p) => selectedPacks.set(p, false))
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
