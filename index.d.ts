type ImageState = {
	i: number
	images: ('hidden' | 'blurred' | 'visible')[]
}

type PageProps = {
	params: { [key: string]: string }
	searchParams: { [key: string]: string }
}
