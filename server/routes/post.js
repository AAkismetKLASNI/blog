const express = require('express');
const {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
} = require('../controllers/post');
const { addComment, deleteComment } = require('../controllers/comment');
const mapPost = require('../helpers/mapPost');
const mapComment = require('../helpers/mapComment');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get('/:id', async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ data: mapPost(post) });
});

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const post = await addPost({
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
  });

  res.send({ data: mapPost(post) });
});

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deletePost(req.params.id);

    res.send({ error: null });
  }
);

router.patch(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const newPost = await editPost(req.params.id, {
      title: req.body.title,
      image: req.body.image,
      content: req.body.content,
    });

    res.send({ data: mapPost(newPost) });
  }
);

router.post(
  '/:id/comments',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER]),
  async (req, res) => {
    try {
      const comment = await addComment(req.params.id, {
        author: res.user.id,
        content: req.body.content,
      });

      res.send({ data: mapComment(comment) });
    } catch (error) {
      res.send(error.message);
    }
  }
);

router.delete(
  '/:postId/comments/:commentId',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);
    res.send({ error: null });
  }
);

module.exports = router;
