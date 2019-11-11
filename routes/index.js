var express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/posts', function(req, res, next) {
  let posts = await Post.find({});
  res.render('index');
});

router.post('/posts', function(req, res, next) {
  const {title, body} = req.body;
  await Post.create({title, body});
});

router.get('/posts/:id', function(req, res, next) {
  let post = Post.findById(req.params.id);
  res.render('show' , {post});
});

router.get('/posts/:id/edit', function(req, res, next) {
  let post = Post.findById(req.params.id);
  res.render('edit', {post});
});

router.put('/posts/:id', function(req, res, next) {
  let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
  res.redirect(`/posts/${post.id}`);
});

router.delete('/posts/:id', function(req, res, next) {
  await Post.findByIdAndRemove(req.params.id);
});

module.exports = router;