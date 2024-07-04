import { ROLES } from '../constants';
import { addPost, updateDataPost } from '../api';
import { sessions } from '../sessions';

export const savePost = async (userSession, newData) => {
	const accessRoles = [ROLES.ADMIN];

	const access = sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Недостаточно прав',
			res: null,
		};
	}

	const result = newData.id
		? await updateDataPost(newData)
		: await addPost(newData);

	return {
		error: null,
		res: result,
	};
};
