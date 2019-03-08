import axios from 'axios';

import {
  GET_COMMENTS,
  GET_ERRORS,
  INSERT_COMMENT,
  ADD_COMMENT,
  CLEAR_COMMENTS,
  UPDATE_COMMENT
} from './types';

// Get all comments of a post
export const getCommentsOfPost = postId => dispatch => {
  axios
    .get(`/api/comments/post/${postId}`)
    .then(res =>
      dispatch({
        type: GET_COMMENTS,
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

export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS
  };
};

export const addCommentToPost = (postId, newComment) => dispatch => {
  axios
    .post(`/api/comments/post/${postId}`, newComment)
    .then(res =>
      dispatch({
        type: INSERT_COMMENT,
        payload: res.data
      })
    )
    .then(() => {
      axios.get(`/api/comments/post/${postId}`).then(res =>
        dispatch({
          type: GET_COMMENTS,
          payload: res.data
        })
      );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const upvoteComment = commentId => dispatch => {
  axios.post(`/api/comments/comment/upvote/${commentId}`).then(res =>
    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data
    })
  );
};
