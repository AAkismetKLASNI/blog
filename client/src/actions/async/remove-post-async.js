import axios from 'axios';

export const removePostAsync = (id) => () =>
	axios.delete(`http://localhost:3500/posts/${id}`, {
		withCredentials: true,
		credentials: 'include',
	});
