import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import {loginEmployer} from '../actions'; // TODO: update when file structure changes


class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.loginEmployer(this.state);
  }

  render() {
    return (
      <div>
        <h3>Enter dis stuff</h3>
        <form onSubmit={this.submitHandler}>
          <input
            onChange={this.inputHandler}
            placeholder='Enter username'
            name='username'
            value={this.state.username}
          />
          <input
            onChange={this.inputHandler}
            placeholder='Enter password'
            name='password'
            value={this.state.password}
          />
          <button onSubmit={this.submitHandler}>PressMe</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({ ...state });
};

export default connect(mapStateToProps, { loginEmployer })(Login);