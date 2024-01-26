import { type SchemaTypeDefinition } from 'sanity'
import faqType from './faq'
import generalType from './general'
import projectType from './project'
import requestType from './request'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [generalType, projectType, faqType, requestType]
}
