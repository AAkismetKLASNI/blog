import { generateDate } from '../utils';

export const addComment = (content, postId, authorId) =>
	fetch('http://localhost:3600/comments', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			content,
			post_id: postId,
			author_id: authorId,
			published_at: generateDate(),
		}),
	}).then((creatingComment) => creatingComment.json());
