import { defineField, defineType } from 'sanity'

/**
- Name
- Email
- Rating
- Message
*/

const testimonialType = defineType({
	type: 'document',
	name: 'testimonial',
	title: 'Testimonials',
	fields: [
		defineField({
			type: 'string',
			name: 'name',
			title: 'Name',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'string',
			name: 'email',
			title: 'email',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'number',
			name: 'rating',
			title: 'Rating',
			validation: Rule => Rule.required().max(5).min(1)
		}),
		defineField({
			type: 'text',
			name: 'message',
			title: 'Message',
			validation: Rule => Rule.required()
		})
	]
})

export default testimonialType
