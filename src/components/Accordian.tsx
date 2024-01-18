'use client'

import { useRef, useState } from 'react'

interface Props {
	question: string
	answer: string
}

export default function Accordian({ question, answer }: Props) {
	const [open, setOpen] = useState(false)
	const element = useRef<HTMLDivElement>(null)

	return (
		<button
			onClick={() => setOpen(prev => !prev)}
			className="w-full text-left text-xl  md:text-2xl font-light pl-2 transition-colors border-l border-stone-500 hover:bg-stone-100">
			{question}
			<div
				ref={element}
				style={{
					height: open ? element.current!.scrollHeight : 0
				}}
				className={`w-full text-left text-lg md:text-xl pl-2 box-content overflow-hidden transition-all duration-500 ${
					open ? `pt-3` : ' py-0'
				}`}>
				{answer}
			</div>
		</button>
	)
}
