/**
 * Load info about packs
 */

export async function loadResourcePacksList() {
	const response = await fetch('/packs/resourcepacks/list.json')
	if (response.ok) {
		return await response.json()
	} else {
		return {}
	}
}
