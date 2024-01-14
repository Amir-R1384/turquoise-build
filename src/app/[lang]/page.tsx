import ImageDisplayer from '@/components/ImageDisplayer'
import getTranslation from '@/translations'

export default async function Home({ params }: { params: { lang: string } }) {
	const dict = await getTranslation(params.lang)

	return (
		<div className="pt-10">
			<section className=" gap-y-7 flex flex-col items-center">
				<h1 className="text-5xl text-center font-extralight">
					We realize your Dream House
				</h1>
				<button className="border hover:shadow-md transition-all border-stone-500 rounded-full text-stone-700 shadow text-lg px-5 py-1">
					Get Started
				</button>
			</section>

			<ImageDisplayer />
		</div>
	)
}
