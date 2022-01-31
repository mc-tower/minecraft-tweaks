import { writable } from 'svelte/store'

let storage = sessionStorage

export function sessionSetStore(name) {
	const toString = (set) => JSON.stringify(Array.from(set.values()))
	const toObject = (arr) => new Set(JSON.parse(arr))

	if (storage.getItem(name) === null) {
		storage.setItem(name, toString(new Set()))
	}

	const saved = toObject(storage.getItem(name))

	const { subscribe, update } = writable(saved)

	return {
		subscribe,
		add: (value) =>
			update((data) => {
				data.add(value)
				storage.setItem(name, toString(data))
				return data
			}),
		delete: (value) =>
			update((data) => {
				data.delete(value)
				storage.setItem(name, toString(data))
				return data
			}),
	}
}
