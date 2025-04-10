import getTranslation from '@/translations'
import { PortableText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import { getGeneral } from '../../../../sanity/lib/functions'
import { urlForImage } from '../../../../sanity/lib/image'

export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const lang = params.lang

	const dict = getTranslation(lang)

	return {
		title: dict.titles.about
	}
}

export default async function About({ params }: PageProps) {
	const dict = getTranslation(params.lang)

	const general = await getGeneral(params.lang)

	const { aboutUsText, team } = general

	return (
		<div className="md-container">
			<div className="title text-left font-extralight mb-10">{dict.titles.about}</div>
			<div className="grid grid-cols-2 mb-10 gap-5">
				{team.map((member: any) => (
					<div key={member.name} className="space-y-5">
						<Image
							src={urlForImage(member.image)}
							className="object-center aspect-square object-cover block mx-auto"
							alt={member.name}
							width={200}
							height={200}
						/>
						<h2 className="text-xl font-normal text-center">{member.name}</h2>
					</div>
				))}
			</div>

			<div className="portable-text">
				<PortableText value={aboutUsText} />
			</div>
		</div>
	)
}
