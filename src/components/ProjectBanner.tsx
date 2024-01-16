import Link from 'next/link'

interface Props {
	id: string
	imageUrl: string
	title: string
	date: string
}

export default function ProjectBanner({ id, imageUrl, title, date }: Props) {
	return (
		<div className="@container flex justify-end flex-col relative w-full aspect-square border border-stone-500 shadow-md">
			<div className="space-y-10 z-10 project-banner-content bg-white hover:opacity-100 opacity-0 transition-opacity duration-300 p-main w-full h-full">
				<h2 className="text-[10cqw]">{title}</h2>
				<div className="text-[5cqw]">{date}</div>
				<Link
					href={`/projects/${id}`}
					className="button bg-white bg-opacity-70 inline-block text-[5cqw] py-[0.2em] px-[1.5em]">
					More about this project
				</Link>
			</div>
			<div
				className="absolute -z-10 top-0 left-0 w-full h-full bg-cover transition-all"
				style={{ backgroundImage: `url(${imageUrl})` }}></div>
		</div>
	)
}
