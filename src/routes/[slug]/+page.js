import { error } from '@sveltejs/kit';
import projects from '$lib/projects.json';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        throw error(404, 'Project not found');
    }

    return {
        project
    };
}
