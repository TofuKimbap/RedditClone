import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comments from './Comments';
import { upvoteComment } from '../actions/commentActions';

import './Comment.css';

class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <div className="comment-votes">
          <i className="fas fa-arrow-up" onClick={() => this.props.upvoteComment(this.props.id)} />
          <i className="fas fa-arrow-down" />
        </div>
        <div className="comment-main">
          <div className="comment-header">
            <span>{this.props.handle}</span>
            <span className="comment-vote-points">{`${this.props.upvotes} points`}</span>
            <span>·</span>
            <span className="comment-post-time">4 hours ago</span>
          </div>
          <span>{this.props.text}</span>
          <span className="comment-reply">
            <i className="fas fa-comment-alt comment-reply-icon" /> Reply
          </span>
          {this.props.comment.length > 0 && <Comments commentsIDs={this.props.comment} />}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { upvoteComment }
)(Comment);
