export const getSession = async (hash) =>
	fetch(`http://localhost:3600/sessions?hash=${hash}`)
		.then((loadedSession) => loadedSession.json())
		.then(([loadedSession]) => loadedSession);
