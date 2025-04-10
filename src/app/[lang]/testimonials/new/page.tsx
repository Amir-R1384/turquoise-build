'use client'

import Stars from '@/components/Stars'
import getTranslation from '@/translations'
import { useState } from 'react'

export default function CreateTestimonial({ params }: PageProps) {
	const dict = getTranslation(params.lang)

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
				alert(dict.messages.error)
				break
		}
	}

	return (
		<div className="md-container">
			<title>{dict.titles.newTestimonial}</title>
			<div className="title mb-10">{dict.titles.newTestimonial}</div>
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
					<label htmlFor="email">{dict.labels.sameEmail}</label>
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
					<label>{dict.labels.rating}</label>
					<Stars
						rating={inputs.rating}
						onClick={el => setInputs(prev => ({ ...prev, rating: el }))}
					/>
					<div className="text-red-600 -mt-1">{errors.rating ? errors.rating : ''}</div>
				</div>
				<div className="flex flex-col gap-y-2">
					<label htmlFor="message">{dict.labels.message}</label>
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
					{dict.buttons.submit}
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
						? dict.messages.testimonialSuccess
						: status === 'projectNotFinished'
							? dict.messages.projectnotFinished
							: status === 'duplicate'
								? dict.messages.duplicateTestimonial
								: ''}
				</p>
			</div>
		</div>
	)
}
