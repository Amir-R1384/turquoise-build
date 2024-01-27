import * as EmailValidator from 'email-validator'
import { NextRequest, NextResponse } from 'next/server'
import { doesCustomerExist } from '../../../../sanity/lib/functions'

export async function POST(request: NextRequest) {
	try {
		const data = await request.json()

		// Name and Email validation
		const { name, email } = data
		const errors: any = { name: false, email: false }

		if (name.trim() === '') {
			errors.name = 'A full name must be provided.'
		}
		if (email.trim() === '') {
			errors.email = 'A email must be provided.'
		} else if (!EmailValidator.validate(email)) {
			errors.email = 'The provided email is invalid.'
		}

		if (errors.name || errors.email) {
			return NextResponse.json({ type: 'fieldError', errors }, { status: 400 })
		}

		// Checking if the user has already submitted a request
		if (await doesCustomerExist(email)) {
			return NextResponse.json({ type: 'duplicateCustomer' }, { status: 400 })
		}

		// Simply not adding empty fields in the db to stop validation (for dates specially)
		const customer = { ...data }
		if (!customer.startDate) delete customer.startDate
		if (!customer.endDate) delete customer.endDate

		if (data.options.bedroom.num) customer.options.bedroom = data.options.bedroom.num
		else delete customer.options.bedroom
		if (data.options.bathroom.num) customer.options.bathroom = data.options.bathroom.num
		else delete customer.options.bathroom

		const res = await fetch(
			`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/production`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.SANITY_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					mutations: [
						{
							create: {
								_type: 'customer',
								...customer
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
