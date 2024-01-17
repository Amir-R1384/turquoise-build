export function expressAsYearAndMonth(date: string, locale: string) {
	return Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long'
	}).format(new Date(date))
}
