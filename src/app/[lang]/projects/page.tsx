import ProjectBanner from '@/components/ProjectBanner'

import { getProjects } from '../../../../sanity/lib/functions'

export default async function Projects({ params }: PageProps) {
	const projects = await getProjects(params.lang)

	return (
		<div className="pt-5 gap-y-10 flex flex-col items-center">
			<h1 className="title">Projects</h1>
			<div className="grid w-3/4 items-center mx-auto gap-[3vw] md:grid-cols-2 grid-cols-1">
				{projects.map((project: any) => (
					<ProjectBanner key={project._id} projectInfo={project} lang={params.lang} />
				))}
			</div>
		</div>
	)
}
