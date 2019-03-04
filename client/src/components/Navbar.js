import React from 'react';

import { Link } from 'react-router-dom';

import './Navbar.css';
import logo from '../images/reddit-logo.png';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
          <div className="navbar-items">
            <button className="btn btn-outline-blue">Log In</button>
            <button className="btn btn-fill-blue">Sign Up</button>
            <i className="fas fa-user navbar-user" />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
