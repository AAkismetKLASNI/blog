export const deleteComment = (commentId) =>
	fetch(`http://localhost:3600/comments/${commentId}`, { method: 'DELETE' });
