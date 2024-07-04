export const generateDate = () =>
	new Date(Math.random() * 1000000000000 + 1600000000000)
		.toISOString()
		.substring(0, 16)
		.replace('T', ' ');
