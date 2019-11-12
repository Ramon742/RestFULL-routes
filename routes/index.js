var express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.get('/posts', async (req, res, next) => {
  let posts = await Post.find({});
  res.render('index', posts);
});

router.get('/posts/new', (req, res, next) => {
  res.render('new');
});

router.post('/posts', async (req, res, next) => {
  const post = new Post(req.body.post);
	post.save();
});

router.get('/posts/:id', async(req, res, next) => {
  let post = await Post.findById(req.params.id);
  res.render('show' , {post});
});

router.get('/posts/:id/edit', async(req, res, next) => {
  let post = await Post.findById(req.params.id);
  res.render('edit', {post});
});

router.put('/posts/:id', async(req, res, next) => {
  const { post } = res.locals;
  post.name = req.body.post.name;
	post.price = req.body.post.price;
  post.date = req.body.post.date;
  post.description = req.body.post.description;
  await post.save();
  res.redirect(`/posts/${post.id}`);
});

router.delete('/posts/:id', async(req, res, next) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/posts');
});

module.exports = router;