/**
 * Make pack
 */

import * as zip from '@zip.js/zip.js'

import { get } from 'svelte/store'

import { loadResourcesList, loadResource } from 'src/api/resources.js'
import {
	allPacksMapping,
	clearSelectedPacks,
	selectedPacksOrder,
	makeProgress,
	makeStatus,
} from 'src/stores/packs.js'
import { hashCode } from 'src/utils/hash.js'
import { range2format } from 'src/utils/pack_format'

export async function makePack(pack_format) {
	const selectedPacks = Array.from(get(selectedPacksOrder))
	const localPacksMapping = get(allPacksMapping)

	makeStatus.set('download')

	let resources = await makeResourcesList(
		selectedPacks,
		localPacksMapping,
		pack_format
	)
	let blobs = await loadImages(resources)

	makeStatus.set('zip')

	downloadZip(...(await makeZip(blobs, selectedPacks, pack_format)))

	makeStatus.set('none')
	clearSelectedPacks()
}

async function makeResourcesList(selected, all, pack_format) {
	let resources = new Set(),
		resources_files = new Set(),
		url_pack_prefix = 'resourcepacks/',
		path,
		returned,
		extends_data

	function addResourceFile(path, file) {
		resources.add({
			name: file,
			path: `${path}/${file}`,
		})
		resources_files.add(file)
	}

	for (let pack_path of selected) {
		// hardcode a little
		path = url_pack_prefix + pack_path

		if (all[pack_path].versions.length > 0) {
			let version = all[pack_path].versions.find((v) => {
				let range = range2format(v.format)
				return pack_format >= range.min && pack_format <= range.max
			})

			// version should be found
			path += '/versions/' + version.folder
		}

		returned = await loadResourcesList(path)

		// load files to extend resourcepack
		if (all[pack_path].extends) {
			returned.extends = { files: [] }
			extends_data = await loadResourcesList(
				url_pack_prefix + all[pack_path].extends
			)

			// we need to save it to separate list to remember
			// that we should load these files from other resourcepack
			for (let f of extends_data.files) {
				if (!returned.files.includes(f)) {
					returned.extends.files.push(f)
				}
			}
		}

		// not store pack if resulting resources already has
		// resources with the same names
		if (
			returned.files.some((f) => resources_files.has(f)) ||
			(returned.extends &&
				returned.extends.files.some((f) => resources_files.has(f)))
		) {
			continue
		}

		returned.files.forEach((file) => addResourceFile(path, file))

		if (returned.extends) {
			returned.extends.files.forEach((file) =>
				addResourceFile(all[pack_path].extends, file)
			)
		}
	}

	return resources
}

async function loadImages(resources) {
	let blobs = []

	makeProgress.set(0)
	const downloadCount = resources.size
	let i = 0

	for (let file of resources.values()) {
		blobs.push({
			name: file.name,
			content: await loadResource(file.path),
		})

		i += 1
		makeProgress.set(Math.floor((i * 100) / downloadCount))
	}

	makeProgress.set(-1)

	return blobs
}

async function makeZip(blobs, selected, pack_format) {
	makeProgress.set(0)

	// 2 files additionally
	const downloadCount = blobs.length + 2
	let i = 0

	const blobWriter = new zip.BlobWriter('application/zip')
	const writer = new zip.ZipWriter(blobWriter)

	// resources
	for (let blob of blobs) {
		await writer.add(blob.name, new zip.BlobReader(blob.content))

		i += 1
		makeProgress.set(Math.floor((i * 100) / downloadCount))
	}

	// pack.mcmeta
	const mcmeta = JSON.stringify({
		pack: {
			pack_format,
			description: 'Minecraft tweaks',
		},
	})

	await writer.add('pack.mcmeta', new zip.TextReader(mcmeta))

	makeProgress.set(Math.floor(((i + 1) * 100) / downloadCount))

	// info about archive
	const packsString = selected.map((p) => 'rp/' + p).join(';')
	const infoString = packsString
	await writer.add('info.txt', new zip.TextReader(infoString))

	makeProgress.set(-1)

	await writer.close()
	return [blobWriter.getData(), hashCode(infoString)]
}

function downloadZip(blob, hash = '') {
	const a = document.createElement('a')
	a.setAttribute('download', `tweaks_h${hash}.zip`)
	a.href = URL.createObjectURL(blob)
	a.click()
}
