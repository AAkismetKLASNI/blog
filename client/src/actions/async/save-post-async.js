import axios from 'axios';
import { setLoadPost } from '../index';

export const savePostAsync = (id, newDataPost) => (dispatch) => {
	const saveRequest = id
		? axios.patch(`http://localhost:3500/posts/${id}`, newDataPost, {
				withCredentials: true,
				credentials: 'include',
			})
		: axios.post('http://localhost:3500/posts', newDataPost, {
				withCredentials: true,
				credentials: 'include',
			});

	return saveRequest.then(({ data: { data } }) => {
		dispatch(setLoadPost(data));

		return data;
	});
};
