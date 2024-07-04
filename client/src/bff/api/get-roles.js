export const getRoles = () =>
	fetch('http://localhost:3600/roles')
		.then((loadedRoles) => loadedRoles.json())
		.catch(() => console.log('роли не получены!'));
