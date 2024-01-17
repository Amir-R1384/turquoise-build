import { expressAsYearAndMonth } from '@/util/date'
import { urlForImage } from '../../sanity/lib/image'
import CustomLink from './CustomLink'

interface Props {
	projectInfo: any
	lang: string
}

export default function ProjectBanner({ projectInfo, lang }: Props) {
	const { name, urlName, starterImages, startDate, endDate } = projectInfo

	const date = `${expressAsYearAndMonth(startDate, lang)} - ${expressAsYearAndMonth(
		endDate,
		lang
	)}`

	return (
		<div className="@container flex justify-end flex-col relative w-full aspect-square border border-stone-500 shadow-md">
			<div className="space-y-10 z-10 project-banner-content bg-white hover:opacity-100 opacity-0 transition-opacity duration-300 p-main w-full h-full">
				<h2 className="text-[10cqw]">{name}</h2>
				<div className="text-[5cqw]">{date}</div>
				<CustomLink
					lang={lang}
					href={`/projects/${urlName}`}
					className="button bg-white bg-opacity-70 inline-block text-[5cqw] py-[0.2em] px-[1.5em]">
					More about this project
				</CustomLink>
			</div>
			<div
				className="absolute -z-10 top-0 left-0 w-full h-full bg-cover transition-all"
				style={{ backgroundImage: `url(${urlForImage(starterImages[0])})` }}></div>
		</div>
	)
}
