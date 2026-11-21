import { settings } from '#lib/feedback.svelte.js';

/**
 * @typedef {Object} Chime
 * @property {number} frequency
 * @property {number} duration
 * @property {number} [delay]
 * @property {number} [volume]
 * @property {OscillatorType} [waveType]
 */

/** @type {AudioContext | null} */
let audioContext = null;

function getAudioContext() {
	if (typeof window === 'undefined') return null;

	if (!audioContext) {
		const AudioContextClass =
			window.AudioContext ?? /** @type {typeof AudioContext | undefined} */ (/** @type {any} */ (window).webkitAudioContext);

		if (!AudioContextClass) return null;
		audioContext = new AudioContextClass();
	}

	if (audioContext.state === 'suspended') {
		void audioContext.resume();
	}

	return audioContext;
}

/**
 * @param {number} [frequency]
 * @param {number} [duration]
 * @param {number} [volume]
 * @param {OscillatorType} [waveType]
 */
export async function playChime(frequency = 800, duration = 200, volume = 0.3, waveType = 'sine') {
	const context = getAudioContext();
	if (!context) return false;

	try {
		const oscillator = context.createOscillator();
		const gain = context.createGain();
		const now = context.currentTime;

		oscillator.type = waveType;
		oscillator.frequency.setValueAtTime(frequency, now);

		gain.gain.setValueAtTime(0, now);
		gain.gain.linearRampToValueAtTime(volume, now + 0.01);
		gain.gain.exponentialRampToValueAtTime(volume * 0.7, now + (duration / 1000) * 0.7);
		gain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);

		oscillator.connect(gain);
		gain.connect(context.destination);
		oscillator.start(now);
		oscillator.stop(now + duration / 1000);

		return true;
	} catch (error) {
		console.error('Error playing chime:', error);
		return false;
	}
}

/** @param {Chime[]} sequence */
export async function playChimeSequence(sequence) {
	const context = getAudioContext();
	if (!context) return false;

	for (const note of sequence) {
		const { frequency = 800, duration = 200, delay = 0, volume = 0.3, waveType = 'sine' } = note;
		window.setTimeout(() => {
			void playChime(frequency, duration, volume, waveType);
		}, delay);
	}

	return true;
}

/** @param {Chime | Chime[]} pattern */
export function playSound(pattern) {
	if (Array.isArray(pattern)) {
		void playChimeSequence(pattern);
	} else {
		void playChime(pattern.frequency, pattern.duration, pattern.volume, pattern.waveType);
	}
}

/**
 * @param {string} [patternName]
 */
export function playButtonSound(patternName = 'click') {
	if (!settings.sound) return;

	const pattern = chimePatterns[patternName];
	if (pattern) playSound(pattern);
}

/**
 * @param {HTMLElement} node
 * @param {string} [pattern]
 */
export function sound(node, pattern = 'click') {
	const handleClick = () => playButtonSound(pattern);

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

/** @type {Record<string, Chime[]>} */
export const chimePatterns = {
	basic: [
		{ frequency: 130, duration: 300, delay: 0, volume: 0.18, waveType: 'sine' },
		{ frequency: 260, duration: 250, delay: 10, volume: 0.15, waveType: 'sine' },
		{ frequency: 520, duration: 200, delay: 20, volume: 0.12, waveType: 'sine' },
		{ frequency: 780, duration: 180, delay: 25, volume: 0.08, waveType: 'sine' }
	],

	tick: [
		{ frequency: 220, duration: 180, delay: 0, volume: 0.15, waveType: 'sine' },
		{ frequency: 440, duration: 150, delay: 5, volume: 0.12, waveType: 'sine' },
		{ frequency: 660, duration: 120, delay: 10, volume: 0.08, waveType: 'sine' },
		{ frequency: 110, duration: 220, delay: 3, volume: 0.1, waveType: 'sine' }
	],

	click: [
		{ frequency: 87, duration: 280, delay: 0, volume: 0.2, waveType: 'sine' },
		{ frequency: 174, duration: 220, delay: 15, volume: 0.18, waveType: 'sine' },
		{ frequency: 261, duration: 200, delay: 25, volume: 0.15, waveType: 'sine' },
		{ frequency: 392, duration: 180, delay: 35, volume: 0.12, waveType: 'sine' },
		{ frequency: 523, duration: 160, delay: 40, volume: 0.08, waveType: 'sine' }
	],

	screenshot: [
		{ frequency: 65, duration: 500, delay: 0, volume: 0.25, waveType: 'sine' },
		{ frequency: 130, duration: 480, delay: 20, volume: 0.22, waveType: 'sine' },
		{ frequency: 195, duration: 450, delay: 40, volume: 0.18, waveType: 'sine' },
		{ frequency: 260, duration: 420, delay: 60, volume: 0.15, waveType: 'sine' },
		{ frequency: 390, duration: 380, delay: 80, volume: 0.1, waveType: 'sine' }
	],

	swipe: [
		{ frequency: 73, duration: 350, delay: 0, volume: 0.18, waveType: 'sine' },
		{ frequency: 146, duration: 320, delay: 25, volume: 0.15, waveType: 'sine' },
		{ frequency: 220, duration: 290, delay: 50, volume: 0.13, waveType: 'sine' },
		{ frequency: 293, duration: 260, delay: 75, volume: 0.1, waveType: 'sine' },
		{ frequency: 440, duration: 220, delay: 100, volume: 0.08, waveType: 'sine' }
	],

	send: [
		{ frequency: 80, duration: 600, delay: 0, volume: 0.15, waveType: 'sine' },
		{ frequency: 120, duration: 550, delay: 30, volume: 0.12, waveType: 'sine' },
		{ frequency: 180, duration: 500, delay: 60, volume: 0.1, waveType: 'sine' },
		{ frequency: 240, duration: 450, delay: 90, volume: 0.08, waveType: 'sine' },
		{ frequency: 300, duration: 400, delay: 120, volume: 0.06, waveType: 'sine' },
		{ frequency: 360, duration: 350, delay: 150, volume: 0.04, waveType: 'sine' }
	],

	logo: [
		{ frequency: 110, duration: 900, delay: 0, volume: 0.25, waveType: 'sine' },
		{ frequency: 220, duration: 800, delay: 30, volume: 0.22, waveType: 'sine' },
		{ frequency: 330, duration: 700, delay: 60, volume: 0.18, waveType: 'sine' },
		{ frequency: 440, duration: 600, delay: 90, volume: 0.15, waveType: 'sine' },
		{ frequency: 660, duration: 300, delay: 120, volume: 0.1, waveType: 'sine' }
	],

	card: [
		{ frequency: 110, duration: 350, delay: 0, volume: 0.18, waveType: 'sine' },
		{ frequency: 220, duration: 320, delay: 80, volume: 0.16, waveType: 'sine' },
		{ frequency: 330, duration: 280, delay: 160, volume: 0.14, waveType: 'sine' },
		{ frequency: 440, duration: 250, delay: 240, volume: 0.12, waveType: 'sine' },
		{ frequency: 165, duration: 400, delay: 40, volume: 0.1, waveType: 'sine' }
	],

	live_instance: [
		{ frequency: 330, duration: 80, delay: 0, volume: 0.25, waveType: 'sine' },
		{ frequency: 165, duration: 100, delay: 0, volume: 0.28, waveType: 'sine' },
		{ frequency: 82, duration: 120, delay: 0, volume: 0.24, waveType: 'triangle' },
		{ frequency: 440, duration: 120, delay: 60, volume: 0.22, waveType: 'sine' },
		{ frequency: 220, duration: 140, delay: 60, volume: 0.26, waveType: 'sine' },
		{ frequency: 110, duration: 160, delay: 60, volume: 0.22, waveType: 'triangle' },
		{ frequency: 523, duration: 200, delay: 140, volume: 0.24, waveType: 'sine' },
		{ frequency: 261, duration: 220, delay: 140, volume: 0.28, waveType: 'sine' },
		{ frequency: 130, duration: 240, delay: 140, volume: 0.25, waveType: 'triangle' },
		{ frequency: 65, duration: 300, delay: 0, volume: 0.22, waveType: 'triangle' }
	],

	sent: [
		{ frequency: 220, duration: 300, delay: 0, volume: 0.2, waveType: 'sine' },
		{ frequency: 110, duration: 350, delay: 0, volume: 0.22, waveType: 'sine' },
		{ frequency: 55, duration: 400, delay: 0, volume: 0.18, waveType: 'sine' },
		{ frequency: 165, duration: 300, delay: 180, volume: 0.18, waveType: 'sine' },
		{ frequency: 82, duration: 350, delay: 180, volume: 0.2, waveType: 'sine' },
		{ frequency: 41, duration: 400, delay: 180, volume: 0.16, waveType: 'sine' },
		{ frequency: 110, duration: 600, delay: 360, volume: 0.22, waveType: 'sine' },
		{ frequency: 55, duration: 650, delay: 360, volume: 0.24, waveType: 'sine' },
		{ frequency: 27, duration: 700, delay: 360, volume: 0.2, waveType: 'sine' }
	]
};
