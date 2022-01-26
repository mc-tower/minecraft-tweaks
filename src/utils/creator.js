/**
 * Make pack
 */

import * as zip from '@zip.js/zip.js'

import { get } from 'svelte/store'

import { loadResourcesList, loadResource } from 'src/api/resources.js'
import {
	downloadProgress,
	makeStatus,
	selectedPacks,
} from 'src/stores/packs.js'

export async function makePack() {
	const selectedPacksList = Array.from(get(selectedPacks).values())

	makeStatus.set('download')

	let resources = await makeResourcesList(selectedPacksList)
	let blobs = await loadImages(resources)

	makeStatus.set('zip')

	downloadZip(await makeZip(blobs, selectedPacksList))

	makeStatus.set('none')
}

async function makeResourcesList(selected) {
	let resources = new Set(),
		path,
		returned

	for (let pack_path of selected) {
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

	return resources
}

async function loadImages(resources) {
	let blobs = []

	downloadProgress.set(0)
	const downloadCount = resources.size
	let i = 0

	for (let file of resources.values()) {
		blobs.push({
			name: file.name,
			content: await loadResource(file.path),
		})

		i += 1
		downloadProgress.set(Math.floor((i * 100) / downloadCount))
	}

	downloadProgress.set(-1)

	return blobs
}

async function makeZip(blobs, selected) {
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
	const packsString = selected.map((p) => 'rp/' + p).join(';')
	await writer.add('info.txt', new zip.TextReader(packsString))

	await writer.close()
	return blobWriter.getData()
}

function downloadZip(blob) {
	const a = document.createElement('a')
	a.setAttribute('download', 'tweaks.zip')
	a.href = URL.createObjectURL(blob)
	a.click()
}
