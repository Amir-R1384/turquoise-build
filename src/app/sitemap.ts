import { MetadataRoute } from 'next'
import { baseUrl } from '../../appConfig'

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = [
		'',
		'/about',
		'/contact',
		'/faq',
		'/get-started',
		'/projects',
		'/services/design',
		'/services/build',
		'/testimonials'
	]

	// Helper to ensure no trailing slash, except for root
	function normalize(url: string): string {
		if (url === '' || url === '/') return '/'
		return url.endsWith('/') ? url.slice(0, -1) : url
	}

	const sitemap = routes.map(route => {
		const defaultRoute = normalize(route)
		const defaultUrl = baseUrl + (defaultRoute === '/' ? '' : defaultRoute)
		const alternateRoute = normalize('/en' + route)
		const alternateUrl = baseUrl + (alternateRoute === '/' ? '' : alternateRoute)

		return {
			url: defaultUrl,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: route === '' ? 1 : 0.8,
			alternates: {
				languages: {
					'fr-CA': defaultUrl,
					'en-CA': alternateUrl,
					'x-default': defaultUrl
				}
			}
		}
	})

	// Add English language URLs
	const englishSitemap = routes.map(route => {
		const englishRoute = normalize('/en' + route)
		const englishUrl = baseUrl + (englishRoute === '/' ? '' : englishRoute)
		const defaultRoute = normalize(route)
		const defaultUrl = baseUrl + (defaultRoute === '/' ? '' : defaultRoute)

		return {
			url: englishUrl,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: route === '' ? 1 : 0.8,
			alternates: {
				languages: {
					'fr-CA': defaultUrl,
					'en-CA': englishUrl,
					'x-default': defaultUrl
				}
			}
		}
	})

	return [...sitemap, ...englishSitemap]
}
