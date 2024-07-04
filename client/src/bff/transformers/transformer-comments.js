export const transformerComments = (comment) => ({
	authorId: comment.author_id,
	content: comment.content,
	id: comment.id,
	postId: comment.post_id,
	publishedAt: comment.published_at,
});
