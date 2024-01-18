import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { getGeneral } from '../../../../sanity/lib/functions'
import { urlForImage } from '../../../../sanity/lib/image'

export default async function About({ params }: PageProps) {
	const general = await getGeneral(params.lang)

	const { aboutUsText, aboutUsImage } = general

	return (
		<div className="md-container">
			<div className="title text-left font-extralight mb-10">About Us</div>
			<Image
				className="mx-auto w-[100%] mb-10"
				alt="Image of the project"
				src={urlForImage(aboutUsImage)}
				width={500}
				height={0}
			/>
			<div className="portable-text">
				<PortableText value={aboutUsText} />
			</div>
		</div>
	)
}
