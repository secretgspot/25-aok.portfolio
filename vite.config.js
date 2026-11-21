import { readFileSync } from 'node:fs';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const projects = JSON.parse(
	readFileSync(new URL('./src/lib/projects.json', import.meta.url), 'utf8')
);

/** Detail pages are static data, so prerender them at build time. */
const entries = [...projects.map((project) => `/${project.slug}`), '/sitemap.xml'];

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter({ runtime: 'nodejs24.x' }),
			prerender: { entries }
		})
	]
});
