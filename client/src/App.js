import React from 'react';
import jwt_decode from 'jwt-decode';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import PostForm from './components/PostForm';
import Register from './components/Register';
import Login from './components/Login';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (currentTime > decoded.exp) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Posts} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={PostForm} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
