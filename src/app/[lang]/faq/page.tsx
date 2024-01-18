import Accordian from '@/components/Accordian'
import { getFAQs } from '../../../../sanity/lib/functions'

export default async function FAQ({ params }: PageProps) {
	const faqs: { question: string; answer: string }[] = await getFAQs(params.lang)

	return (
		<div className="md-container">
			<div className="title text-left font-extralight mb-10">Frequently asked questions</div>
			<div className="flex flex-col gap-y-5">
				{faqs.map((faq, i) => (
					<Accordian key={i} question={faq.question} answer={faq.answer} />
				))}
			</div>
		</div>
	)
}
