import CustomLink from '@/components/CustomLink'
import ImageDisplayer from '@/components/ImageDisplayer'
import getTranslation from '@/translations'
import { Metadata } from 'next'
import { baseUrl, title, defaultLang } from '../../../appConfig'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params
	const dict = getTranslation(lang)

	// Build canonical URL - if default language, no prefix, otherwise add language prefix
	const canonicalPath = lang === defaultLang ? '/' : `/${lang}/`
	const fullUrl = baseUrl + (canonicalPath === '/' ? '' : canonicalPath.slice(1))

	return {
		title: dict.pages.home.h2,
		description: dict.seo.description,
		alternates: {
			canonical: canonicalPath,
			languages: {
				'fr-CA': '/',
				'en-CA': '/en/',
				'x-default': '/'
			}
		},
		openGraph: {
			title: `${dict.pages.home.h2} | ${title}`,
			description: dict.seo.description,
			url: fullUrl,
			siteName: title,
			type: 'website',
			locale: lang === 'fr' ? 'fr_CA' : 'en_CA',
			alternateLocale: lang === 'fr' ? 'en_CA' : 'fr_CA'
		},
		twitter: {
			card: 'summary_large_image',
			title: `${dict.pages.home.h2} | ${title}`,
			description: dict.seo.description,
			images: [`${baseUrl}/twitter-image.jpg`]
		}
	}
}

export default async function Home({ params }: PageProps) {
	const { lang } = await params
	const dict = getTranslation(lang)

	return (
		<div className="py-pageTopPadding lg:pt-0">
			<section className="gap-y-3 flex flex-col items-center">
				<h1 className="font-light text-sm text-neutral-600">{dict.pages.home.h1}</h1>
				<h2 className="text-5xl title mb-10">{dict.pages.home.h2}</h2>

				<CustomLink lang={lang} href="/get-started" className="button">
					{dict.buttons.getStarted}
				</CustomLink>
			</section>

			<ImageDisplayer />
		</div>
	)
}
