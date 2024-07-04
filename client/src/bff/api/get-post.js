import { transformerPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:3600/posts/${postId}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}

			const error =
				res.status === 404 ? 'Пост не найден' : 'что-то пошло не так';

			return Promise.reject(error);
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformerPost(loadedPost));
