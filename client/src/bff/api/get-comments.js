import { transformerComments } from '../transformers';

const POST_COMMENTS_URL = 'http://localhost:3600/comments?post_id=';
const ALL_COMMENTS_URL = 'http://localhost:3600/comments';

export const getComments = async (postId) => {
	const url = postId ? POST_COMMENTS_URL + postId : ALL_COMMENTS_URL;

	return fetch(url)
		.then((res) => res.json())
		.then(
			(loadedComments) =>
				loadedComments && loadedComments.map(transformerComments),
		)
		.then((loadedComments) => loadedComments.reverse());
};
