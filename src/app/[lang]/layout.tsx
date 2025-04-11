import Header from '@/components/Header'
import Main from '@/components/Main'
import Wrapper from '@/components/Wrapper'
import getTranslation from '@/translations'
import type { Metadata } from 'next'
import './globals.css'

const title = 'Construction Turquoise'
const baseUrl = 'https://turquoisebuild.com'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params
	const dict = getTranslation(lang)
	const description = dict.seo.description

	return {
		title: {
			default: title,
			template: `%s | ${title}`
		},
		description,
		keywords: [title, 'Renovation', 'Construction', 'Building', 'Montreal'],
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: '/',
			languages: {
				'en-CA': '/en',
				'fr-CA': '/fr'
			}
		},
		openGraph: {
			title,
			description,
			url: baseUrl,
			siteName: title,
			type: 'website'
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true
			}
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [`${baseUrl}/twitter-image.jpg`]
		}
	}
}

export const fetchCache = 'force-no-store'

export function generateStaticParams() {
	return [{ lang: 'en' }]
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
		<Wrapper>
			<Header lang={lang} />
			<Main>{children}</Main>
		</Wrapper>
	)
}
