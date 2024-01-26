import { defineField, defineType } from 'sanity'

/**
- Name
- Start date
- Finish date
- Overview
- Starter images
- Details
- More images
*/

const projectType = defineType({
	type: 'document',
	name: 'project',
	title: 'Projects',
	fields: [
		defineField({
			type: 'string',
			name: 'name',
			title: 'Project Name',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'string',
			name: 'urlName',
			title: 'URL Name',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'date',
			name: 'startDate',
			title: 'Start Date',
			description: 'Only year and month are important',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'date',
			name: 'endDate',
			title: 'End Date',
			description: 'Only year and month are important',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'internationalizedArrayMarkdown',
			name: 'overview',
			title: 'Overview',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'array',
			of: [{ type: 'image' }],
			name: 'starterImages',
			title: 'Starter images',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'internationalizedArrayMarkdown',
			name: 'details',
			title: 'Details',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'array',
			of: [{ type: 'image' }],
			name: 'moreImages',
			title: 'More images',
			validation: Rule => Rule.required()
		})
	]
})

export default projectType
