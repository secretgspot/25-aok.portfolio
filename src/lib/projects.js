import rawProjects from './projects.json';
import generated from './screenshots.generated.json';

/**
 * @typedef {Object} Screenshot
 * @property {string} [webp]
 * @property {string} [avif]
 * @property {number} width
 * @property {number} height
 * @property {string} [alt]
 */

/**
 * @typedef {Object} ProjectDetails
 * @property {string} [client]
 * @property {number} [year]
 * @property {string[]} [technologies]
 */

/**
 * @typedef {Object} Project
 * @property {string} title
 * @property {string} slug
 * @property {string} url
 * @property {string} logo
 * @property {string} summary
 * @property {ProjectDetails} [details]
 * @property {Record<string, Screenshot>} screenshots
 */

/** @type {{ generatedAt: string | null, projects: Record<string, Record<string, Screenshot>> }} */
const manifest = generated;

/** @type {Array<Omit<Project, 'screenshots'>>} */
const source = rawProjects;

const REQUIRED_FIELDS = ['title', 'slug', 'url', 'logo', 'summary'];

/** @type {Project[]} */
export const projects = source.map((project) => {
	for (const field of REQUIRED_FIELDS) {
		if (!/** @type {Record<string, unknown>} */ (project)[field]) {
			throw new Error(`projects.json: "${project.slug ?? 'unknown'}" is missing "${field}"`);
		}
	}

	return {
		...project,
		screenshots: manifest.projects[project.slug] ?? {}
	};
});

const seen = new Set();
for (const project of projects) {
	if (seen.has(project.slug)) {
		throw new Error(`projects.json: duplicate slug "${project.slug}"`);
	}
	seen.add(project.slug);
}

export const projectSlugs = projects.map((project) => project.slug);

/**
 * @param {string} slug
 * @returns {Project | undefined}
 */
export function getProject(slug) {
	return projects.find((project) => project.slug === slug);
}

/**
 * @param {Project} project
 * @returns {Screenshot | undefined}
 */
export function primaryScreenshot(project) {
	return (
		project.screenshots.desktop ??
		project.screenshots.mobile ??
		Object.values(project.screenshots)[0]
	);
}

/**
 * @param {Project} project
 * @returns {Array<Screenshot & { name: string, alt: string }>}
 */
export function screenshotList(project) {
	return Object.entries(project.screenshots).map(([name, image]) => ({
		name,
		...image,
		alt: image.alt ?? `${project.title} — ${name} view`
	}));
}
