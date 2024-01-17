import { Source_Serif_4 } from 'next/font/google'
import Link from 'next/link'
import './[lang]/globals.css'

const source_serif_4 = Source_Serif_4({ subsets: ['latin'], weight: ['200', '300', '400', '500'] })

export default function notFound() {
	return (
		<div
			className={
				source_serif_4.className + ' flex text-center flex-col items-center gap-y-10 pt-20'
			}>
			<h1 className="text-4xl ">
				The page you&apos;re looking for doesn&apos;t exist or it has been removed
			</h1>
			<Link href="/" className="button">
				Return to Home Screen
			</Link>
		</div>
	)
}
