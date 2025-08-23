import getTranslation from '@/translations'
import { Metadata } from 'next'
import { baseUrl, title, defaultLang } from '../../../../appConfig'
import { getOpenGraph } from '@/utils/metadata'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)

	// Build canonical URL - if default language, no prefix, otherwise add language prefix
	const canonicalPath = lang === defaultLang ? '/get-started' : `/${lang}/get-started`
	const fullUrl = baseUrl + canonicalPath

	const pageDescription = `${dict.titles.getStarted} - ${lang === 'fr' ? 'Commencez votre projet de rénovation avec nous' : 'Start your renovation project with us'}.`

	return {
		title: dict.titles.getStarted,
		description: pageDescription,
		alternates: {
			canonical: canonicalPath,
			languages: {
				'fr-CA': '/get-started',
				'en-CA': '/en/get-started',
				'x-default': '/get-started'
			}
		},
		openGraph: getOpenGraph({
			title: `${dict.titles.getStarted} | ${title}`,
			description: pageDescription,
			path: canonicalPath,
			lang,
			imageAlt: dict.titles.getStarted
		}),
		twitter: {
			card: 'summary_large_image',
			title: `${dict.titles.getStarted} | ${title}`,
			description: pageDescription,
			images: [`${baseUrl}/twitter-image.jpg`]
		}
	}
}

export default async function GetStarted({ params }: PageProps) {
	const { lang } = await params
	const dict = getTranslation(lang)

	return (
		<div className="md-container">
			<h1 className="title text-left font-extralight mb-10">{dict.titles.getStarted}</h1>
			{/* Add your get started content here */}
		</div>
	)
}
