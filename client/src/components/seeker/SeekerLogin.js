import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../actions'; 

import { 
  LoginContainer, 
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
    this.props.loginUser(this.state, 'jobseeker');
  };

  render() {
    return (
      <LoginContainer>
        <form onSubmit={this.submitHandler}>
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
            value={this.state.password}
          />
        </InputContainer>
        <ButtonsContainer>
          <Button onSubmit={this.submitHandler}>Login</Button>
        </ButtonsContainer>
        </form>
      </LoginContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return ({ ...state });
};

export default withRouter(connect(mapStateToProps, { loginUser })(EmployerLogin));