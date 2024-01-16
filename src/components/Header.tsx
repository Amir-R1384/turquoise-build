'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false)
	const pathname = usePathname()

	useEffect(() => setMenuOpen(false), [pathname])

	return (
		<>
			<div className="fixed top-0 left-0 z-10 w-full h-headerHeight flex justify-between items-center headerBlur box-border ">
				<Link href="/" className="p-main flex gap-x-main items-center">
					<Image
						src="/assets/logos/logo.svg"
						alt="Logo image"
						width={31}
						height={31}></Image>
					<div className="text-2xl font-light">Turquoise Build</div>
				</Link>

				<button onClick={() => setMenuOpen(prev => !prev)}>
					<Image
						alt="Menu"
						src="/assets/icons/menu.svg"
						width={32}
						height={23}
						className="lg:hidden m-main"
					/>
				</button>
			</div>
			<nav>
				<ul
					className={` ${
						menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
					} fixed flex flex-col gap-3 left-0 z-10  headerBlur top-headerHeight px-main pb-main lg:scale-y-100 lg:opacity-100 origin-top transition-all duration-500`}>
					<li>
						<Link
							className="text-xl"
							href="/design"
							style={{
								fontWeight: pathname.startsWith('/design') ? 'normal' : 'lighter'
							}}>
							Design
						</Link>
					</li>
					<li>
						<Link
							className="text-xl"
							href="/projects"
							style={{
								fontWeight: pathname.startsWith('/projects') ? 'normal' : 'lighter'
							}}>
							Projects
						</Link>
					</li>
					<li>
						<Link
							className="text-xl"
							href="/build"
							style={{
								fontWeight: pathname.startsWith('/build') ? 'normal' : 'lighter'
							}}>
							Build
						</Link>
					</li>

					<li>
						<Link
							className="text-xl"
							href="/about"
							style={{
								fontWeight: pathname.startsWith('/about') ? 'normal' : 'lighter'
							}}>
							About Us
						</Link>
					</li>
					<li>
						<Link
							className="text-xl"
							href="/faq"
							style={{
								fontWeight: pathname.startsWith('/faq') ? 'normal' : 'lighter'
							}}>
							FAQ
						</Link>
					</li>
					<li>
						<Link
							className="text-xl"
							href="/contact"
							style={{
								fontWeight: pathname.startsWith('/contact') ? 'normal' : 'lighter'
							}}>
							Contact
						</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}
