import { NextRequest, NextResponse } from 'next/server'
import {
	doesCustomerExist,
	getCustomerByEmail,
	getTestimonials
} from '../../../../sanity/lib/functions'

export const fetchCache = 'force-no-store'

export async function POST(request: NextRequest) {
	try {
		// Name and Email validation
		const { name, email, rating, message } = await request.json()

		const errors = { name: '', email: '', rating: '', message: '' }

		if (name.trim() === '') {
			errors.name = 'A full name must be provided.'
		}
		if (email.trim() === '') {
			errors.email = 'An email must be provided.'
		} else if (!(await doesCustomerExist(email))) {
			errors.email = 'No project request has been submitted with this email.'
		}
		if (rating < 1 || rating > 5) {
			errors.rating = 'A rating between 1 and 5 should be provided.'
		}
		if (message.trim() === '') {
			errors.message = 'A message must be provided.'
		}

		if (Object.values(errors).some(err => err !== '')) {
			return NextResponse.json({ type: 'fieldError', errors }, { status: 400 })
		}

		const customer = await getCustomerByEmail(email)

		if (customer.projectFinished !== true) {
			return NextResponse.json({ type: 'projectNotFinished' }, { status: 400 })
		}

		const testimonials = await getTestimonials()

		if (testimonials.some((el: any) => el.email === email)) {
			return NextResponse.json({ type: 'duplicate' }, { status: 400 })
		}

		const res = await fetch(
			`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/production`,
			{
				cache: 'no-store',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.SANITY_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					mutations: [
						{
							create: {
								_type: 'testimonial',
								name,
								email,
								rating,
								message
							}
						}
					]
				})
			}
		)

		if (res.ok) return NextResponse.json({ type: 'success' }, { status: 200 })
	} catch (err) {
		return { type: 'unhandledError' }
	}
}
