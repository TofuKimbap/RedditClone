import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comment from './Comment';

import './Comments.css';

class Comments extends Component {
  render() {
    return (
      <div className="comments">
        {this.props.commentsIDs &&
          this.props.commentsIDs.map(com => {
            const commentFound = this.props.comments.comments.find(
              comment => comment._id === com.comment
            );

            return (
              <Comment
                handle={commentFound.handle}
                upvotes={commentFound.upvotes.length - commentFound.downvotes.length}
                text={commentFound.text}
                comment={commentFound.comments}
                id={commentFound._id}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments
});

export default connect(mapStateToProps)(Comments);
