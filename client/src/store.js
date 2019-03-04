// Allows action creator to return function.
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Function that returns the next state tree, given the current state tree and an action to handle.
import rootReducer from './reducers';

const initialState = {};

const middlewares = [thunk];

// Creates Redux store that holds the complete state tree of the app.
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
