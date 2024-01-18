'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { defaultLang } from '../../appConfig'
import CustomLink from './CustomLink'

export default function Header({ lang }: { lang: string }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const pathname = usePathname().match(lang !== defaultLang ? `(?<=${lang}).*` : `.*`)![0]
	const [serviceMenuOpen, setServiceMenuOpen] = useState(false)

	useEffect(() => {
		setServiceMenuOpen(false)
		setMenuOpen(false)
	}, [pathname])

	const linkStyles = `text-xl hover:!font-light`

	return (
		<>
			<div className="fixed top-0 left-0 z-10 w-full h-headerHeight flex justify-between items-center headerBlur box-border ">
				<CustomLink lang={lang} href="/" className="p-main flex gap-x-main items-center">
					<Image
						src="/assets/logos/logo.svg"
						alt="Logo image"
						width={31}
						height={31}></Image>
					<div className="text-2xl">Turquoise Build</div>
				</CustomLink>

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
			<nav onMouseLeave={() => setServiceMenuOpen(false)}>
				<ul
					className={` ${
						menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
					} fixed flex flex-col gap-3 left-0 z-10  headerBlur top-headerHeight px-main pb-main lg:scale-y-100 lg:opacity-100 origin-top transition-all duration-500`}>
					<li>
						<CustomLink
							lang={lang}
							className={linkStyles}
							href="/projects"
							style={{
								fontWeight: pathname.startsWith('/projects') ? 300 : 200
							}}>
							Projects
						</CustomLink>
					</li>
					<div
						onMouseEnter={() => setServiceMenuOpen(true)}
						onClick={() => setServiceMenuOpen(true)}
						className="text-xl group">
						Services
						<div
							style={{ maxHeight: serviceMenuOpen ? '4rem' : 0 }}
							className="pl-3 pt-1 flex flex-col gap-y-1 overflow-hidden transition-[max-height] duration-700">
							<li>
								<CustomLink
									lang={lang}
									href="/services/design"
									className={linkStyles + ' !text-lg'}>
									Design
								</CustomLink>
							</li>
							<li>
								<CustomLink
									lang={lang}
									href="/services/build"
									className={linkStyles + ' !text-lg'}>
									Build
								</CustomLink>
							</li>
						</div>
					</div>
					<li>
						<CustomLink
							lang={lang}
							className={linkStyles}
							href="/about"
							style={{
								fontWeight: pathname.startsWith('/about') ? 'light' : 200
							}}>
							About Us
						</CustomLink>
					</li>
					<li>
						<CustomLink
							lang={lang}
							className={linkStyles}
							href="/faq"
							style={{
								fontWeight: pathname.startsWith('/faq') ? 'light' : 200
							}}>
							FAQ
						</CustomLink>
					</li>
					<li>
						<CustomLink
							lang={lang}
							className={linkStyles}
							href="/contact"
							style={{
								fontWeight: pathname.startsWith('/contact') ? 'light' : 200
							}}>
							Contact
						</CustomLink>
					</li>
				</ul>
			</nav>
		</>
	)
}
