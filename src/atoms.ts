import { atom } from 'recoil'

export const imageStateAtom = atom<ImageState>({
	key: 'imageStateAtom',
	default: {
		i: 6,
		images: ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']
	}
})

export const transitioningAtom = atom({
	key: 'transitioningAtom',
	default: false
})

export const requestFormAtom = atom<RequestFormType>({
	key: 'requestFormAtom',
	default: {
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
	}
})
