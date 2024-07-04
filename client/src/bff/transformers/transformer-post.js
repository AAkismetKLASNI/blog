export const transformerPost = (post) => ({
	id: post.id,
	title: post.title,
	imageUrl: post.image_url,
	content: post.content,
	publishedAt: post.published_at,
});
