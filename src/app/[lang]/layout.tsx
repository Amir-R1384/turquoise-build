import Header from '@/components/Header'
import Main from '@/components/Main'
import Wrapper from '@/components/Wrapper'
import getTranslation from '@/translations'
import type { Metadata, ResolvingMetadata, Viewport } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600']
})

const title = 'Construction Turquoise'
const baseUrl = 'https://turquoisebuild.com'

export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const lang = params.lang

	const dict = getTranslation(lang)

	const description = dict.seo.description

	return {
		title: {
			default: title,
			template: `%s | ${title}`
		},
		description,
		generator: title,
		applicationName: title,
		referrer: 'origin-when-cross-origin',
		keywords: [title, 'Renovation', 'Construction', 'Building', 'Montreal'],
		metadataBase: new URL(baseUrl),
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
			images: [`${baseUrl}/twitter-image.jpg`] // Must be an absolute URL
		}
	}
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1
}

export const fetchCache = 'force-no-store'

export function generateStaticParams() {
	return [{ lang: 'en' }]
}

export default function RootLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: any
}) {
	return (
		<html lang={params.lang}>
			<body className={`${raleway.className}`}>
				<div className="w-screen overflow-x-hidden">
					<Wrapper>
						<Header lang={params.lang} />
						<Main>{children}</Main>
					</Wrapper>
				</div>
			</body>
		</html>
	)
}
