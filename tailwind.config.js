/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				zain: ["Zain"],
				"zain-light": ["Zain-Light"],
				"zain-bold": ["Zain-Bold"],
				"zain-extrabold": ["Zain-ExtraBold"],
			},
			colors: {
				text: "#242424",
				background: "#ffffff",
				theme: "#55933E",
				muted: "#818181",
				icon: "#687076",
				tab: {
					DEFAULT: "#687076",
					selected: "#242424",
				},
			},
			fontSize: {
				xs: 12,
				sm: 14,
				base: 16,
				lg: 18,
				xl: 20,
				"2xl": 22,
			},
		},
	},
	plugins: [],
};
