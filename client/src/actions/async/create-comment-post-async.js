import { createComment } from '../index';
import axios from 'axios';

export const createCommentPostAsync = (content, postId) => (dispatch) => {
	axios
		.post(
			`http://localhost:3500/posts/${postId}/comments`,
			{ content },
			{ withCredentials: true, credentials: 'include' },
		)
		.then(({ status, data: { error, data } }) => {
			if (error) {
				return;
			}
			if (status === 200) {
				dispatch(createComment(data));
			}
		});
};
