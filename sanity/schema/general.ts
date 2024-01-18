import * as EmailValidator from 'email-validator'
import { defineField, defineType } from 'sanity'

/**
- Name (hidden)
- About us image
- About us text
- Email
- Phone number
*/

const generalType = defineType({
	type: 'document',
	name: 'general',
	title: 'General',
	fields: [
		defineField({
			type: 'string',
			name: 'name',
			title: 'Name',
			initialValue: 'General settings',
			hidden: true
		}),
		defineField({
			type: 'image',
			name: 'aboutUsImage',
			title: 'About us Image',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'internationalizedArrayMarkdown',
			name: 'aboutUsText',
			title: 'About us Text',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'string',
			name: 'email',
			title: 'Email',
			validation: Rule => [
				Rule.required().custom(email =>
					EmailValidator.validate(email!) ? true : 'Invalid email format'
				)
			]
		}),
		defineField({
			type: 'string',
			name: 'tel',
			title: 'Phone number',
			description: 'format: +1xxxxxxxxxx',
			validation: Rule =>
				Rule.required().custom(tel =>
					/^\+\d{11}$/.test(tel!) ? true : 'Invalid phone number format'
				)
		})
	]
})

export default generalType
