const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = { addComment, deleteComment };

async function addComment(postId, data) {
  const comment = await Comment.create(data);

  await Post.findByIdAndUpdate(postId, { $push: { comments: comment } });

  await comment.populate('author');

  return comment;
}

async function deleteComment(postId, commentId) {
  await Comment.deleteOne({ _id: commentId });

  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}
