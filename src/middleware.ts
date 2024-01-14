import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse, type NextRequest } from 'next/server'
import appConfig from '../appConfig.json'

const { langs, defaultLang } = appConfig

export function middleware(request: NextRequest) {
	// Check if there is any supported lang in the pathname
	const { pathname } = request.nextUrl
	const pathnameHasLang = langs.some(
		lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
	)

	if (pathnameHasLang) return

	// Redirect if there is no lang
	const lang = getLang(request)

	request.nextUrl.pathname = `/${lang}${pathname}`

	if (lang === defaultLang) {
		return NextResponse.rewrite(request.nextUrl)
	} else {
		return NextResponse.redirect(request.nextUrl)
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)']
}

function getLang(request: NextRequest) {
	const headers = { 'accept-language': request.headers.get('accept-language')! }
	let languages = new Negotiator({ headers }).languages()

	return match(languages, langs, defaultLang)
}
