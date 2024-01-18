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
