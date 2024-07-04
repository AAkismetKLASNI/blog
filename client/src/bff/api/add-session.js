export const addSession = async (hash, user) =>
	fetch('http://localhost:3600/sessions', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			hash,
			user,
		}),
	}).then((creatingSession) => creatingSession.json());
