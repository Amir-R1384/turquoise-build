import CustomLink from '@/components/CustomLink'
import getTranslation from '@/translations'
import { expressAsYearAndMonth } from '@/util/date'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { getProjectByUrlName } from '../../../../../sanity/lib/functions'
import { urlForImage } from '../../../../../sanity/lib/image'

export default async function Project({ params }: PageProps) {
	const { lang, urlName } = await params
	const dict = getTranslation(lang)
	const project = await getProjectByUrlName(urlName, lang)

	const { name, startDate, endDate, overview, starterImages, details, moreImages } = project

	const date = `${expressAsYearAndMonth(startDate, lang)} - ${expressAsYearAndMonth(
		endDate,
		lang
	)}`

	return (
		<div className="@container md-container  flex flex-col gap-y-2 md:gap-y-5">
			<title>{name}</title>
			<h1 className="text-4xl font-thin md:text-5xl text-left">{name}</h1>
			<div className="text-lg md:text-xl mb-5">{date}</div>
			<div className="grid grid-cols-1 gap-main mb-5">
				{starterImages != null && starterImages.length > 0 && (
					<div className="grid grid-cols-1 gap-main mb-5">
						{starterImages.map((image: any) => (
							<Image
								key={image._key}
								className="mx-auto w-[100%]"
								alt="Image of the project"
								src={urlForImage(image)}
								width={500}
								height={200}
							/>
						))}
					</div>
				)}
			</div>
			<section className="px-0 space-y-4 mb-5">
				<div className="portable-text">
					<PortableText value={overview} />
				</div>
			</section>

			{moreImages != null && moreImages.length > 0 && (
				<div className="grid grid-cols-1 gap-main mb-5">
					{moreImages.map((image: any) => (
						<Image
							key={image._key}
							className="mx-auto w-[100%]"
							alt="Image of the project"
							src={urlForImage(image)}
							width={500}
							height={200}
						/>
					))}
				</div>
			)}

			{details != null && (
				<section className="px-0 space-y-4 mb-10">
					<div className="portable-text">
						<PortableText value={details} />
					</div>
				</section>
			)}

			<CustomLink lang={lang} href="/get-started" className="button block mx-auto">
				{dict.buttons.getStarted}
			</CustomLink>
		</div>
	)
}
