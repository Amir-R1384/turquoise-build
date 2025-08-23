import getTranslation from '@/translations'
import { Metadata } from 'next'
import { baseUrl, title, defaultLang } from '../../../../../appConfig'
import { getOpenGraph } from '@/utils/metadata'

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { lang } = await params
	const dict = getTranslation(lang)

	// Build canonical URL - if default language, no prefix, otherwise add language prefix
	const canonicalPath = lang === defaultLang ? '/testimonials/new' : `/${lang}/testimonials/new`
	const fullUrl = baseUrl + canonicalPath

	const pageDescription = `${dict.titles.newTestimonial} - ${lang === 'fr' ? 'Partagez votre expérience avec nos services de rénovation' : 'Share your experience with our renovation services'}.`

	return {
		title: dict.titles.newTestimonial,
		description: pageDescription,
		alternates: {
			canonical: canonicalPath,
			languages: {
				'fr-CA': '/testimonials/new',
				'en-CA': '/en/testimonials/new',
				'x-default': '/testimonials/new'
			}
		},
		openGraph: getOpenGraph({
			title: `${dict.titles.newTestimonial} | ${title}`,
			description: pageDescription,
			path: canonicalPath,
			lang,
			imageAlt: dict.titles.newTestimonial
		}),
		twitter: {
			card: 'summary_large_image',
			title: `${dict.titles.newTestimonial} | ${title}`,
			description: pageDescription,
			images: [`${baseUrl}/twitter-image.jpg`]
		}
	}
}

export default async function NewTestimonialLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
