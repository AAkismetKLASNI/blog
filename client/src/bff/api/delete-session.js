export const deleteSession = async (sessionId) =>
	fetch(`http://localhost:3600/sessions/${sessionId}`, { method: 'DELETE' });
