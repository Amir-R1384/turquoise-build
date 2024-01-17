import sanityClient from './client'

export async function getProjects(lang: string) {
	const docs = await sanityClient.fetch(
		`*[_type == "project"] {
			"overview": overview[_key == "${lang}"][0].value,
			"details": details[_key == "${lang}"][0].value,
			...
		}`
	)

	return docs
}
