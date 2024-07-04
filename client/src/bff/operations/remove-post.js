import { sessions } from '../sessions';
import { ROLES } from '../constants';
import { getComments, deletePost, deleteComment } from '../api';

export const removePost = async (userSession, id) => {
	const accessRoles = [ROLES.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deletePost(id);

	const comments = await getComments(id);

	await Promise.all(
		comments.map(({ id: commentId }) => deleteComment(commentId)),
	);

	return {
		error: null,
		res: true,
	};
};
