/**
 * Extract pack
 */

import * as zip from '@zip.js/zip.js'

export async function getPackInfo(blob) {
	const reader = new zip.ZipReader(new zip.BlobReader(blob))
	const entries = await reader.getEntries()

	let text = ''

	if (entries.length) {
		let info = entries.find((e) => e.filename === 'info.txt')

		text = await info.getData(new zip.TextWriter())
	}

	await reader.close()

	return text
}
