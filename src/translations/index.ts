import en from './en.json'
import fr from './fr.json'

const dictionaries = {
	en,
	fr
}

export default function getTranslation(lang: string) {
	return dictionaries[lang as Lang]
}
