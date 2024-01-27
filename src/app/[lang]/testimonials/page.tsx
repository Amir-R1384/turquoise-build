import CustomLink from '@/components/CustomLink'
import Stars from '@/components/Stars'
import { getTestimonials } from '../../../../sanity/lib/functions'

export const fetchCache = 'force-no-store'

export default async function Testimonials({ params }: PageProps) {
	const testimonials = await getTestimonials()

	return (
		<div className="md-container px-main">
			<h1 className="title mb-10">What past clients say</h1>
			<div className="flex flex-col gap-y-5 w-full mx-auto">
				{testimonials.map((testimonial: any, i: number) => (
					<div key={i} className="border @container border-stone-500 p-5 space-y-3">
						<div className="flex-col @xs:flex-row flex gap-x-5 gap-y-3 items-start @xs:items-center">
							<div className="flex gap-x-5 items-center">
								<div className="text-lg font-light">{testimonial.name}</div>
								<Stars rating={testimonial.rating as number} />
							</div>

							<div>
								{Intl.DateTimeFormat(params.locale, {
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
				lang={params.lang}
				href="/testimonials/new"
				className="underline mx-auto mt-10 text-lg">
				Worked with us? Write your opinion
			</CustomLink>
		</div>
	)
}
