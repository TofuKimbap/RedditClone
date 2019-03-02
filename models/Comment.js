const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'comment'
  },
  slug: {
    type: String,
    required: true
  },
  full_slug: {
    type: String,
    required: true
  },
  posted: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true
  },
  upvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  downvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  comments: [
    {
      comment: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
});

const Comment = model('comment', CommentSchema);

module.exports = Comment;
