import Link from 'next/link'
import type { ReactNode } from 'react'
import appConfig from '../../appConfig'

interface Props {
	href: string
	lang: string
	children: ReactNode
	[key: string]: any
}

const { defaultLang } = appConfig

export default function CustomLink({ href, lang, children, ...args }: Props) {
	const customHref = lang === defaultLang ? href : `/${lang}${href}`

	return (
		<Link {...args} href={customHref}>
			{children}
		</Link>
	)
}
