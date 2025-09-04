import { settings } from '$lib/settings.js';
import { get } from 'svelte/store';

/**
 * Predefined vibration patterns for different UI feedback types
 * Patterns follow mobile UX best practices:
 * - Basic: Subtle for frequent interactions
 * - Success: Gentle, confirmatory feeling
 * - Fail: Attention-grabbing but not annoying
 */
export const vibratePatterns = {
	// Quick, subtle feedback for basic interactions
	basic: 20,
	tick: 10,
	click: 10,
	screenshot: 30,
	live_instance: [20, 10, 20],
	logo: 60,

	// Success pattern
	success: [40, 20, 40, 20, 80], // Two quick, then longer

	// Fail pattern
	close: [90, 10, 60], // Two strong buzzes

	// Additional useful patterns
	notification: [100, 50, 100], // Two medium buzzes
	warning: [150, 100, 150, 100, 150], // Three strong buzzes
};

/**
 * Trigger device vibration if supported
 * @param {string} patternName - The name of the vibration pattern to trigger.
 * @param {boolean} isNotification - True if this is a notification vibration, to check notification_buzz setting.
 */
export function vibrate(pattern) {
	if (!pattern) {
		console.warn(`Vibration pattern not found.`);
		return;
	}
	// Check if the Vibration API is supported by the browser
	if ("vibrate" in navigator) {
		navigator.vibrate(pattern);
		return true;
	} else {
		console.log("Vibration API is NOT supported on this device/browser.");
		return false;
	}
}

/**
 * Triggers a button click vibration.
 */
export function vibrateButton(patternName) {
	const currentSettings = get(settings);
	if (!currentSettings.button_buzz) return;
	const pattern = patternName ? vibratePatterns[patternName] : vibratePatterns[currentSettings.button_vibration_pattern];
	vibrate(pattern);
}


/**
 * Attaches a vibration to an element's click event.
 * @param {HTMLElement} node - The element to attach the vibration to.
 * @param {string} [pattern='click'] - The name of the vibration pattern to play from vibratePatterns.
 */
export function buzz(node, pattern = 'click') {
	const handleClick = () => {
		vibrateButton(pattern);
	};

	node.addEventListener('click', handleClick, true);

	return {
		update(newPattern) {
			pattern = newPattern;
		},
		destroy() {
			node.removeEventListener('click', handleClick, true);
		}
	};
}