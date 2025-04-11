export const metadata = {
	title: 'Studio',
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false
		}
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
