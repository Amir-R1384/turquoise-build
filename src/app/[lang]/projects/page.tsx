import ProjectBanner from '@/components/ProjectBanner'

import getTranslation from '@/translations'
import { Metadata } from 'next'
import { getProjects } from '../../../../sanity/lib/functions'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)

	return {
		title: dict.titles.projects
	}
}

export default async function Projects({ params }: PageProps) {
	const { lang } = await params

	const dict = getTranslation(lang)

	const projects = await getProjects(lang)

	return (
		<div className="pt-5 gap-y-10 flex flex-col items-center">
			<h1 className="title">{dict.titles.projects}</h1>
			<div className="grid w-3/4 items-center mx-auto gap-[3vw] md:grid-cols-2 grid-cols-1">
				{projects.map((project: any) => (
					<ProjectBanner key={project._id} projectInfo={project} lang={lang} />
				))}
			</div>
		</div>
	)
}
