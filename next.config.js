/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				port: '',
				pathname: '/images/av568r97/production/**'
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
