'use client'

import { Raleway } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { defaultLang, langs } from '../../appConfig'
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

function getLang(pathname: string): Lang {
	for (const lang of langs) {
		if (pathname.startsWith(`/${lang}`)) return lang
	}
	return defaultLang
}

export default function NotFound() {
	const pathname = usePathname()
	const lang = getLang(pathname)

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
