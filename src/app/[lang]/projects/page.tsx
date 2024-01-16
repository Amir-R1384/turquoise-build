import ProjectBanner from '@/components/ProjectBanner'

export default function Projects() {
	return (
		<div className="pageTopPadding space-y-pageTopPadding flex flex-col items-center">
			<h1 className="title">Projects</h1>
			<div className="grid w-[80%] mx-auto gap-[3vw] md:grid-cols-2 grid-cols-1">
				<ProjectBanner
					id="testId"
					imageUrl="/assets/images/0.png"
					title="Maison de Charles-Etienne"
					date="October 2023 - January 2024"
				/>
				<ProjectBanner
					id="testId"
					imageUrl="/assets/images/1.png"
					title="Maison de Charles-Etienne"
					date="October 2023 - January 2024"
				/>
				<ProjectBanner
					id="testId"
					imageUrl="/assets/images/2.png"
					title="Maison de Charles-Etienne"
					date="October 2023 - January 2024"
				/>
				<ProjectBanner
					id="testId"
					imageUrl="/assets/images/3.png"
					title="Maison de Charles-Etienne"
					date="October 2023 - January 2024"
				/>
			</div>
		</div>
	)
}
