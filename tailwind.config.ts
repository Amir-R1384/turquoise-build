import type { Config } from 'tailwindcss'
import { headerHeight } from './appConfig'

const config: Config = {
	content: ['./src/components/**/*.tsx', './src/app/**/*.tsx'],
	theme: {
		extend: {
			spacing: {
				main: '1.25rem',
				pageTopPadding: '2.5rem',
				headerHeight: `${headerHeight.rems}rem`
			},
			boxShadow: {
				imageDisplayer: '0px 0px 50px rgba(0, 0, 0, 0.24)'
			}
		}
	},
	plugins: [require('@tailwindcss/container-queries')]
}
export default config
