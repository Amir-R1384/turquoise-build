'use client'

import Image from 'next/image'

interface Props {
	rating: number
	onClick?: (el: number) => void
}

export default function Stars({ rating, onClick }: Props) {
	return (
		<div className="flex gap-x-2">
			{[1, 2, 3, 4, 5].map(el => (
				<Image
					onClick={() => onClick && onClick(el)}
					key={el}
					src={`/assets/icons/${
						rating >= el ? 'star' : el - rating < 1 ? 'star-half' : 'star-outline'
					}.svg`}
					alt="star rating"
					width={20}
					height={20}
					className={`${onClick && 'cursor-pointer'}`}
				/>
			))}
		</div>
	)
}
