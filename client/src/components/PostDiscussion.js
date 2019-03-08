import React from 'react';
import { connect } from 'react-redux';

import Post from './Post';
import Comments from './Comments';
import Spinner from './Spinner';
import { getPost, clearPost } from '../actions/postActions';
import {
  getCommentsOfPost,
  addCommentToPost,
  addComment,
  clearComments
} from '../actions/commentActions';

import './PostDiscussion.css';

class PostDiscussion extends React.Component {
  state = {
    text: ''
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getPost(this.props.match.params.post_id);
    this.props.clearComments();
    this.props.getCommentsOfPost(this.props.match.params.post_id);
  }

  componentWillUnmount() {
    this.props.clearComments();
    this.props.clearPost();
  }

  onSubmit = event => {
    event.preventDefault();

    const newComment = {
      text: this.state.text
    };
    this.props.clearComments();
    this.props.addCommentToPost(this.props.posts.post._id, newComment);
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { post } = this.props.posts.posts;
    let postContent;

    if (
      this.props.posts.post === null ||
      this.props.posts.post.upvotes === undefined ||
      this.props.posts.post.downvotes === undefined
    ) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div className="postDiscussion">
          <div className="post-container" onClick={this.onPostDiscussion}>
            <div className="post-votes-container">
              <div className="post-votes">
                <i className="fas fa-arrow-up post-arrow-up" onClick={this.onUpvote} />
                <span className="voteCount">
                  {this.props.posts.post.upvotes.length - this.props.posts.post.downvotes.length}
                </span>
                <i className="fas fa-arrow-down post-arrow-down" onClick={this.onDownvote} />
              </div>
            </div>
            <div className="post-main">
              <span className="post-author">
                Posted by u/{this.props.posts.post.handle} 7 hours ago
              </span>
              <span className="post-title">{this.props.posts.post.title}</span>
              <div className="post-text">{this.props.posts.post.text}</div>
              <div className="post-detail">
                <span className="post-comment-counter">
                  <i className="fas fa-comment-alt" />{' '}
                  {this.props.posts.post.comments.length === 0
                    ? 'Comment'
                    : `${this.props.posts.post.comments.length} Comments`}
                </span>
              </div>
            </div>
          </div>

          {this.props.auth.isAuthenticated && (
            <form className="comment-form" onSubmit={this.onSubmit}>
              <textarea
                name="text"
                className="postForm-textarea"
                value={this.state.text}
                onChange={this.onChange}
              />
              <button type="submit" className="btn">
                Comment
              </button>
            </form>
          )}

          {this.props.comments.comments.length === 0 ? (
            <h1>No Comments Yet</h1>
          ) : (
            <div className="comments-container">
              <Comments commentsIDs={this.props.posts.post.comments} />
            </div>
          )}
        </div>
      );
    }
    return <div>{postContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  comments: state.comments
});

export default connect(
  mapStateToProps,
  { getPost, getCommentsOfPost, addCommentToPost, clearComments, clearPost }
)(PostDiscussion);
