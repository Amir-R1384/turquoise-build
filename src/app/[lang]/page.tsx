import CustomLink from '@/components/CustomLink'
import ImageDisplayer from '@/components/ImageDisplayer'
import getTranslation from '@/translations'

export default async function Home({ params }: { params: { lang: string } }) {
	const dict = await getTranslation(params.lang)

	return (
		<div className="pt-pageTopPadding">
			<section className="gap-y-7 flex flex-col items-center">
				<h1 className="text-5xl title">Turn ideas into Home</h1>
				<CustomLink lang={params.lang} href="/get-started" className="button">
					Tell us about your project
				</CustomLink>
			</section>

			<ImageDisplayer />
		</div>
	)
}
