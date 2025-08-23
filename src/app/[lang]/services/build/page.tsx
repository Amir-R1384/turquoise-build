import ServiceLayout from '@/components/ServiceLayout'
import getTranslation from '@/translations'
import { Metadata } from 'next'
import { baseUrl, title, defaultLang } from '../../../../../appConfig'
import { getOpenGraph } from '@/utils/metadata'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)

	// Build canonical URL - if default language, no prefix, otherwise add language prefix
	const canonicalPath = lang === defaultLang ? '/services/build' : `/${lang}/services/build`
	const fullUrl = baseUrl + canonicalPath

	const pageDescription = `${dict.titles.build} - ${lang === 'fr' ? 'Services de construction et rénovation professionnels à Montréal' : 'Professional construction and renovation services in Montreal'}.`

	return {
		title: dict.titles.build,
		description: pageDescription,
		alternates: {
			canonical: canonicalPath,
			languages: {
				'fr-CA': '/services/build',
				'en-CA': '/en/services/build',
				'x-default': '/services/build'
			}
		},
		openGraph: getOpenGraph({
			title: `${dict.titles.build} | ${title}`,
			description: pageDescription,
			path: canonicalPath,
			lang,
			imageAlt: dict.titles.build
		}),
		twitter: {
			card: 'summary_large_image',
			title: `${dict.titles.build} | ${title}`,
			description: pageDescription,
			images: [`${baseUrl}/twitter-image.jpg`]
		}
	}
}

export default async function Build({ params }: PageProps) {
	const { lang } = await params

	return <ServiceLayout lang={lang} path="Build" />
}
