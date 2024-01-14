'use client'
import type { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

export default function Main({ children }: { children: ReactNode }) {
	return <RecoilRoot>{children}</RecoilRoot>
}
