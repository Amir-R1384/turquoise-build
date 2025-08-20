import type { Metadata, Viewport } from 'next'
import { Raleway } from 'next/font/google'

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600']
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	// Accessibility: allow pinch-zoom and user scaling, set a reasonable maximum
	maximumScale: 5,
	userScalable: true
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return children
	// <html className={raleway.className}>
	// 	<body>
	// 		<div className="w-screen overflow-x-hidden">{children}</div>
	// 	</body>
	// </html>
}
