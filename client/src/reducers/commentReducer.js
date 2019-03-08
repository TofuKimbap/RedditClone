import { GET_COMMENTS, ADD_COMMENT, CLEAR_COMMENTS, UPDATE_COMMENT } from '../actions/types';

const initialState = {
  comments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: []
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment._id === action.payload._id ? action.payload : comment
        )
      };
    default:
      return state;
  }
}
