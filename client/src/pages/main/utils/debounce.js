export const debounce = (fn, delay) => {
	let timeout;

	return (...params) => {
		clearTimeout(timeout);
		timeout = setTimeout(fn, delay, ...params);
	};
};
