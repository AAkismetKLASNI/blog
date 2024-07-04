import { transformerPost } from '../transformers';
import { generateDate } from '../utils';

export const addPost = ({ title, content, imageUrl }) =>
	fetch('http://localhost:3600/posts', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title,
			image_url: imageUrl,
			content,
			published_at: generateDate(),
		}),
	})
		.then((res) => res.json())
		.then((createdPost) => createdPost && transformerPost(createdPost));
