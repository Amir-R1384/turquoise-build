import ServiceLayout from '@/components/ServiceLayout'

export default async function Build({ params }: PageProps) {
	return <ServiceLayout lang={params.lang} path="Build" />
}
