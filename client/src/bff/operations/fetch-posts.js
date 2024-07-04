import { getComments, getPosts } from '../api';

export const fetchPosts = async (page, limit, searchBarPhrase) => {
	const [{ posts, last }, comments] = await Promise.all([
		getPosts(page, limit),
		getComments(),
	]);

	const filtredPosts = posts.filter(({ title }) =>
		title.toLowerCase().includes(searchBarPhrase),
	);

	const postWithCountComments = filtredPosts.map((post) => {
		return {
			...post,
			countComments: comments.filter(({ postId }) => postId === post.id).length,
		};
	});

	return {
		error: null,
		res: { posts: postWithCountComments, last },
	};
};
