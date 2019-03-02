const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  handle: {
    type: String,
    required: true
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

const Post = model('post', PostSchema);

module.exports = Post;
