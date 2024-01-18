'use client'

import { transitioningAtom } from '@/atoms'
import type { ReactNode } from 'react'
import { useRecoilValue } from 'recoil'
import { pageTransitionDuration } from '../../appConfig'

export default function Main({ children }: { children: ReactNode }) {
	const transitioning = useRecoilValue(transitioningAtom)

	return (
		<main
			style={{
				opacity: transitioning ? 0 : 1,
				transitionDuration: `${pageTransitionDuration}ms`
			}}
			className="my-headerHeight mx-auto max-w-screen-lg">
			{children}
		</main>
	)
}
