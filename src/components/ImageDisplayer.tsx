'use client'

import { imageStateAtom } from '@/atoms'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const defaultPositions = {
	x: [10, 50, 0, 60, 50],
	y: [0, 10, 30, 20, 40]
}
const images = [0, 1, 2, 3, 4]
let alreadyDisplayed = false

const positions: { x: number; y: number; imageIndex: number }[] = []
for (let i = 0; i < 5; i++) {
	const posIndex = Math.floor(Math.random() * defaultPositions.x.length)
	const imageIndex = Math.floor(Math.random() * images.length)

	positions.push({
		x: defaultPositions.x[posIndex],
		y: defaultPositions.y[posIndex],
		imageIndex: images[imageIndex]
	})

	defaultPositions.x.splice(posIndex, 1)
	defaultPositions.y.splice(posIndex, 1)
	images.splice(imageIndex, 1)
}

positions.push({
	x: 30,
	y: 20,
	imageIndex: 5
})

export default function ImageDisplayer() {
	let interval: any
	const [imageState, setImageState] = useState<ImageState>({
		i: 0,
		images: ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']
	})
	const [cacheImageState, setCacheImageState] = useRecoilState(imageStateAtom)

	function updateImageState() {
		interval =
			!interval &&
			setInterval(() => {
				setImageState(prev => {
					if (prev.i === 6) {
						clearInterval(interval)
						setCacheImageState(prev)
						alreadyDisplayed = true
						return prev
					}
					const { i, images } = prev
					const newArray = [...images]
					newArray[i] = 'visible'
					if (newArray[i - 1]) newArray[i - 1] = 'blurred'
					return {
						i: i + 1,
						images: newArray
					}
				})
			}, 2000)
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => updateImageState(), [])

	return (
		<section className="h-96 relative mt-main  w-full">
			{positions.map(({ x, y, imageIndex }, i) => (
				<CustomImage
					key={i}
					x={x}
					y={y}
					imageIndex={imageIndex}
					order={i}
					imageState={imageState}
					cacheImageState={cacheImageState}
				/>
			))}
		</section>
	)
}

interface Props {
	x: number
	y: number
	imageIndex: number
	imageState: ImageState
	cacheImageState: ImageState
	order: number
}

console.log(positions)

function CustomImage({ x, y, imageIndex, imageState, cacheImageState, order }: Props) {
	const state = alreadyDisplayed ? cacheImageState.images[order] : imageState.images[order]
	console.log(order, imageIndex)

	return (
		<div
			style={{
				top: `${y}%`,
				left: `${x}%`,
				backgroundImage: `url(/assets/images/${imageIndex}.png)`,
				backgroundClip: 'content-box'
			}}
			className={
				'absolute bg-center bg-cover w-[400px] box-content h-[400px] border-2 border-transparent transition-all duration-1000 ' +
				`${
					state === 'visible'
						? '!border-stone-500 border-2 shadow-imageDisplayer'
						: state === 'hidden'
						? 'opacity-0'
						: ''
				}`
			}>
			<div
				className={
					'bg-white transition-colors  duration-[1500ms] w-full h-full ' +
					`${state === 'blurred' ? 'bg-opacity-80' : 'bg-opacity-0'}`
				}></div>
		</div>
	)
}
