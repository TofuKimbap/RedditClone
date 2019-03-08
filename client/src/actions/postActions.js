import axios from 'axios';

import {
  POST_LOADING,
  GET_POSTS,
  GET_ERRORS,
  ADD_POST,
  UPDATE_POST,
  GET_POST,
  CLEAR_POST
} from './types';

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Get all posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get one specific post
export const getPost = post_id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${post_id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Add a post
export const addPost = postData => dispatch => {
  // TODO: clear errors

  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Upvote a post
export const upvotePost = postId => dispatch => {
  axios
    .post(`/api/posts/upvote/${postId}`)
    .then(res =>
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Downvote a post
export const downvotePost = postId => dispatch => {
  axios
    .post(`/api/posts/downvote/${postId}`)
    .then(res =>
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearPost = () => {
  return {
    type: CLEAR_POST
  };
};
