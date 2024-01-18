import { expressAsYearAndMonth } from '@/util/date'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { getProjectByUrlName } from '../../../../../sanity/lib/functions'
import { urlForImage } from '../../../../../sanity/lib/image'

export default async function Project({ params }: PageProps) {
	const project = await getProjectByUrlName(params.urlName, params.lang)

	const { name, startDate, endDate, overview, starterImages, details, moreImages } = project

	const date = `${expressAsYearAndMonth(startDate, params.lang)} - ${expressAsYearAndMonth(
		endDate,
		params.lang
	)}`

	return (
		<div className="@container pt-pageTopPadding px-main flex flex-col max-w-screen-md mx-auto gap-y-2 md:gap-y-5">
			<h1 className="text-4xl font-thin md:text-5xl text-left">{name}</h1>
			<div className="text-lg md:text-xl mb-5">{date}</div>
			<div className="grid grid-cols-1 gap-main mb-5">
				<Image
					className="mx-auto w-[100%]"
					alt="Image of the project"
					src={urlForImage(starterImages[0])}
					width={500}
					height={0}
				/>
				<Image
					className="mx-auto w-[100%]"
					alt="Image of the project"
					src={urlForImage(starterImages[1])}
					width={500}
					height={0}
				/>
			</div>
			<section className="px-0 space-y-4 mb-5">
				<div className="text-md md:text-xl text-justify font-light !leading-relaxed portable-text">
					<PortableText value={overview} />
				</div>
			</section>

			<div className="grid grid-cols-1 gap-main mb-5">
				<Image
					className="mx-auto w-[100%]"
					alt="Image of the project"
					src={urlForImage(moreImages[0])}
					width={500}
					height={0}
				/>
				<Image
					className="mx-auto w-[100%]"
					alt="Image of the project"
					src={urlForImage(moreImages[1])}
					width={500}
					height={0}
				/>
				<Image
					className="mx-auto w-[100%]"
					alt="Image of the project"
					src={urlForImage(moreImages[2])}
					width={500}
					height={0}
				/>
			</div>

			<section className="px-0 space-y-4 mb-10">
				<div className="text-md md:text-xl text-justify !leading-relaxed  portable-text">
					<PortableText value={details} />
				</div>
			</section>
		</div>
	)
}
