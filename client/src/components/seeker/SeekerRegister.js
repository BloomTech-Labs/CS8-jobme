import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions';

import {
  RegisterContainer,
  RegisterMessage,
  InputContainer,
  InputBox,
  InputTextarea,
  ButtonsContainer,
  Button,
} from '../styles';

class SeekerRegister extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    desiredTitle: '',
    summary: '',
    topSkills: [],
    password: '',
    passwordLengthOk: true,
    passwordMatch: true,
  };

  handleChange({ target }) {
    const { name, value } = target;
    if (name === "topSkills") {
      const topSkills = value.split(/, */);
      this.setState({ topSkills });
    } else {
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
      // check password length and match
      const passwordLengthOk = !password || password.length >= 8;
      const passwordMatch = password === confirmPassword;
      this.setState({
        passwordLengthOk,
        passwordMatch,
        [name]: value,
      });
    }
  }


  submitHandler(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      desiredTitle,
      summary,
      topSkills,
      experience,
      education,
      password,
      email,
      passwordLengthOk,
      passwordMatch,
    } = { ...this.state };

    if (!passwordLengthOk) {
      // password too short modal
    } else if (!passwordMatch) {
      // passwords don't match modal
    } else if (!desiredTitle || !summary || !topSkills
      || !firstName || !lastName || !experience || !education || !password || !email) {
      // things are required
    } else {
      // good to go! load up user, send to register action,
      // and navigate to signin page
      this.props.registerUser(this.state, 'jobseeker');
    }
  }

  render() {
    return (
    <RegisterContainer>
      <form onSubmit={this.submitHandler.bind(this)}>
        <InputContainer row signup separate>
          <InputBox type="text" name="firstName" placeholder="Your first name" onChange={this.handleChange.bind(this)} />
          <InputBox type="text" name="lastName" placeholder="Your last name" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer row signup>
          <InputBox type="email" name="email" placeholder="Your Email address" onChange={this.handleChange.bind(this)} />
          <InputBox type="text" name="desiredTitle" placeholder="What is your desired title?" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputTextarea large type="text" name="summary" placeholder="Summarize yourself" onChange={this.handleChange.bind(this)} />
          <InputBox type="text" name="topSkills" placeholder="Select your top skills, max five" onChange={this.handleChange.bind(this)} />
          <InputTextarea large type="text" name="experience" placeholder="List your experience (Job Title, YearStarted - YearEnded/Current)" onChange={this.handleChange.bind(this)} />       
          <InputBox type="text" name="education" placeholder="Educational Experience (School, Year Graduated)" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer row signup>
          <InputBox type="password" name="password" placeholder="Password" onChange={this.handleChange.bind(this)} />
          <InputBox type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <RegisterMessage alert>
          {this.state.passwordLengthOk ? '' : 'Password is too short.'}
        </RegisterMessage>
        <RegisterMessage alert>
          {this.state.passwordMatch ? '' : 'Passwords do not match.'}
        </RegisterMessage>
        <ButtonsContainer>
          <Button type="submit">Find a Job</Button>
        </ButtonsContainer>
      </form>
      </RegisterContainer>);
  }
}

export default withRouter(connect(
  null, { registerUser },
)(SeekerRegister));
