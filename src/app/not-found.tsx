'use client'

import { Source_Serif_4 } from 'next/font/google'
import Link from 'next/link'
import './[lang]/globals.css'

const source_serif_4 = Source_Serif_4({ subsets: ['latin'], weight: ['200', '300', '400', '500'] })

const translations = {
	noPage: {
		en: "The page you're looking for doesn't exist or it has been removed",
		fr: "La page que vous cherchez n'existe pas ou elle a été enlevée"
	},
	return: {
		en: 'Return to Home Screen',
		fr: 'Retourner à la maison'
	}
}

export default function notFound() {
	const lang = navigator.language.toLowerCase().includes('fr') ? 'fr' : 'en'

	return (
		<div
			className={
				source_serif_4.className +
				' px-main flex text-center flex-col items-center gap-y-10 pt-20'
			}>
			<h1 className="text-4xl ">{translations.noPage[lang]}</h1>
			<Link href={lang === 'en' ? '/' : '/fr'} className="button">
				{translations.return[lang]}
			</Link>
		</div>
	)
}
