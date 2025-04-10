'use client'

import { Raleway } from 'next/font/google'
import Link from 'next/link'
import './[lang]/globals.css'

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600']
})

const translations = {
	noPage: {
		en: "The page you're looking for doesn't exist or it has been removed",
		fr: "La page que vous cherchez n'existe pas ou elle a été enlevée"
	},
	return: {
		en: 'Return to Home',
		fr: 'Retourner à la Maison'
	}
}

export const metadata = {
	title: 'Construction Turquoise'
}

export default function notFound() {
	const lang =
		typeof navigator !== 'undefined' && navigator.language.toLowerCase().includes('fr')
			? 'fr'
			: 'en'

	return (
		<div
			className={
				raleway.className + ' px-main flex text-center flex-col items-center gap-y-10 pt-20'
			}>
			<h1 className="text-4xl ">{translations.noPage[lang]}</h1>
			<Link href={lang === 'en' ? '/' : '/fr'} className="button">
				{translations.return[lang]}
			</Link>
		</div>
	)
}
