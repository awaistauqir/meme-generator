/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
			const newUtilities = {
				'.horizontal-tb': {
					writingMode: 'horizontal-tb',
				},
				'.vertical-rl': {
					writingMode: 'vertical-rl',
				},
				'.vertical-lr': {
					writingMode: 'vertical-lr',
				},
			};
			addUtilities(newUtilities);
		}),
	],
};
