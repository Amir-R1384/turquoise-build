'use client'

import Stars from '@/components/Stars'
import { useState } from 'react'

export default function CreateTestimonial({ params }: PageProps) {
	const [status, setStatus] = useState<'success' | 'projectNotFinished' | 'duplicate' | null>(
		null
	)
	const [inputs, setInputs] = useState<TestimonialInput>({
		name: '',
		email: '',
		rating: 1,
		message: ''
	})

	const [errors, setErrors] = useState<any>({
		name: false,
		email: false,
		rating: false,
		message: false
	})

	async function onSubmit() {
		setErrors({ name: false, email: false, rating: false, message: false })
		setStatus(null)
		const res = await fetch('/api/testimonial', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(inputs)
		})

		const json = await res.json()

		switch (json?.type) {
			case 'success':
				setStatus('success')
				break

			case 'projectNotFinished':
				setStatus('projectNotFinished')
				break

			case 'duplicate':
				setStatus('duplicate')
				break

			case 'fieldError':
				window.scrollTo({ top: 0 })
				setErrors(json.errors!)
				break

			default:
				alert('Something went wrong. Please try again later')
				break
		}
	}

	return (
		<div className="md-container">
			<div className="title mb-10">Write your opinion about us</div>
			<div className="space-y-5">
				<div className="flex flex-col gap-y-2">
					<label htmlFor="name">Name</label>
					<input
						id="name"
						type="text"
						value={inputs.name}
						onChange={e => setInputs(prev => ({ ...prev, name: e.target.value }))}
						placeholder="John Smith"
						className={`${errors.name && 'border-red-500'} input w-full md:w-1/2`}
					/>
					<div className="text-red-600 -mt-1">{errors.name ? errors.name : ''}</div>
				</div>
				<div className="flex flex-col gap-y-2">
					<label htmlFor="email">Email used when submitting request</label>
					<input
						id="email"
						type="text"
						value={inputs.email}
						onChange={e => setInputs(prev => ({ ...prev, email: e.target.value }))}
						placeholder="john.smith@gmail.com"
						className={`${errors.email && 'border-red-500'} input w-full`}
					/>
					<div className="text-red-600 -mt-1">{errors.email ? errors.email : ''}</div>
				</div>
				<div className="flex flex-col gap-y-2">
					<label>Rating</label>
					<Stars
						rating={inputs.rating}
						onClick={el => setInputs(prev => ({ ...prev, rating: el }))}
					/>
					<div className="text-red-600 -mt-1">{errors.rating ? errors.rating : ''}</div>
				</div>
				<div className="flex flex-col gap-y-2">
					<label htmlFor="message">Message</label>
					<textarea
						value={inputs.message}
						onChange={e => setInputs(prev => ({ ...prev, message: e.target.value }))}
						className={`${
							errors.message && 'border-red-500'
						} border w-full min-h-[100px] input`}
					/>
					<div className="text-red-600 -mt-1">{errors.message ? errors.message : ''}</div>
				</div>
				<button onClick={onSubmit} className="button">
					Submit
				</button>
				<p
					className={`${
						status === 'success'
							? 'text-green-600'
							: status === 'projectNotFinished' || status === 'duplicate'
							? 'text-red-600'
							: ''
					} text-center`}>
					{status === 'success'
						? 'Thank you for your feedback'
						: status === 'projectNotFinished'
						? "Your project is not finished yet, you can write a review once it's finished."
						: status === 'duplicate'
						? 'You have already submitted a testimonial.'
						: ''}
				</p>
			</div>
		</div>
	)
}
