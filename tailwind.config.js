module.exports = {
	mode: 'jit',
	purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		container: {
			center: true
		},
		extend: {
			colors: {
				...require('daisyui/colors'),
				gray: {
					50: '#fafafa',
					300: '#d4d4d8',
					400: '#a1a1aa',
					600: '#52525b',
					700: '#242526',
					800: '#191a1b',
					900: '#131214'
				},
				// These are capitalised because I copied them from Figma. Not sure which is more standard. /shrug
				lights: {
					100: '#FBFFFC',
					200: '#F9F0DF',
					300: '#FDA360',
					400: '#AF3408',
					500: '#79211A',
					600: '#000500'
				},
				darks: {
					100: '#FFFFFF',
					150: '#C4C4C4',
					200: '#3A3D40',
					300: '#1E1F23',
					400: '#191B1F'
				},
				chain: {
					ethereum: '#627eea',
					polygon: '#8247e5',
					optimism: '#ff3856',
					arbitrum: '#28a0f0',
					boba: '#d7fe44'
				}
			},
			fontSize: {
				xxs: '0.5rem'
			},
			fontFamily: {
				shibui: ["'Sora'", 'sans-serif', 'Helvetica', 'Arial'],
				inter: ["'Inter'", 'sans-serif']
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('daisyui'), require('tw-elements/dist/plugin')]
};
