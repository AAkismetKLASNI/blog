import { setLoadPost } from '../index';

export const removeCommentAsync =
	(requestServer, commentId, postId) => (dispatch) =>
		requestServer('removeComment', commentId, postId).then(({ error, res }) => {
			if (error) {
				return;
			}

			dispatch(setLoadPost(res));
		});
