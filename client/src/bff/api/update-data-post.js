import { transformerPost } from '../transformers';

export const updateDataPost = ({ id, title, content, imageUrl }) =>
	fetch(`http://localhost:3600/posts/${id}`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json:charset=utf-8' },
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			content,
		}),
	})
		.then((res) => res.json())
		.then((updatedPost) => updatedPost && transformerPost(updatedPost));
