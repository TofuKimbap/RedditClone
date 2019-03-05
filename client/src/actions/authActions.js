import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// Register User
export const registerUser = (user, history) => dispatch => {
  // If register was successful redirect user to login page.
  // Otherwise dispatch new action to set the error state.
  axios
    .post('/api/users/register', user)
    .then(() => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User
export const loginUser = user => dispatch => {
  // If login was successful:
  // - save JWT in local storage,
  // - set authorization header for following requests,
  // - set user in authentication state.
  // Otherwise dispatch new action to set error state.
  axios
    .post('/api/users/login', user)
    .then(res => {
      // Extract token from the response.
      const { token } = res.data;
      // Save JWT in local storage.
      localStorage.setItem('jwtToken', token);
      // Set token to authorization header.
      setAuthToken(token);
      // Decode token to get the user data.
      const decoded = jwt_decode(token);
      // Set current user.
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove authorization header from future requests.
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false.
  dispatch(setCurrentUser({}));
};
