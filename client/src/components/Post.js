import React from 'react';

import './Post.css';

class Post extends React.Component {
  render() {
    return (
      <div className="post-container">
        <div className="post-votes-container">
          <div className="post-votes">
            <i className="fas fa-arrow-up" />
            <span className="voteCount">30k</span>
            <i className="fas fa-arrow-down" />
          </div>
        </div>
        <div className="post-main">
          <span className="post-author">Posted by u/Lustrelustre 7 hours ago</span>
          <span className="post-title">hi</span>
          <div className="post-detail">
            <span className="post-comment-counter">
              <i class="fas fa-comment-alt" /> 891 Comments
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
