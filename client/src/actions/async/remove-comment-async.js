import { removeComment } from '../index';
import axios from 'axios';

export const removeCommentAsync = (commentId, postId) => (dispatch) => {
	axios
		.delete(`http://localhost:3500/posts/${postId}/comments/${commentId}`, {
			withCredentials: true,
			credentials: 'include',
		})
		.then(({ data: { error } }) => {
			if (error) {
				return;
			}

			dispatch(removeComment(commentId));
		});
};
