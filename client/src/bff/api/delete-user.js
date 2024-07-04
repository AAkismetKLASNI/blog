export const deleteUser = (userId) =>
	fetch(`http://localhost:3600/users/${userId}`, {
		method: 'DELETE',
	});
