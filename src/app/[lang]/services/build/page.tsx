import ServiceLayout from '@/components/ServiceLayout'
import getTranslation from '@/translations'
import { Metadata } from 'next'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)

	return {
		title: dict.titles.build
	}
}

export default async function Build({ params }: PageProps) {
	const { lang } = await params

	return <ServiceLayout lang={lang} path="Build" />
}
