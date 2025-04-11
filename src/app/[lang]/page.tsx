import CustomLink from '@/components/CustomLink'
import ImageDisplayer from '@/components/ImageDisplayer'
import getTranslation from '@/translations'

export default async function Home({ params }: PageProps) {
	const { lang } = await params
	const dict = getTranslation(lang)

	return (
		<div className="py-pageTopPadding lg:pt-0">
			<section className="gap-y-7 flex flex-col items-center">
				<h1 className="text-5xl title">{dict.pages.home.ideasToHome}</h1>
				<CustomLink lang={lang} href="/get-started" className="button">
					{dict.buttons.getStarted}
				</CustomLink>
			</section>

			<ImageDisplayer />
		</div>
	)
}
