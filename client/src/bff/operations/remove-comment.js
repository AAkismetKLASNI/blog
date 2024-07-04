import { deleteComment, getComments, getPost, getUsers } from '../api';
import { ROLES } from '../constants';
import { sessions } from '../sessions';

export const removeComment = async (userSession, commentId, postId) => {
	const accessRoles = [ROLES.ADMIN, ROLES.MODERATOR];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteComment(commentId);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	const users = await getUsers();

	const commentsWithAuthor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);

		return {
			...comment,
			author: user.login,
		};
	});

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
