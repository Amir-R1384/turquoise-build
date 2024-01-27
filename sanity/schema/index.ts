import { type SchemaTypeDefinition } from 'sanity'
import customerType from './customer'
import faqType from './faq'
import generalType from './general'
import projectType from './project'
import serviceType from './services'
import testimonialType from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [generalType, projectType, faqType, serviceType, customerType, testimonialType]
}
