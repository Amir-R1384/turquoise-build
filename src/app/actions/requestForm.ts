'use server'

import * as EmailValidator from 'email-validator'
import { doesCustomerExist } from '../../../sanity/lib/functions'

type Errors = { name: false | string; email: false | string }

export default async function CreateRequest(data: RequestFormType) {
	try {
		// Name and Email validation
		const { name, email } = data
		const errors: Errors = { name: false, email: false }

		if (name.trim() === '') {
			errors.name = 'A full name must be provided.'
		}
		if (email.trim() === '') {
			errors.email = 'A email must be provided.'
		} else if (!EmailValidator.validate(email)) {
			errors.email = 'The provided email is invalid.'
		}

		if (errors.name || errors.email) {
			return {
				type: 'fieldError',
				errors
			}
		}

		// Checking if the user has already submitted a request
		if (await doesCustomerExist(email)) {
			return {
				type: 'duplicateCustomer'
			}
		}

		const { description, region, area, startDate, endDate } = data
		const { bedroom, bathroom, kitchen, livingRoom, diningRoom, garden } = data.options

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
								name,
								email,
								description,
								region,
								area,
								startDate,
								endDate,
								options: {
									bedroom: bedroom.num,
									bathroom: bathroom.num,
									kitchen,
									livingRoom,
									diningRoom,
									garden
								}
							}
						}
					]
				})
			}
		)

		if (res.status === 200) return { type: 'success' }
	} catch (err) {
		return { type: 'unhandledError' }
	}
}
