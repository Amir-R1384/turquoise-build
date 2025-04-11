import ServiceLayout from '@/components/ServiceLayout'
import getTranslation from '@/translations'
import { Metadata } from 'next'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)

	return {
		title: dict.titles.design
	}
}

export default async function Design({ params }: PageProps) {
	const { lang } = await params
	return <ServiceLayout lang={lang} path="Design" />
}
