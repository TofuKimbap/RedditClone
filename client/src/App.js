import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import PostForm from './components/PostForm';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <PostForm />
            <Posts />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
