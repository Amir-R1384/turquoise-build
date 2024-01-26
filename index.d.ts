type ImageState = {
	i: number
	images: ('hidden' | 'blurred' | 'visible')[]
}

type PageProps = {
	params: { [key: string]: string }
	searchParams: { [key: string]: string }
}

type Lang = 'en' | 'fr'

type RequestFormType = {
	name: string
	email: string
	description: string
	region: string
	options: {
		bedroom: { num: number }
		bathroom: { num: number }
		kitchen: boolean
		livingRoom: boolean
		diningRoom: boolean
		garden: boolean
	}
	area: string
	startDate: string
	endDate: string
}
