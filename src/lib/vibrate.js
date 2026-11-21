import { settings } from '#lib/feedback.svelte.js';

/** @type {Record<string, number | number[]>} */
export const vibratePatterns = {
	basic: 20,
	tick: 10,
	click: 10,
	screenshot: 30,
	swipe: 15,
	send: 15,
	sent: [10, 30, 10],
	live_instance: [20, 10, 20],
	logo: 60,
	success: [40, 20, 40, 20, 80],
	close: [90, 10, 60],
	notification: [100, 50, 100],
	warning: [150, 100, 150, 100, 150]
};

/**
 * @param {number | number[]} pattern
 * @returns {boolean}
 */
export function vibrate(pattern) {
	if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return false;
	return navigator.vibrate(pattern);
}

/** @param {string} [patternName] */
export function vibrateButton(patternName = 'click') {
	if (!settings.haptics) return;

	const pattern = vibratePatterns[patternName];
	if (pattern !== undefined) vibrate(pattern);
}

/**
 * @param {HTMLElement} node
 * @param {string} [pattern]
 */
export function buzz(node, pattern = 'click') {
	const handleClick = () => vibrateButton(pattern);

	node.addEventListener('click', handleClick, true);

	return {
		/** @param {string} next */
		update(next) {
			pattern = next;
		},
		destroy() {
			node.removeEventListener('click', handleClick, true);
		}
	};
}
