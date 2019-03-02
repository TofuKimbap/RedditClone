const express = require('express');
const passport = require('passport');

const router = express.Router();

// Load post model.
const Post = require('../../models/Post');

// Load input validation.
const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => res.json({ msg: 'This is the posts route' }));

// @route  GET api/posts
// @desc   Get all posts.
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ created_at: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route  GET api/posts/:post_id
// @desc   Get post by id.
// @access Public
router.get('/:post_id', (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(() => res.status(404).json({ nopostfound: 'No post found with that ID' }));
});

// @route  GET api/posts/user/:user_id
// @desc   Get all posts from an user.
// @access Public
router.get('/user/:user_id', (req, res) => {
  Post.find({ user: req.params.user_id })
    .sort({ created_at: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ nopostsfound: 'No posts found from that user' }));
});

// @route  POST api/posts
// @desc   Create new post.
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Check for valid input.
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { title, text } = req.body;
  const { id, handle } = req.user;

  // Create new post.
  const newPost = new Post({
    title,
    text,
    handle,
    user: id
  });

  // Save post to database.
  newPost.save().then(post => res.json(post));
});

// @route  POST api/posts/upvote/:post_id
// @desc   Upvote the post by id.
// @access Private
router.post('/upvote/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      // Check if user already upvoted the post.
      const alreadyUpvoted =
        post.upvotes.filter(upvote => upvote.user.toString() === req.user._id.toString()).length >
        0;

      // User already upvoted the post.
      if (alreadyUpvoted) {
        // Remove upvote from the post.
        post.upvotes = post.upvotes.filter(
          upvote => upvote.user.toString() !== req.user._id.toString()
        );

        // Save change to the database.
        return post.save().then(updatedPost => res.json(updatedPost));
      }

      // Post is not upvoted by user.
      // Add new upvote to the post.
      post.upvotes.push({ user: req.user._id });

      // Remove the downvote from the user.
      post.downvotes = post.downvotes.filter(
        downvote => downvote.user.toString() !== req.user._id.toString()
      );

      // Save to the database.
      post.save().then(updatedPost => res.json(updatedPost));
    })
    .catch(() => res.json({ postnotfound: 'No post with this ID exists' }));
});

// @route  POST api/posts/downvote/:post_id
// @desc   Downvote the post by id.
// @access Private
router.post('/downvote/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      // Check if post is already downvoted by user.
      const alreadyDownvoted =
        post.downvotes.filter(downvote => downvote.user.toString() === req.user._id.toString())
          .length > 0;

      // Post is already downvoted by user.
      if (alreadyDownvoted) {
        // Remove downvote.
        post.downvotes = post.downvotes.filter(
          downvote => downvote.user.toString() !== req.user._id.toString()
        );

        // Save change to the database.
        return post.save().then(updatedPost => res.json(updatedPost));
      }

      // Post is not downvoted by user.
      // Add downvote to the post.
      post.downvotes.push({ user: req.user._id });

      // Remove upvote from user.
      post.upvotes = post.upvotes.filter(
        upvote => upvote.user.toString() !== req.user._id.toString()
      );

      // Save change to the database.
      post.save().then(updatedPost => res.json(updatedPost));
    })
    .catch(() => {
      return res.json({ postnotfound: 'No post with this ID exists' });
    });
});

// @route  PUT api/posts/update/:post_id
// @desc   Update the post.
// @access Private
router.put('/update/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      // Check if logged in user is author of the post.
      if (req.user._id.toString() !== post.user.toString()) {
        return res.status(400).json({ notauthorized: 'Not authorized' });
      }
      const { errors, isValid } = validatePostInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { title, text } = req.body;

      post.title = title;
      post.text = text;
      post.updated_at = Date.now();

      post.save().then(savedPost => res.json(savedPost));
    })
    .catch(() => res.status(404).json({ nopostfound: 'No post with given ID found.' }));
});

// @route  DELETE api/posts/delete/:post_id
// @desc   Delete a post by id.
// @access Private
router.delete('/delete/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      // Check if logged in user is author of the post.
      if (req.user._id.toString() === post.user.toString()) {
        return post.remove().then(removedPost => res.json(removedPost));
      }
      res.status(400).json({ notauthorized: 'User not authorized' });
    })
    .catch(() => res.status(404).json({ postnotfound: 'Post with given ID not found.' }));
});

module.exports = router;
