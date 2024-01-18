import { defineField, defineType } from 'sanity'

/**
- name
- Question
- Answer
*/

const faqType = defineType({
	type: 'document',
	name: 'faq',
	title: 'FAQ',
	fields: [
		defineField({
			type: 'string',
			name: 'name',
			title: 'Name',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'internationalizedArrayString',
			name: 'question',
			title: 'Question',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'internationalizedArrayString',
			name: 'answer',
			title: 'Answer',
			validation: Rule => Rule.required()
		})
	]
})

export default faqType
