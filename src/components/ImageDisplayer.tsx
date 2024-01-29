'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

const TRANSITION_DURATION = 1000
const DELAY = 100
let moving = false
let interval: any

export default function ImageDisplayer() {
	const [imageArray, setImageArray] = useState([0, 1, 2, 3, 4, 5])
	const [translate, setTranslate] = useState(0)
	const [paused, setPaused] = useState(false)

	function moveForward() {
		moving = true
		setTranslate(-1)
		setTimeout(() => {
			addToEnd(setImageArray)
			setTranslate(0)
		}, TRANSITION_DURATION + DELAY)
	}

	function moveBackward() {
		moving = true
		setTranslate(1)
		setTimeout(() => {
			addToBeginning(setImageArray)
			setTranslate(0)
		}, TRANSITION_DURATION + DELAY)
	}

	useEffect(() => {
		if (paused) {
			clearInterval(interval)
		} else {
			setTimeout(() => moveForward(), 500)
			interval = setInterval(moveForward, TRANSITION_DURATION * 3 + DELAY)
		}
	}, [paused])

	useEffect(() => {
		moving = false
	}, [imageArray])

	return (
		<section className="h-[min(80vw,500px)] mt-10 relative w-full">
			{imageArray.map((el, i) => (
				<Link
					href="/#"
					key={el}
					style={{
						transform: `translate(calc(-50% + ${
							(i - 3 + translate) * 620
						}px), calc(-50%))`,
						opacity:
							i - 3 + translate === 0
								? 1
								: Math.abs(i - 3 + translate) === 1
								? 0.1
								: 0,
						transitionDuration: `${TRANSITION_DURATION}ms`,
						backgroundImage: `url(/assets/images/${el}.jpg)`
					}}
					className="absolute w-[min(90vw,600px)] bg-center bg-cover h-[min(80vw,500px)] top-1/2 left-1/2 origin-center transition-all"
				/>
			))}
			<div className="absolute w-[min(90vw,600px)] mt-3 flex justify-between items-center top-full left-1/2 -translate-x-1/2">
				<button onClick={() => setPaused(prev => !prev)}>
					<Image
						alt="Pause/Resume"
						src={`/assets/icons/${paused ? 'play' : 'pause'}.svg`}
						width={40}
						height={40}
					/>
				</button>
				<div className="flex gap-x-main">
					<button
						onClick={() => {
							if (!moving) {
								setPaused(true)
								moveBackward()
							}
						}}>
						<Image
							alt="Previous image"
							src="/assets/icons/left.svg"
							width={40}
							height={40}
						/>
					</button>
					<button
						onClick={() => {
							if (!moving) {
								setPaused(true)
								moveForward()
							}
						}}>
						<Image
							alt="Next image"
							src="/assets/icons/right.svg"
							width={40}
							height={40}
						/>
					</button>
				</div>
			</div>
		</section>
	)
}

// Utility functions
function addToBeginning(setImageArray: Dispatch<SetStateAction<number[]>>) {
	setImageArray(prev => {
		const newArr = [...prev]
		const last = newArr.splice(-1, 1)[0]
		newArr.unshift(last)

		return newArr
	})
}

function addToEnd(setImageArray: Dispatch<SetStateAction<number[]>>) {
	setImageArray(prev => {
		const newArr = [...prev]
		const first = newArr.splice(0, 1)[0]
		newArr.push(first)

		return newArr
	})
}
