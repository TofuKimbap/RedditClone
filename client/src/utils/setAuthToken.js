import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Set authorization header for every request.
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Remove the authorization header.
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
