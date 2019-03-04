import React from 'react';

import './PostForm.css';

class PostForm extends React.Component {
  render() {
    return (
      <div className="postForm-container">
        <form onSubmit={this.onFormSubmit} className="postForm">
          <label htmlFor="title" className="postForm-label">
            Title:
          </label>
          <input
            type="text"
            name="title"
            className="postForm-textInput"
            id="title"
            autoComplete="off"
          />
          <label htmlFor="text" className="postForm-label">
            Text:
          </label>
          <textarea name="text" className="postForm-textarea" id="text" />
          <button type="submit" className="btn postForm-btn">
            post
          </button>
        </form>
      </div>
    );
  }
}

export default PostForm;
