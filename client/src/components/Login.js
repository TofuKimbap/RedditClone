import React from 'react';

import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <form className="registerForm" onSubmit={this.onSubmit}>
          <label htmlFor="email" className="labelStyle">
            Email
          </label>
          <input
            type="text"
            name="email"
            alt="email"
            id="email"
            className="inputStyle"
            value={this.state.email}
            onChange={this.onChange}
            style={{ borderColor: errors.email ? 'red' : '' }}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <label htmlFor="password" className="labelStyle">
            Password
          </label>
          <input
            type="password"
            name="password"
            alt="password"
            id="password"
            className="inputStyle"
            value={this.state.password}
            onChange={this.onChange}
            style={{ borderColor: errors.password ? 'red' : '' }}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
