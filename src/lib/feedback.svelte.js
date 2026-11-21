import { browser } from '$app/env';

const STORAGE_KEY = 'aok:settings';

/** @typedef {{ theme: 'system' | 'light' | 'dark', sound: boolean, haptics: boolean }} Settings */

/** @type {Settings} */
const DEFAULTS = { theme: 'system', sound: true, haptics: true };

/** @returns {Settings} */
function load() {
	if (!browser) return { ...DEFAULTS };

	try {
		const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
		return { ...DEFAULTS, ...stored };
	} catch {
		return { ...DEFAULTS };
	}
}

/** @type {Settings} */
export const settings = $state(load());

export function applyTheme() {
	if (!browser) return;

	const root = document.documentElement;
	if (settings.theme === 'system') {
		delete root.dataset.theme;
	} else {
		root.dataset.theme = settings.theme;
	}

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
	} catch {
		// Storage can be unavailable in private mode; the in-memory state still works.
	}
}
