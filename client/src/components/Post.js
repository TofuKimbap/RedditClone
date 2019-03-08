import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Post.css';

import { upvotePost, downvotePost } from '../actions/postActions';

class Post extends React.Component {
  onUpvote = () => {
    this.props.upvotePost(this.props.id);
  };

  onDownvote = () => {
    this.props.downvotePost(this.props.id);
  };

  onPostDiscussion = event => {
    if (event.target.tagName.toLowerCase() === 'i') {
      return;
    }
    this.props.history.push(`/post/${this.props.id}`);
  };

  render() {
    return (
      <div className="post-container" onClick={this.onPostDiscussion}>
        <div className="post-votes-container">
          <div className="post-votes">
            <i className="fas fa-arrow-up post-arrow-up" onClick={this.onUpvote} />
            <span className="voteCount">{this.props.votes}</span>
            <i className="fas fa-arrow-down post-arrow-down" onClick={this.onDownvote} />
          </div>
        </div>
        <div className="post-main">
          <span className="post-author">Posted by u/{this.props.handle} 7 hours ago</span>
          <span className="post-title">{this.props.title}</span>
          <div className="post-text">{this.props.text}</div>
          <div className="post-detail">
            <span className="post-comment-counter">
              <i className="fas fa-comment-alt" />{' '}
              {this.props.comments === 0 ? 'Comment' : `${this.props.comments} Comments`}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { upvotePost, downvotePost }
)(withRouter(Post));
