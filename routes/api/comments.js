/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const express = require('express');
const passport = require('passport');
const shortid = require('shortid');
const date = require('../../utils/date');

const router = express.Router();

// Load models
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

// Load comment validation
const validateCommentInput = require('../../validation/comment');

router.get('/test', (req, res) => {
  res.send({ mgs: 'Comments route works' });
});

// @route  POST api/comments/post/:post_id
// @desc   Add comment to a post
// @access Private
router.post('/post/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Post.findById(req.params.post_id)
    .then(post => {
      // Create new slug
      const slug = shortid.generate();

      // Create full slug
      const full_slug = `${date()}:${slug}`;

      // Create new comment
      const newComment = new Comment({
        post: post._id,
        slug,
        full_slug,
        author: req.user._id,
        handle: req.user.handle,
        text: req.body.text
      });

      newComment.save().then(freshComment => {
        post.comments.unshift({ comment: freshComment._id });
        post.save().then(updatedPost => res.json(updatedPost));
      });
    })
    .catch(() => res.status(404).json({ postnotfound: 'No post with this ID exists' }));
});

// @route  POST api/comments/comment/:comment_id
// @desc   Add comment to a comment
// @access Private
router.post(
  '/comment/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Comment.findById(req.params.comment_id)
      .then(comment => {
        // Create slug
        const temp = shortid.generate();
        const slug = `${comment.slug}/${temp}`;

        // Create full slug
        const full_slug = `${comment.full_slug}/${date()}:${temp}`;

        // Create new comment.
        const newComment = new Comment({
          post: comment.post,
          parent: comment._id,
          slug,
          full_slug,
          handle: req.user.handle,
          author: req.user._id,
          text: req.body.text
        });

        newComment.save().then(addedComment => {
          comment.comments.unshift({ comment: addedComment._id });
          comment.save().then(savedComment => res.json(savedComment));
        });
      })
      .catch(() => res.status(404).json({ commentnotfound: 'Comment with given ID not found.' }));
  }
);

// @route POST api/comments/comment/upvote/:comment_id
// @desc Upvote a comment.
// @acces Private
router.post(
  '/comment/upvote/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findById(req.params.comment_id)
      .then(comment => {
        const alreadyUpvoted =
          comment.upvotes.filter(upvote => upvote.user.toString() === req.user._id.toString())
            .length > 0;

        if (alreadyUpvoted) {
          comment.upvotes = comment.upvotes.filter(
            upvote => upvote.user.toString() !== req.user._id.toString()
          );

          return comment.save().then(updatedComment => res.json(updatedComment));
        }
        comment.upvotes.push({ user: req.user._id });

        comment.downvotes = comment.downvotes.filter(downvote => downvote.user !== req.user._id);

        comment.save().then(savedComment => res.json(savedComment));
      })
      .catch(() => res.status(404).json({ commentnotfound: 'Comment with given ID not found.' }));
  }
);

// @route POST api/comments/comment/downvote/:comment_id
// @desc Downvote a comment.
// @access Private
router.post(
  '/comment/downvote/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findById(req.params.comment_id)
      .then(comment => {
        const alreadyDownvoted =
          comment.downvotes.filter(downvote => downvote.user.toString() === req.user._id.toString())
            .length > 0;

        if (alreadyDownvoted) {
          comment.downvotes = comment.downvotes.filter(
            downvote => downvote.user.toString() !== req.user._id.toString()
          );

          return comment.save().then(savedComment => res.json(savedComment));
        }

        comment.downvotes.push({ user: req.user._id });

        comment.upvotes = comment.upvotes.filter(
          upvote => upvote.user.toString() !== req.user._id.toString()
        );

        comment.save().then(updatedComment => res.json(updatedComment));
      })
      .catch(() => res.status(404).json({ commentnotfound: 'Comment with given ID not found.' }));
  }
);

// @routes GET api/comments/post/:post_id
// @desc   Get all comments of a post by id.
// @access Public
router.get('/post/:post_id', (req, res) => {
  Comment.find({ post: req.params.post_id })
    .then(comments => res.json(comments))
    .catch(() =>
      res.status(404).json({ nocommentsfound: 'No comments with the given post ID found.' })
    );
});

// @routes GET api/comments/user/:user_id
// @desc   Get all comments of an user.
// @access Public
router.get('/user/:user_id', (req, res) => {
  Comment.find({ author: req.user._id })
    .then(comments => res.json(comments))
    .catch(() => res.status(404).json({ nocommentfound: 'No comment with given ID found.' }));
});

// @routes PUT api/comments/update/:comment_id
// @desc   Update a comment.
// @access Private
router.put('/update/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Comment.findById(req.params.comment_id)
    .then(comment => {
      // Check if logged in user is author of comment.
      if (comment.author.toString() === req.user._id.toString()) {
        const { errors, isValid } = validateCommentInput(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }

        comment.text = req.body.text;
        comment.updated_at = Date.now();

        return comment.save().then(updatedComment => res.json(updatedComment));
      }
      res.status(400).json({ notauthorized: 'Not authorized' });
    })
    .catch(() => res.status(404).json({ nocommentfound: 'No Comment with given ID found.' }));
});

// @routes DELETE api/comments/delete/:comment_id
// @desc   Delete a comment.
// @access Private
router.delete(
  '/delete/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findById(req.params.comment_id)
      .then(comment => {
        // Check if logged in user is author of comment.
        if (req.user._id.toString() === comment.author.toString()) {
          comment.text = '[deleted]';

          return comment.save().then(() => res.json({ msg: 'Success' }));
        }
        res.status(400).json({ notauthorized: 'Not authorized' });
      })
      .catch(() => res.status(404).json({ nocommentfound: 'No comment with given ID found.' }));
  }
);

module.exports = router;
