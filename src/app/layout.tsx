import type { Metadata, Viewport } from 'next'
import { Raleway } from 'next/font/google'

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600']
})

export const metadata: Metadata = {
	title: 'Construction Turquoise',
	generator: 'Construction Turquoise',
	applicationName: 'Construction Turquoise'
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={raleway.className}>
			<body>
				<div className="w-screen overflow-x-hidden">{children}</div>
			</body>
		</html>
	)
}
