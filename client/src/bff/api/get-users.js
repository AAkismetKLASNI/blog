import { transformerUser } from '../transformers';

export const getUsers = () =>
	fetch('http://localhost:3600/users')
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(transformerUser))
		.catch(() => console.log('пользователи не получены!'));
