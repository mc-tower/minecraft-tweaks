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
		set: (list) =>
			update((data) => {
				data = new Set(list)
				storage.setItem(name, toString(data))
				return data
			}),
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
		clear: () =>
			update((data) => {
				data.clear()
				storage.setItem(name, toString(data))
				return data
			}),
	}
}
