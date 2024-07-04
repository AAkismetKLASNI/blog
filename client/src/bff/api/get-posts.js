import { transformerPost } from '../transformers';

export const getPosts = (page, limit) =>
	fetch(`http://localhost:3600/posts?_page=${page}&_per_page=${limit}`)
		.then((loadedPosts) => loadedPosts.json())
		.then((loadedData) => {
			const { data, last } = loadedData;

			return { posts: data && data.map(transformerPost), last };
		});
