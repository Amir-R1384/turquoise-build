import { baseUrl, title as siteTitle, defaultLang } from '../../appConfig'

/**
 * Normalize a path: remove a trailing slash, except for root.
 * @param path
 * @returns
 */
export function normalizePath(path: string): string {
	if (!path || path === '/') return '/'
	return path.endsWith('/') ? path.slice(0, -1) : path
}

/**
 * Get a fully-qualified site absolute URL — no trailing slash except root.
 */
export function getUrl(path: string = ''): string {
	const norm = normalizePath(path)
	return norm === '/' ? baseUrl : baseUrl + norm
}

/**
 * Helper to generate canonical and alternate URLs in both languages
 * - No trailing slash except root
 * - Returns an object for Next.js alternates field
 */
export function getAlternates(path: string, lang: string) {
	const norm = normalizePath(path)
	const isRoot = norm === '/'
	const frUrl = isRoot ? '/' : '/fr' + (norm.startsWith('/en') ? norm.slice(3) : norm)
	const enUrl = isRoot ? '/en' : '/en' + (norm.startsWith('/en') ? norm.slice(3) : norm)
	return {
		canonical: norm,
		languages: {
			'fr-CA': frUrl,
			'en-CA': enUrl,
			'x-default': '/'
		}
	}
}

/**
 * Helper to generate OpenGraph properties shared across pages.
 * Accepts per-page title/description/lang/url.
 */
export function getOpenGraph({
	title,
	description,
	path = '',
	lang,
	imageAlt = siteTitle
}: {
	title: string
	description: string
	path?: string
	lang: string
	imageAlt?: string
}) {
	const url = getUrl(path)
	return {
		title,
		description,
		url,
		siteName: siteTitle,
		type: 'website' as const,
		locale: lang === 'fr' ? 'fr_CA' : 'en_CA',
		alternateLocale: lang === 'fr' ? 'en_CA' : 'fr_CA',
		images: [
			{
				url: `${baseUrl}/opengraph-image.jpg`,
				width: 1200,
				height: 630,
				alt: imageAlt
			}
		]
	}
}

/**
 * Helper to generate Twitter card metadata.
 */
export function getTwitterCard({ title, description }: { title: string; description: string }) {
	return {
		card: 'summary_large_image' as const,
		title,
		description,
		site: '@turquoisebuild',
		creator: '@turquoisebuild',
		images: [`${baseUrl}/twitter-image.jpg`]
	}
}
