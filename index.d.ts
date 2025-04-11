type ImageState = {
	i: number
	images: ('hidden' | 'blurred' | 'visible')[]
}

type Params = { [key: string]: string }

type PageProps = {
	params: Promise<Params>
	searchParams: Promise<Params>
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

type TestimonialInput = {
	name: string
	email: string
	rating: number
	message: string
}
