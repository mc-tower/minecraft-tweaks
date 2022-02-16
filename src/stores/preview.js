import { writable } from 'svelte/store'

function defaultWritable(default_value) {
	const { subscribe, update } = writable(default_value)

	return {
		subscribe,
		set: (value) => update((_) => value),
		reset: () => update((_) => default_value),
	}
}

export const packPreview = defaultWritable('/packs/resourcepacks')

let timeout = null

export function showPreview(path) {
	cancelHide()
	packPreview.set('/packs/resourcepacks/' + path)
}

export function hidePreview() {
	timeout = setTimeout(packPreview.reset, 2000)
}

export function cancelHide() {
	clearTimeout(timeout)
}
