const Post = require('../models/Post');

module.exports = {
  addPost,
  deletePost,
  editPost,
  getPosts,
  getPost,
};

async function addPost(data) {
  const post = await Post.create(data);

  return post.populate({ path: 'comments', populate: 'author' });
}

async function deletePost(id) {
  await Post.deleteOne({ _id: id });
}

async function editPost(id, dataPost) {
  const newPost = await Post.findByIdAndUpdate(id, dataPost, {
    returnDocument: 'after',
  });

  return newPost.populate({ path: 'comments', populate: 'author' });
}

async function getPosts(search = '', limit = 10, page = 1) {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip((page - 1) * 10)
      .sort({
        atCreated: -1,
      }),
    Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
}

async function getPost(id) {
  return Post.findById(id).populate({ path: 'comments', populate: 'author' });
}
