import { sessions } from '../sessions';
import { getUser, addUser } from '../api';

export const register = async (regLogin, regPassword) => {
	const existUser = await getUser(regLogin);

	if (existUser) {
		return {
			error: 'Пользователь с таким логином уже существует',
			res: null,
		};
	}

	const user = await addUser(regLogin, regPassword);

	const { id, login, password, roleId } = user;

	return {
		error: null,
		res: {
			id,
			login,
			password,
			roleId,
			session: sessions.create(user),
		},
	};
};
