import React from 'react';
import { connect } from 'react-redux';

import { addPost } from '../actions/postActions';

import './PostForm.css';

class PostForm extends React.Component {
  state = {
    title: '',
    text: ''
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const newPost = {
      title: this.state.title,
      text: this.state.text,
      handle: this.props.auth.user.handle,
      user: this.props.auth.user.id
    };

    this.props.addPost(newPost);

    this.setState({
      title: '',
      text: ''
    });
  };

  render() {
    return (
      <div className="postForm-container">
        <form onSubmit={this.onSubmit} className="postForm">
          <label htmlFor="title" className="postForm-label">
            Title:
          </label>
          <input
            type="text"
            name="title"
            className="postForm-textInput"
            id="title"
            autoComplete="off"
            onChange={this.onChange}
            value={this.state.title}
          />
          <label htmlFor="text" className="postForm-label">
            Text:
          </label>
          <textarea
            name="text"
            className="postForm-textarea"
            id="text"
            onChange={this.onChange}
            value={this.state.text}
          />
          <button type="submit" className="btn postForm-btn">
            post
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
