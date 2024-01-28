/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io'
			}
		]
	},
	logging: {
		fetches: {
			fullUrl: true
		}
	}
}

module.exports = nextConfig
