'use client'

import { transitioningAtom } from '@/atoms'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { useSetRecoilState } from 'recoil'
import { defaultLang, pageTransitionDuration } from '../../appConfig'

interface Props {
	href: string
	lang: string
	children: ReactNode
	[key: string]: any
}

export default function CustomLink({ href, lang, children, ...args }: Props) {
	const customHref = lang === defaultLang ? href : `/${lang}${href}`
	const setTransitioning = useSetRecoilState(transitioningAtom)
	const router = useRouter()
	const pathname = usePathname()

	function onClick() {
		if (customHref === pathname) return
		if (
			(!customHref.startsWith(pathname) && !customHref.includes('/get-started')) ||
			!pathname.includes('/get-started')
		)
			setTransitioning(true) // If the new route is a child or going from ,  don't transition
		setTimeout(() => {
			router.push(customHref)
		}, pageTransitionDuration)
	}

	useEffect(() => setTransitioning(false), [pathname, setTransitioning])

	return (
		<button {...args} onClick={onClick}>
			{children}
		</button>
	)
}
