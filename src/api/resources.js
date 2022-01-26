export async function loadResourcesList(path) {
	const response = await fetch(`/packs/${path}/resources.json`)
	return await response.json()
}

export async function loadResource(path) {
	const response = await fetch(`/packs/${path}`)
	return await response.blob()
}
