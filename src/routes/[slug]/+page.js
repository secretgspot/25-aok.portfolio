import { error } from '@sveltejs/kit';
import { getProject } from '#lib/projects.js';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const project = getProject(params.slug);

	if (!project) {
		error(404, 'Project not found');
	}

	return { project };
}
