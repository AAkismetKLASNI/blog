import { addComment, getComments, getPost, getUsers } from '../api';
import { ROLES } from '../constants';
import { sessions } from '../sessions';

export const createComment = async (userSession, content, postId, authorId) => {
	const accessRoles = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await addComment(content, postId, authorId);

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
