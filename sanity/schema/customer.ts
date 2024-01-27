import { defineField, defineType } from 'sanity'

/**
- name
- email
- description
- region
- area
- startDate
- endDate
- options
	bedroom: number
	bathroom: number
	kitchen: boolean
	living room: boolean
	garden: boolean
- Is project finished
*/

const customerType = defineType({
	type: 'document',
	name: 'customer',
	title: 'Customers',
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
			title: 'Email',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'text',
			name: 'description',
			title: 'Description',
			hidden: ({ document }) => !document?.description
		}),
		defineField({
			type: 'string',
			name: 'region',
			title: 'Region',
			hidden: ({ document }) => !document?.region
		}),
		defineField({
			type: 'string',
			name: 'area',
			title: 'Area',
			hidden: ({ document }) => !document?.area
		}),
		defineField({
			type: 'date',
			name: 'startDate',
			title: 'Start Date',
			options: {
				dateFormat: 'MMMM Do YYYY'
			},
			hidden: ({ document }) => !document?.startDate
		}),
		defineField({
			type: 'date',
			name: 'endDate',
			title: 'End Date',
			options: {
				dateFormat: 'MMMM Do YYYY'
			},
			hidden: ({ document }) => !document?.endDate
		}),
		defineField({
			type: 'object',
			name: 'options',
			title: 'Options',
			fields: [
				{
					type: 'number',
					name: 'bedroom',
					title: 'Bedroom',
					// @ts-ignore
					hidden: ({ document }) => document?.options?.bedroom === 0
				},
				{
					type: 'number',
					name: 'bathroom',
					title: 'Bathroom',
					// @ts-ignore
					hidden: ({ document }) => document?.options?.bathroom === 0
				},
				{
					type: 'boolean',
					name: 'kitchen',
					title: 'Kitchen',
					// @ts-ignore
					hidden: ({ document }) => !document?.options?.kitchen
				},
				{
					type: 'boolean',
					name: 'livingRoom',
					title: 'Living Room',
					// @ts-ignore
					hidden: ({ document }) => !document?.options?.livingRoom
				},
				{
					type: 'boolean',
					name: 'diningRoom',
					title: 'Dining Room',
					// @ts-ignore
					hidden: ({ document }) => !document?.options?.diningRoom
				},
				{
					type: 'boolean',
					name: 'garden',
					title: 'Garden',
					// @ts-ignore
					hidden: ({ document }) => !document?.options?.garden
				}
			]
		}),
		defineField({
			type: 'boolean',
			name: 'projectFinished',
			title: 'Is project finished'
		})
	]
})

export default customerType
