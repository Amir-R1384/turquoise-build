import { type SchemaTypeDefinition } from 'sanity'
import faqType from './faq'
import generalType from './general'
import projectType from './project'
import requestType from './request'
import serviceType from './services'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [generalType, projectType, serviceType, faqType, requestType]
}
