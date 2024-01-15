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
		<div className="fixed bg-white lg:bg-transparent top-0 z-10 left-0 flex w-full justify-between items-center box-border h-headerHeight">
			<div className="p-main bg-white flex gap-x-main items-center ">
				<Image src="/assets/logos/logo.svg" alt="Logo image" width={31} height={31}></Image>
				<div className="text-3xl">Turquoise Build</div>
			</div>
			<ul
				className={` ${
					menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
				} absolute flex flex-col gap-3 left-0 bg-white top-full px-main pb-main lg:scale-y-100 lg:opacity-100 origin-top overflow-hidden transition-all duration-500`}>
				<li>
					<Link className=" text-xl font-normal" href="/">
						Home
					</Link>
				</li>
				<li>
					<Link className=" text-xl" href="/services/build">
						Build
					</Link>
				</li>
				<li>
					<Link className=" text-xl " href="/services/design">
						Design
					</Link>
				</li>
				<li>
					<Link className=" text-xl" href="/about">
						About
					</Link>
				</li>
				<li>
					<Link className=" text-xl" href="/contact">
						Contact
					</Link>
				</li>
			</ul>

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
	)
}
