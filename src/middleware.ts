import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { defaultLang, langs } from '../appConfig'

export function middleware(request: NextRequest) {
	const langCookie = request.cookies.get('lang')?.value
	const { pathname } = request.nextUrl

	// If no cookie
	if (!langs.includes(langCookie!)) {
		const pathnameHasLang = langs.some(
			lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
		)

		if (pathnameHasLang) {
			return
		} else {
			const lang = getLang(request)

			cookies().set('lang', lang)

			request.nextUrl.pathname = `/${lang}${pathname}`

			if (lang === defaultLang) {
				return NextResponse.rewrite(request.nextUrl)
			} else {
				return NextResponse.redirect(request.nextUrl)
			}
		}
	} else {
		if (pathname.startsWith(`/${langCookie}`)) {
			if (langCookie === defaultLang) {
				request.nextUrl.pathname = pathname.slice(3)
				return NextResponse.redirect(request.nextUrl)
			}
			return
		} else {
			// Making sure there isnt already a wrong lang in the pathname

			if (langs.some(lang => pathname.startsWith(`/${lang}`))) {
				const cleanPathname = pathname.slice(3)
				request.nextUrl.pathname = `/${langCookie}${cleanPathname}`
				return NextResponse.redirect(request.nextUrl)
			} else {
				request.nextUrl.pathname = `/${langCookie}${pathname}`

				if (langCookie === defaultLang) {
					return NextResponse.rewrite(request.nextUrl)
				} else {
					return NextResponse.redirect(request.nextUrl)
				}
			}
		}
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|studio).*)']
}

function getLang(request: NextRequest) {
	const headers = { 'accept-language': request.headers.get('accept-language')! }
	let languages = new Negotiator({ headers }).languages()

	return match(languages, langs, defaultLang)
}
