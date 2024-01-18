import ImageDisplayer from '@/components/ImageDisplayer'
import getTranslation from '@/translations'

export default async function Home({ params }: { params: { lang: string } }) {
	const dict = await getTranslation(params.lang)

	return (
		<div className="pt-pageTopPadding">
			<section className="gap-y-7 flex flex-col items-center">
				<h1 className="text-5xl title">We realize your Dream House</h1>
				<button className="button">Get Started</button>
			</section>

			<ImageDisplayer />
		</div>
	)
}
