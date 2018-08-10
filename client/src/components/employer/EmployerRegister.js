import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../actions';

import {
  RegisterContainer,
  Form,
  InputContainer,
  InputBox,
  InputTextarea,
  ButtonsContainer,
  Notification,
  Button,
} from '../styles';

class EmployerRegister extends Component {
  state = {
    companyName: '',
    companyUrl: '',
    industry: '',
    description: '',
    password: '',
    email: '',
    passwordLengthOk: true,
    passwordMatch: true,
    userIsUnique: true,
  };

  handleChange({ target }) {
    let { password, confirmPassword } = this.state;
    const { name, value } = target;
    switch (name) {
      case 'password':
        password = value;
        break;
      case 'confirmPassword':
        confirmPassword = value;
        break;
      default:
        break;
    }

    const passwordLengthOk = !password || password.length >= 8;
    const passwordMatch = password === confirmPassword;
    this.setState({
      passwordLengthOk,
      passwordMatch,
      [name]: value,
    });
  }

  submitHandler(event) {
    event.preventDefault();
    const {
      companyName,
      companyUrl,
      industry,
      description,
      password,
      email,
      passwordLengthOk,
      passwordMatch,
    } = { ...this.state };

    if (!passwordLengthOk) {
    } else if (!passwordMatch) {
    } else if (!companyName || !companyUrl || !industry
      || !description || !password || !email) {
    } else {
      const employer = {
        companyName,
        companyUrl: `https://${companyUrl}`,
        industry,
        description,
        password,
        email,
      };

      this.props.registerUser(employer, 'employer');
    }
  }

  render() {
    return (
    <RegisterContainer>
      <Form onSubmit={this.submitHandler.bind(this)}>
        <InputContainer row signup separate>
          <InputBox 
            type="text" 
            name="companyName" 
            placeholder="Your company name" 
            onChange={this.handleChange.bind(this)} 
          />
          <InputBox 
            type="text" 
            name="companyUrl" 
            placeholder="URL of your company" 
            onChange={this.handleChange.bind(this)} 
          />
        </InputContainer>
        <InputContainer row signup>
          <InputBox 
            type="text" 
            name="email" 
            placeholder="Email for account access" 
            onChange={this.handleChange.bind(this)} 
          />
          <InputBox 
            type="text" 
            name="industry"
            placeholder="Choose an industry" 
            onChange={this.handleChange.bind(this)} 
          />
        </InputContainer>
        <InputContainer signup>
          <InputTextarea 
            large type="text" 
            name="description" 
            placeholder="Write a description of your company" 
            onChange={this.handleChange.bind(this)} 
          />
        </InputContainer>
        <InputContainer row signup>
          <InputBox 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={this.handleChange.bind(this)} 
          />
          <InputBox 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            onChange={this.handleChange.bind(this)} 
          />
        </InputContainer>
        <Notification alert>
          {this.state.passwordLengthOk ? '' : 'Password is too short.'}
        </Notification>
        <Notification alert>
          {this.state.passwordMatch ? '' : 'Passwords do not match.'}
        </Notification>
        <ButtonsContainer>
          <Button type="submit">Find People</Button>
        </ButtonsContainer>
      </Form>
    </RegisterContainer>);
  }
}

const mapStateToProps = (state) => {
  const { registerUserSuccess } = state;
  return { registerUserSuccess };
};

export default withRouter(connect(mapStateToProps, { registerUser })(EmployerRegister));
