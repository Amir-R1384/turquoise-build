'use server'

import * as EmailValidator from 'email-validator'
import { unstable_noStore } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { doesCustomerExist } from '../../../../sanity/lib/functions'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
	unstable_noStore()

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

		if (res.ok) {
			const emailRes = await resend.emails.send({
				from: 'Construction Turquoise<hello@turquoisebuild.com>',
				to: JSON.parse(process.env.ADMIN_EMAILS!),
				subject: 'New Client!',
				html: `<html>
						<body>
							<h1>NEW CUSTOMER</h1>

							<h2>Info</h2>
							<ul>
								<li>Name: ${name}</li>
								<li>Email: ${email}</li>
							</ul>

							<p>Check the dashboard for more information about the client</p>
						</body>
					</html>`
			})

			if (emailRes.error) console.error(JSON.stringify(emailRes.error))

			return NextResponse.json({ type: 'success' }, { status: 200 })
		} else {
			const json = await res.json()
			console.error(json)
			return NextResponse.json({ type: 'unhandledError' }, { status: 500 })
		}
	} catch (err) {
		console.error(err)
		return NextResponse.json({ type: 'unhandledError' }, { status: 500 })
	}
}
