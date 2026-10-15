import type { RequestHandler } from './$types';

// Served from a route rather than static/ because the Sitemap line needs an absolute URL
export const GET: RequestHandler = ({ url }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.xml\n`, {
		headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=86400' }
	});
