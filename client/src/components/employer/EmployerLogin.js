import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../actions'; 

import {
  LoginContainer,
  Form,
  InputContainer,
  InputBox,
  ButtonsContainer,
  Button,
} from '../styles';

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
    this.props.loginUser(this.state, 'employer');
  };

  render() {
    return (
      <LoginContainer>
        <Form onSubmit={this.submitHandler}>
          <InputContainer row separate>
            <InputBox
              onChange={this.inputHandler}
              placeholder='Enter email'
              name='email'
              value={this.state.email}
            />
            <InputBox
              onChange={this.inputHandler}
              placeholder='Enter password'
              name='password'
              type='password'
              value={this.state.password}
            />
          </InputContainer>
          <ButtonsContainer>
            <Button onSubmit={this.submitHandler}>Scout</Button>
          </ButtonsContainer>
        </Form>
      </LoginContainer>
    );
  }
}

export default withRouter(connect(null, { loginUser })(EmployerLogin));