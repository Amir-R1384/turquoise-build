import ServiceLayout from '@/components/ServiceLayout'

export default async function Design({ params }: PageProps) {
	return <ServiceLayout lang={params.lang} path="Design" />
}
