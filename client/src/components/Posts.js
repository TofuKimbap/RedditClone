import React from 'react';

import Post from './Post';
import PostForm from './PostForm';
import { connect } from 'react-redux';

import './Posts.css';
import { getPosts } from '../actions/postActions';

class Posts extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props.posts;
    return (
      <div className="posts-container">
        {this.props.auth.isAuthenticated && <PostForm />}
        {posts.map(post => (
          <Post
            votes={post.upvotes.length - post.downvotes.length}
            handle={post.handle}
            title={post.title}
            text={post.text}
            comments={post.comments.length}
            id={post._id}
            key={post._id}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
