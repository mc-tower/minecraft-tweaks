/**
 * Make pack
 */

import * as zip from '@zip.js/zip.js'

import { get } from 'svelte/store'

import { loadResourcesList, loadResource } from 'src/api/resources.js'
import { selectedPacks, makeStatus } from 'src/stores/packs.js'

export async function makePack() {
	let resources = new Set(),
		blobs = [],
		returned,
		path

	const selectedPacksList = Array.from(get(selectedPacks).values())

	makeStatus.set('download')

	// make resources list
	for (let pack_path of selectedPacksList) {
		// hardcode a little
		path = 'resourcepacks/' + pack_path

		returned = await loadResourcesList(path)

		returned.files.forEach((file) => {
			resources.add({
				name: file,
				path: `${path}/${file}`,
			})
		})
	}

	// load images
	for (let file of resources.values()) {
		blobs.push({
			name: file.name,
			content: await loadResource(file.path),
		})
	}

	// write zip

	makeStatus.set('zip')

	const blobWriter = new zip.BlobWriter('application/zip')
	const writer = new zip.ZipWriter(blobWriter)

	// resources
	for (let blob of blobs) {
		await writer.add(blob.name, new zip.BlobReader(blob.content))
	}

	// pack.mcmeta
	const mcmeta = JSON.stringify({
		pack: {
			pack_format: 8,
			description: 'Minecraft tweaks',
		},
	})

	await writer.add('pack.mcmeta', new zip.TextReader(mcmeta))

	// info about archive
	const packsString = selectedPacksList.map((p) => 'rp/' + p).join(';')
	await writer.add('info.txt', new zip.TextReader(packsString))

	await writer.close()

	downloadZip(blobWriter.getData())

	makeStatus.set('none')
}

function downloadZip(blob) {
	const a = document.createElement('a')
	a.setAttribute('download', 'tweaks.zip')
	a.href = URL.createObjectURL(blob)
	a.click()
}
