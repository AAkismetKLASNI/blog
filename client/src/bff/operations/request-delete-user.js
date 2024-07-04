import { deleteUser } from '../api';
import { ROLES } from '../constants';
import { sessions } from '../sessions';

export const requestDeleteUser = async (userSession, userId) => {
	const accessRoles = [ROLES.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteUser(userId);

	return {
		error: null,
		res: true,
	};
};
