/**
 * Click on focused element with keyboard.
 *
 * This will add tabindex="0" attribute and
 * will fire `click` event on `keydown` events
 * for keys `Space`, `Enter`, `NumpadEnter`, `ArrowDown`, `ArrowUp`
 *
 * ```svelte
 * <div on:click={handleClick} use:a11yClick>
 *     Click me or focus and press key
 * </div>
 * ```
 *
 * You can define your own keys:
 *
 * ```svelte
 * <div on:click={handleClick} use:a11yClick={['Enter']}>
 *     Click me or focus and press Enter
 * </div
 * ```
 *
 * @param {HTMLElement} node
 * @param {string[]} codes_list
 */
export function a11yClick(
	node,
	codes_list = ['Space', 'Enter', 'NumpadEnter', 'ArrowDown', 'ArrowUp']
) {
	const codes = new Set(codes_list)

	node.tabIndex = '0'

	function handleKeyDown(e) {
		if (document.hasFocus() && codes.has(e.code)) {
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
