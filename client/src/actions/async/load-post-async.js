import { setLoadPost } from '../index';

export const loadPostAsync = (requestServer, postId) => (dispatch) =>
	requestServer('fetchPost', postId).then(({ error, res }) => {
		if (res) {
			dispatch(setLoadPost(res));
		}
		return error;
	});
