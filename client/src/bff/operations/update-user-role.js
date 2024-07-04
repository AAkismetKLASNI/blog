import { setUserRole } from '../api';
import { sessions } from '../sessions';
import { ROLES } from '../constants';

export const updateUserRole = async (userSession, id, selectedRole) => {
	const accessRoles = [ROLES.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await setUserRole(id, selectedRole);

	return {
		error: null,
		res: true,
	};
};
