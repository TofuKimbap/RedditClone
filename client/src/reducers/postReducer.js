import {
  GET_POSTS,
  POST_LOADING,
  ADD_POST,
  UPDATE_POST,
  GET_POST,
  INSERT_COMMENT,
  CLEAR_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post))
      };
    case INSERT_COMMENT:
      return {
        ...state,
        post: action.payload
      };
    case CLEAR_POST:
      return {
        ...state,
        post: {}
      };
    default:
      return state;
  }
}
