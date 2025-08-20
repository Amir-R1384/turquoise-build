import ProjectBanner from '@/components/ProjectBanner'

import getTranslation from '@/translations'
import { Metadata } from 'next'
import { getProjects } from '../../../../sanity/lib/functions'
import { title, defaultLang } from '../../../../appConfig'
import { getAlternates, getOpenGraph, getTwitterCard } from '@/utils/metadata'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { lang } = await params

	const dict = getTranslation(lang)

	const canonicalPath = lang === defaultLang ? '/projects' : `/${lang}/projects`
	const pageDescription = `${dict.titles.projects} - ${lang === 'fr' ? 'Découvrez nos projets de rénovation réalisés à Montréal' : 'Discover our completed renovation projects in Montreal'}.`

	return {
		title: dict.titles.projects,
		description: pageDescription,
		alternates: getAlternates(canonicalPath, lang),
		openGraph: getOpenGraph({
			title: `${dict.titles.projects} | ${title}`,
			description: pageDescription,
			path: canonicalPath,
			lang,
			imageAlt: dict.titles.projects
		}),
		twitter: getTwitterCard({
			title: `${dict.titles.projects} | ${title}`,
			description: pageDescription
		})
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
