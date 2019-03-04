import React from 'react';

import Post from './Post';

import './Posts.css';

class Posts extends React.Component {
  render() {
    return (
      <div className="posts-container">
        <Post />
      </div>
    );
  }
}

export default Posts;
