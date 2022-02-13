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

const max_pack_format = Math.max(...Object.keys(pack_format_mapping))
const min_pack_format = Math.min(...Object.keys(pack_format_mapping))

/**
 * Covert range of pack_format like `1-6` to `{ min: 1, max: 6 }`
 *
 * Supported versions:
 *
 * - single value: 5
 * - range: 1-5
 * - range with one side: 5+ (5 and more) or 5- (5 and less)
 *
 * @param  {string}       range Range
 * @return {{ min, max }}       Result
 */
export function range2format(range) {
	if (range.replace(/[+-]/g, '') === range) {
		// 5
		let value = parseInt(range)
		return { min: value, max: value }
	}

	let f

	if ((f = range.match(/\d+(?<sign>[+-])$/)) !== null) {
		// 5+ or 5-
		let more = f.groups.sign === '+',
			// parseInt result for '5+' and '5-' is 5
			value = parseInt(range)
		return {
			min: more ? value : min_pack_format,
			max: more ? max_pack_format : value,
		}
	}

	if ((f = range.match(/(?<min>\d+)-(?<max>\d+)/)) !== null) {
		// 1-5
		return { min: parseInt(f.groups.min), max: parseInt(f.groups.max) }
	}

	return {}
}
