import * as EmailValidator from 'email-validator'
import { defineField, defineType } from 'sanity'

/**
- Name (hidden)
- Team[]
	- Image
	- Name
- About us text
- Email
- Phone number
*/

const generalType = defineType({
	type: 'document',
	name: 'general',
	title: 'General settings',
	fields: [
		defineField({
			type: 'string',
			name: 'name',
			title: 'Name',
			initialValue: 'General settings',
			hidden: true
		}),
		defineField({
			type: 'array',
			name: 'team',
			title: 'Team',
			of: [
				{
					type: 'object',
					name: 'member',
					fields: [
						{
							type: 'image',
							name: 'image',
							title: 'Image',
							validation: Rule => Rule.required()
						},
						{
							type: 'string',
							name: 'name',
							title: 'Name',
							validation: Rule => Rule.required()
						}
					]
				}
			],
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
