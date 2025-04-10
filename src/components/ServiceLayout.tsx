import getTranslation from '@/translations'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { getServices } from '../../sanity/lib/functions'
import { urlForImage } from '../../sanity/lib/image'
import CustomLink from './CustomLink'

interface Props {
	lang: string
	path: 'Build' | 'Design'
}

export default async function ServiceLayout({ lang, path }: Props) {
	const dict = getTranslation(lang)

	const service = await getServices(lang, path)

	return (
		<div className="md-container space-y-10">
			{/* @ts-ignore */}
			<div className="title font-extralight">{dict.titles[path.toLowerCase()]}</div>
			<div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-[min(2rem,3vw)]">
				{service.images.map((image: any, i: number) => (
					<Image
						key={i}
						alt="Show case photos"
						src={urlForImage(image)}
						width={500}
						height={300}
						className="w-full h-full"
					/>
				))}
			</div>
			<div className="portable-text">
				<PortableText value={service.text} />
			</div>
			<CustomLink lang={lang} href="/get-started" className="button block mx-auto">
				{dict.buttons.getStarted}
			</CustomLink>
		</div>
	)
}
