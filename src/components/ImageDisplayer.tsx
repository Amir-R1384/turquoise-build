// Places a few randomly positioned images with a smooth animation + 1 image always centered
'use client'

import { imageStateAtom } from '@/atoms'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import config from '../../appConfig'

const { imageDisplayerBackgroundImagesNum: bgImageNum } = config

//! array length depends on bgImageNum
const defaultPositions = {
	x: [30, 65, 75, 25, 60], // This are based on the center of the images
	y: [0, 15, 20, 40, 50] // This are based on the upper left corner of the images
}
const images = Array(bgImageNum) // [0,1,2,3,4...]
	.fill(null)
	.map((el, i) => i)

let alreadyDisplayed = false // To not redo the display if already done once

const positions: { x: number; y: number; imageIndex: number }[] = []

function assignRandomPosAndImage() {
	for (let i = 0; i < bgImageNum; i++) {
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
}

assignRandomPosAndImage()

// Adding the final image always in the center
positions.push({
	x: 50,
	y: 20,
	imageIndex: bgImageNum
})

export default function ImageDisplayer() {
	let interval: any
	const [imageState, setImageState] = useState<ImageState>({
		i: 0,
		images: ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']
	})
	const [cacheImageState, setCacheImageState] = useRecoilState(imageStateAtom)

	function updateImageState() {
		setImageState(prev => {
			if (prev.i >= bgImageNum + 1) {
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
	}

	useEffect(() => {
		updateImageState()
		// eslint-disable-next-line react-hooks/exhaustive-deps
		interval = !interval && setInterval(updateImageState, 2000)
	}, [])

	return (
		<section className="h-[400px] relative mt-main w-full overflow-x-clip">
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

function CustomImage({ x, y, imageIndex, imageState, cacheImageState, order }: Props) {
	const state = alreadyDisplayed ? cacheImageState.images[order] : imageState.images[order]

	return (
		<div
			style={{
				top: `${y}%`,
				left: `${x}%`,
				backgroundImage: `url(/assets/images/${imageIndex}.png)`,
				backgroundClip: 'content-box'
			}}
			className={
				'absolute bg-center -translate-x-1/2 bg-cover w-[min(400px,50vw)] box-content h-[min(400px,50vw)] border-2 border-transparent transition-all duration-1000 ' +
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
