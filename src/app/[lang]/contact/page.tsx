import getTranslation from '@/translations'
import Image from 'next/image'
import { getGeneral } from '../../../../sanity/lib/functions'

export default async function Contact({ params }: PageProps) {
	const dict = getTranslation(params.lang)

	const general = await getGeneral(params.lang)

	const { email, tel } = general

	const formattedTel = formatPhoneNumber(tel)

	return (
		<div className="md-container">
			<div className="title text-left font-extralight mb-10">{dict.titles.contact}</div>

			<div className="flex flex-col gap-y-5 text-lg md:text-xl">
				<a href={`mailto:${email}`} className="pl-2 border-l border-stone-500">
					<span>{dict.pages.contact.emailUs}</span>
					<span className="font-light">{email}</span>
				</a>
				<a href="tel:+5147035145" className="pl-2 border-l border-stone-500">
					<span>{dict.pages.contact.phone}</span>
					<span className="font-light">{formattedTel}</span>
				</a>
				<div className="flex gap-5 items-center mt-5">
					<a href="#" target="_blank">
						<Image
							alt="Instagram link"
							src="/assets/icons/instagram.svg"
							width={30}
							height={30}
						/>
					</a>
					<a href="#" target="_blank">
						<Image
							alt="LinkedIn link"
							src="/assets/icons/linkedin.svg"
							width={30}
							height={30}
						/>
					</a>
					<a href="#" target="_blank">
						<Image
							alt="Pinterest link"
							src="/assets/icons/pinterest.svg"
							width={30}
							height={30}
						/>
					</a>
				</div>
			</div>
		</div>
	)
}

function formatPhoneNumber(tel: string) {
	let match = tel.match(/^(\+\d)(\d{3})(\d{3})(\d{4})$/)!
	return match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4]
}
