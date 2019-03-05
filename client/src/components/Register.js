import React from 'react';
import { connect } from 'react-redux';

import TextFieldGroup from './TextFieldGroup';
import { registerUser } from '../actions/authActions';

import './Register.css';

class Register extends React.Component {
  state = {
    handle: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      handle: this.state.handle,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <form className="registerForm" onSubmit={this.onSubmit}>
          <label htmlFor="handle" className="labelStyle">
            Handle
          </label>
          <input
            type="text"
            name="handle"
            alt="handle"
            id="handle"
            className="inputStyle"
            value={this.state.handle}
            onChange={this.onChange}
            style={{ borderColor: errors.handle ? 'red' : '' }}
          />
          {errors.handle && <span className="error">{errors.handle}</span>}
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
          <label htmlFor="password2" className="labelStyle">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            alt="password2"
            id="password2"
            className="inputStyle"
            value={this.state.password2}
            onChange={this.onChange}
            style={{ borderColor: errors.password2 ? 'red' : '' }}
          />
          {errors.password2 && <span className="error">{errors.password2}</span>}
          <button type="submit" className="btn">
            Register
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
  { registerUser }
)(Register);
