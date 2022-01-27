/**
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 *
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0?permalink_comment_id=2800233#gistcomment-2800233
 *
 * @param {string} str a string
 * @return {number} a hash code value for the given string.
 */
export function hashCode(str) {
	return Array.from(str).reduce(
		(s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
		0
	)
}
