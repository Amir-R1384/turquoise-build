'use client'

import { transitioningAtom } from '@/atoms'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { useSetRecoilState } from 'recoil'
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
	const setTransitioning = useSetRecoilState(transitioningAtom)
	const router = useRouter()
	const pathname = usePathname()

	function onClick() {
		if (customHref === pathname) return
		setTransitioning(true)
		setTimeout(() => {
			router.push(customHref)
		}, appConfig.pageTransitionDuration)
	}

	useEffect(() => setTransitioning(false), [pathname, setTransitioning])

	return (
		<button {...args} onClick={onClick}>
			{children}
		</button>
	)
}
