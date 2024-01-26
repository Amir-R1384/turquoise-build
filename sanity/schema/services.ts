import { defineField, defineType } from 'sanity'

/**
- name
- Question
- Answer
*/

const serviceType = defineType({
	type: 'document',
	name: 'service',
	title: 'Services',
	fields: [
		defineField({
			type: 'string',
			name: 'name',
			title: 'Name',
			hidden: true
		}),
		defineField({
			type: 'array',
			of: [{ type: 'image' }],
			name: 'images',
			title: 'Images',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'internationalizedArrayMarkdown',
			name: 'text',
			title: 'Text',
			validation: Rule => Rule.required()
		})
	]
})

export default serviceType
