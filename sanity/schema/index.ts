import { type SchemaTypeDefinition } from 'sanity'
import faqType from './faq'
import generalType from './general'
import projectType from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [generalType, projectType, faqType]
}
