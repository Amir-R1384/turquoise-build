import CustomLink from '@/components/CustomLink'
import Stars from '@/components/Stars'
import getTranslation from '@/translations'
import { Metadata } from 'next'
import { getTestimonials } from '../../../../sanity/lib/functions'
import { title, defaultLang } from '../../../../appConfig'
import { getAlternates, getOpenGraph, getTwitterCard } from '@/utils/metadata'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)
	const canonicalPath = lang === defaultLang ? '/testimonials' : `/${lang}/testimonials`
	const pageDescription = `${dict.titles.testimonial} - ${lang === 'fr' ? 'Découvrez les avis de nos clients satisfaits sur nos services de rénovation' : 'Read reviews from our satisfied clients about our renovation services'}.`

	return {
		title: dict.titles.testimonial,
		description: pageDescription,
		alternates: getAlternates(canonicalPath, lang),
		openGraph: getOpenGraph({
			title: `${dict.titles.testimonial} | ${title}`,
			description: pageDescription,
			path: canonicalPath,
			lang,
			imageAlt: dict.titles.testimonial
		}),
		twitter: getTwitterCard({
			title: `${dict.titles.testimonial} | ${title}`,
			description: pageDescription
		})
	}
}

export default async function Testimonials({ params }: PageProps) {
	const { lang } = await params
	const dict = getTranslation(lang)

	const testimonials = await getTestimonials()

	return (
		<div className="md-container px-main">
			<h1 className="title mb-10">{dict.titles.testimonial}</h1>
			<div className="flex flex-col gap-y-5 w-full mx-auto">
				{testimonials.map((testimonial: any, i: number) => (
					<div key={i} className="border @container border-stone-500 p-5 space-y-3">
						<div className="flex-col @xs:flex-row flex gap-x-5 gap-y-3 items-start @xs:items-center">
							<div className="flex gap-x-5 items-center">
								<div className="text-lg font-light">{testimonial.name}</div>
								<Stars rating={testimonial.rating as number} />
							</div>

							<div>
								{Intl.DateTimeFormat(lang, {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								}).format(new Date(testimonial._createdAt))}
							</div>
						</div>
						<div>{testimonial.message}</div>
					</div>
				))}
			</div>
			<CustomLink
				lang={lang}
				href="/testimonials/new"
				className="underline mx-auto mt-10 text-lg">
				{dict.buttons.addTestimonial}
			</CustomLink>
		</div>
	)
}
