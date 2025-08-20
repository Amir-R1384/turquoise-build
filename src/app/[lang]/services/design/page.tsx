import ServiceLayout from '@/components/ServiceLayout'
import getTranslation from '@/translations'
import { Metadata } from 'next'
import { title, defaultLang } from '../../../../../appConfig'
import { getAlternates, getOpenGraph, getTwitterCard } from '@/utils/metadata'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)

	const canonicalPath = lang === defaultLang ? '/services/design' : `/${lang}/services/design`
	const pageDescription = `${dict.titles.design} - ${lang === 'fr' ? 'Services de design et planification pour vos projets de rénovation' : 'Design and planning services for your renovation projects'}.`

	return {
		title: dict.titles.design,
		description: pageDescription,
		alternates: getAlternates(canonicalPath, lang),
		openGraph: getOpenGraph({
			title: `${dict.titles.design} | ${title}`,
			description: pageDescription,
			path: canonicalPath,
			lang,
			imageAlt: dict.titles.design
		}),
		twitter: getTwitterCard({
			title: `${dict.titles.design} | ${title}`,
			description: pageDescription
		})
	}
}

export default async function Design({ params }: PageProps) {
	const { lang } = await params
	return <ServiceLayout lang={lang} path="Design" />
}
