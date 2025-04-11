import Accordian from '@/components/Accordian'
import getTranslation from '@/translations'
import { Metadata } from 'next'
import { getFAQs } from '../../../../sanity/lib/functions'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)

	return {
		title: dict.titles.faq
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
			</div>
		</div>
	)
}
