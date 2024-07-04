import { transformerUser } from '../transformers';

export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3600/users?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([user]) => user && transformerUser(user))
		.catch(() => console.log('пользователь не найден'));
