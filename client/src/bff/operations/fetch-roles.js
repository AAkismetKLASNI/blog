import { sessions } from '../sessions';
import { getRoles } from '../api';
import { ROLES } from '../constants';

export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLES.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
