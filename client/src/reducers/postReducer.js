import { GET_POSTS, POST_LOADING, ADD_POST, UPDATE_POST } from '../actions/types';

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
    default:
      return state;
  }
}
