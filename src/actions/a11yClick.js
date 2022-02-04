/**
 * Click on focused element with keyboard.
 *
 * This will add `tabindex="0"` attribute and
 * fire `click` event on `keydown` events
 * for keys `Space`, `Enter`, `NumpadEnter` (default)
 *
 * ```svelte
 * <div on:click={handleClick} use:a11yClick>
 *     Click me or focus and press key
 * </div>
 * ```
 *
 * You can redefine keys:
 *
 * ```svelte
 * <div on:click={handleClick} use:a11yClick={{ codes: ['Enter'] }}>
 *     Click me or focus and press Enter
 * </div
 * ```
 *
 * Or add more keys:
 *
 * ```svelte
 * <div on:click={handleClick} use:a11yClick={{ add_codes: ['ArrowDown'] }}>
 *     Click me or focus and press Enter
 * </div
 * ```
 *
 * @param {HTMLElement} node
 * @param {string[]} codes_list
 */
export function a11yClick(
	node,
	{ codes = ['Space', 'Enter', 'NumpadEnter'], add_codes = [] } = {}
) {
	const code_set = new Set([...codes, ...add_codes])

	node.tabIndex = '0'

	function handleKeyDown(e) {
		if (document.hasFocus() && code_set.has(e.code)) {
			node.click()
		}
	}

	node.addEventListener('keydown', handleKeyDown, true)

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeyDown, true)
		},
	}
}
