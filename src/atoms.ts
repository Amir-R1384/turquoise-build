import { atom } from 'jotai'

export const imageStateAtom = atom<ImageState>({
	i: 6,
	images: ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']
})

export const transitioningAtom = atom(false)

export const requestFormAtom = atom<RequestFormType>({
	name: '',
	email: '',
	description: '',
	region: '',
	options: {
		bedroom: { num: 0 },
		bathroom: { num: 0 },
		kitchen: false,
		livingRoom: false,
		diningRoom: false,
		garden: false
	},
	area: '',
	startDate: '',
	endDate: ''
})
