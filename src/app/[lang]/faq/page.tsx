import Accordian from '@/components/Accordian'
import getTranslation from '@/translations'
import { Metadata } from 'next'
import { getFAQs } from '../../../../sanity/lib/functions'
import { title, defaultLang } from '../../../../appConfig'
import { getAlternates, getOpenGraph, getTwitterCard } from '@/utils/metadata'
import CustomLink from '@/components/CustomLink'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)

	const canonicalPath = lang === defaultLang ? '/faq' : `/${lang}/faq`

	const pageDescription = `${dict.titles.faq} - ${lang === 'fr' ? 'Réponses aux questions fréquentes sur nos services de rénovation' : 'Answers to frequently asked questions about our renovation services'}.`

	return {
		title: dict.titles.faq,
		description: pageDescription,
		alternates: getAlternates(canonicalPath, lang),
		openGraph: getOpenGraph({
			title: `${dict.titles.faq} | ${title}`,
			description: pageDescription,
			path: canonicalPath,
			lang,
			imageAlt: dict.titles.faq
		}),
		twitter: getTwitterCard({
			title: `${dict.titles.faq} | ${title}`,
			description: pageDescription
		})
	}
}

export default async function FAQ({ params }: PageProps) {
	const { lang } = await params
	const dict = getTranslation(lang)

	const faqs: { question: string; answer: string }[] = await getFAQs(lang)

	return (
		<div className="md-container">
			<div className="title text-left font-extralight mb-10">{dict.titles.faq}</div>
			<div className="flex flex-col gap-y-5">
				{faqs.map((faq, i) => (
					<Accordian key={i} question={faq.question} answer={faq.answer} />
				))}
				<CustomLink lang={lang} href="/" className="mt-5 button mx-auto">
					{dict.buttons.goHome}
				</CustomLink>
			</div>
		</div>
	)
}
