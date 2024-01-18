import sanityClient from './client'

// To not repeat the output format everytime, it's put inside this function
const projectFormat = (lang: string) => `{
	...,
	"overview": overview[_key == "${lang}"][0].value[0],
	"details": details[_key == "${lang}"][0].value[0],
}`

export async function getProjects(lang: string) {
	const docs = await sanityClient.fetch(`*[_type == "project"] ${projectFormat(lang)}`)

	return docs
}

export async function getProjectByUrlName(urlName: string, lang: string) {
	const doc = (
		await sanityClient.fetch(
			`*[_type == "project" && urlName == "${urlName}"] ${projectFormat(lang)}`
		)
	)[0]

	return doc
}
