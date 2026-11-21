import { projects } from '#lib/projects.js';
import { site } from '#lib/site.js';

export const prerender = true;

export function GET() {
	const urls = [
		`${site.url}/`,
		...projects.map((project) => `${site.url}/${project.slug}`)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `\t<url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8' }
	});
}
