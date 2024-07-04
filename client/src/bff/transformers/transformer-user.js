export const transformerUser = (loadedUser) => ({
	id: loadedUser.id,
	login: loadedUser.login,
	password: loadedUser.password,
	roleId: loadedUser.role_id,
	registeredAt: loadedUser.resistered_at,
});
