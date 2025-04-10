import ServiceLayout from '@/components/ServiceLayout'
import getTranslation from '@/translations'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const lang = params.lang

	const dict = getTranslation(lang)

	return {
		title: dict.titles.design
	}
}

export default async function Design({ params }: PageProps) {
	return <ServiceLayout lang={params.lang} path="Design" />
}
