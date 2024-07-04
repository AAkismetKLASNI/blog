import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'Пользователя с таким логином не существует',
			res: null,
		};
	}

	const { id, login, password, roleId } = user;

	if (password !== authPassword) {
		return {
			error: 'Пользователя с таким паролем не существует',
			res: null,
		};
	}

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
