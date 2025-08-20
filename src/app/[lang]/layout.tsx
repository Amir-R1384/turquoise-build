import Header from '@/components/Header'
import Main from '@/components/Main'
import Wrapper from '@/components/Wrapper'
import getTranslation from '@/translations'
import type { Metadata } from 'next'
import { title, defaultLang } from '../../../appConfig'
import './globals.css'
import { Raleway } from 'next/font/google'
import { getAlternates, getOpenGraph, getTwitterCard, normalizePath } from '@/utils/metadata'

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600']
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params
	const dict = getTranslation(lang)
	const description = dict.seo.description

	const canonicalPath = lang === defaultLang ? '/' : `/${lang}`

	return {
		title: {
			default: dict.meta.title,
			template: `%s | ${dict.meta.title}`
		},
		description,
		authors: [{ name: title }],
		creator: title,
		publisher: title,
		applicationName: title,
		alternates: getAlternates(canonicalPath, lang),
		openGraph: getOpenGraph({
			title,
			description,
			path: canonicalPath,
			lang,
			imageAlt: dict.titles.about
		}),
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1
			}
		},
		twitter: getTwitterCard({
			title,
			description
		})
	}
}

export const fetchCache = 'force-no-store'

export function generateStaticParams() {
	return [{ lang: 'fr' }, { lang: 'en' }]
}

export default async function LangLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: PageProps['params']
}) {
	const { lang } = await params

	return (
		<html lang={lang} className={raleway.className}>
			<body>
				<div className="w-screen overflow-x-hidden">
					<Wrapper>
						<Header lang={lang} />
						<Main>{children}</Main>
					</Wrapper>
				</div>
			</body>
		</html>
	)
}
