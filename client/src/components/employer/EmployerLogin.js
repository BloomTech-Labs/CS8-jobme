import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginEmployer } from '../../actions'; // TODO: update when file structure changes


class EmployerLogin extends Component {
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
    this.props.loginEmployer(this.state)
  };

  render() {
    if (this.props.loggedInEmployer.token) {
      this.props.history.push('/profile');
    }
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

export default withRouter(connect(mapStateToProps, { loginEmployer })(EmployerLogin));