'use client'

import CreateRequest from '@/app/actions/requestForm'
import { requestFormAtom } from '@/atoms'
import CustomLink from '@/components/CustomLink'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

type Errors = { name: false | string; email: false | string }

export default function GetStatrted({ params, children }: any) {
	const [requestForm, setRequestForm] = useRecoilState(requestFormAtom)
	const [errors, setErrors] = useState<Errors>({ name: false, email: false }) // Only name and email are required so only those can be mistaken
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState<'success' | 'duplicate' | null>(null)
	const pathname = usePathname()

	async function onSubmit() {
		setStatus(null)
		setErrors({ name: false, email: false })
		setLoading(true)

		const path = pathname.includes('/guide') ? 'guide' : 'describe'

		// If the user went to the guide but changed mind and went to the describe section, remove the data from guide, and vice versa
		const usefulRequestForm: RequestFormType =
			path === 'guide'
				? {
						...requestForm,
						description: ''
				  }
				: {
						...requestForm,
						region: '',
						area: '',
						options: {
							bedroom: { num: 0 },
							bathroom: { num: 0 },
							kitchen: false,
							livingRoom: false,
							diningRoom: false,
							garden: false
						},
						startDate: '',
						endDate: ''
				  }

		try {
			const res = await CreateRequest(usefulRequestForm)

			switch (res?.type) {
				case 'success':
					setStatus('success')
					break

				case 'fieldError':
					window.scrollTo({ top: 0 })
					setErrors(res.errors!)
					break

				case 'duplicateCustomer':
					setStatus('duplicate')
					break
				default:
					alert('Something went wrong. Please try again later')

					break
			}
		} catch (err: any) {
			alert('Something went wrong. Please try again later')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="md-container">
			<div className="title text-center font-extralight mb-10">Get Started</div>
			<div className="space-y-10">
				<div className="space-y-5">
					<div className="text-2xl mb-5">Contact information (Required)</div>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="name">Name</label>
						<input
							id="name"
							type="text"
							value={requestForm.name}
							onChange={e =>
								setRequestForm(prev => ({ ...prev, name: e.target.value }))
							}
							placeholder="John Smith"
							className={`${errors.name && 'border-red-500'} input w-full md:w-1/2`}
						/>
						<div className="text-red-600 -mt-1">{errors.name ? errors.name : ''}</div>
					</div>
					<div className="flex flex-col gap-y-2">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="text"
							value={requestForm.email}
							onChange={e =>
								setRequestForm(prev => ({ ...prev, email: e.target.value }))
							}
							placeholder="john.smith@gmail.com"
							className={`${errors.name && 'border-red-500'} input`}
						/>
						<div className="text-red-600 -mt-1">{errors.email ? errors.email : ''}</div>
					</div>
				</div>
				<div className="space-y-5">
					<div className="text-2xl mb-5">Project description (Optional)</div>
					<div className="flex flex-col md:flex-row w-full justify-center items-center gap-x-5 gap-y-2">
						<CustomLink
							lang={params.lang}
							href="/get-started/guide"
							className={`button ${
								pathname.endsWith('guide') &&
								'text-white bg-stone-500 transition-all'
							}`}>
							Use our guide
						</CustomLink>
						<div className="text-lg">Or</div>
						<CustomLink
							lang={params.lang}
							href="/get-started/describe"
							className={`button ${
								pathname.endsWith('describe') &&
								'text-white bg-stone-500 transition-all'
							}`}>
							Provide your own description
						</CustomLink>
					</div>
					<div>{children}</div>
				</div>
				{!pathname.endsWith('get-started') && (
					<div>
						<button
							aria-disabled={loading}
							onClick={onSubmit}
							className={`${loading && 'opacity-50'} button mx-auto block mb-2`}>
							Submit request
						</button>
						<p
							className={`${
								status === 'success'
									? 'text-green-600'
									: status === 'duplicate'
									? 'text-red-600'
									: ''
							} text-center`}>
							{status === 'success'
								? 'Your request was submitted.'
								: status === 'duplicate'
								? 'You have already submitted a request with this email. Please wait and our team will contact you'
								: 'We will contact you shortly to discuss your project.'}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
