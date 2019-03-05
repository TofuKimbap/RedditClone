import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';

import './Navbar.css';
import logo from '../images/reddit-logo.png';
import { logoutUser } from '../actions/authActions';

class Navbar extends React.Component {
  onRegister = () => {
    this.props.history.push('/register');
  };

  onLogin = () => {
    this.props.history.push('/login');
  };

  onLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/');
  };

  render() {
    const authLinks = (
      <div className="navbar-items">
        <button className="btn btn-fill-blue" onClick={this.onLogout}>
          Log Out
        </button>
        <i className="fas fa-user navbar-user" />
      </div>
    );
    const guestLinks = (
      <div className="navbar-items">
        <button className="btn btn-outline-blue" onClick={this.onLogin}>
          Log In
        </button>
        <button className="btn btn-fill-blue" onClick={this.onRegister}>
          Sign Up
        </button>
        <i className="fas fa-user navbar-user" />
      </div>
    );
    return (
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
          {this.props.auth.isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
