import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginEmployer } from '../../actions'; 

import { ChildContainer, Button, Box } from '../styles/loginStyles';

class EmployerLogin extends Component {
  state = {
    email: '',
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
        <form onSubmit={this.submitHandler}>
        <ChildContainer column>
          <Box
            onChange={this.inputHandler}
            placeholder='Enter email'
            name='email'
            value={this.state.email}
          />
          <Box
            onChange={this.inputHandler}
            placeholder='Enter password'
            name='password'
            value={this.state.password}
          />
        </ChildContainer>
        <ChildContainer>
          <Button onSubmit={this.submitHandler}>Log in</Button>
        </ChildContainer>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({ ...state });
};

export default withRouter(connect(mapStateToProps, { loginEmployer })(EmployerLogin));