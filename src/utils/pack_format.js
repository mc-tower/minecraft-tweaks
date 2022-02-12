/**
 * Describe pack_format key of pack.mcmeta
 */

export const pack_format_mapping = {
	8: '1.18 - 1.18.1',
	7: '1.17 - 1.17.1',
	6: '1.16.2 - 1.16.5',
	5: '1.15 - 1.16.1',
	3: '1.11 - 1.12.2',
	4: '1.13 - 1.14.4',
	2: '1.9 - 1.10.2',
	1: '1.6.1 - 1.8.9',
}

/**
 * Covert range of pack_format like `1-6` to `{ min: 1, max: 6 }`
 *
 * @param  {string}       range Range, 1-5 or just 5
 * @return {{ min, max }}       Result
 */
export function range2format(range) {
	let f = range.split('-')
	if (f.length === 1) {
		return { min: parseInt(f[0]), max: parseInt(f[0]) }
	}
	if (f.length === 2) {
		return { min: parseInt(f[0]), max: parseInt(f[1]) }
	}
	return {}
}
