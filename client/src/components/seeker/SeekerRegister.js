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
  Notification,
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
    summaryLengthOK: true,
  };

  handleChange({ target }) {
    const { name, value } = target;
    let { summaryLengthOK, password, confirmPassword } = this.state;
    let splitSkills;
    // splitting skills array by commas and ignoring whitespace at substring edges
    if (name === "topSkills") {
      splitSkills = value.split(/, */);
    }
    // live feedback for password match and summary length
    switch (name) {
      case 'password':
        password = value;
        break;
      case 'confirmPassword':
        confirmPassword = value;
        break;
      case 'summary':
        summaryLengthOK = value.length <= 256;
        break;
      default:
        break;
    }
    // check password length and match
    const passwordLengthOk = !password || password.length >= 8;
    const passwordMatch = password === confirmPassword;
    this.setState({
      summaryLengthOK,
      passwordLengthOk,
      passwordMatch,
      [name]: splitSkills || value,
    });
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
    } else if (!passwordMatch) {
    } else if (!desiredTitle || !summary || !topSkills
      || !firstName || !lastName || !experience || !education || !password || !email) {
    } else {
      this.props.registerUser(this.state, 'jobseeker');
    }
  }

  render() {
    return (
    <RegisterContainer>
      <Form onSubmit={this.submitHandler.bind(this)}>
        <InputContainer row signup separate>
          <InputBox 
            type="text" 
            name="firstName" 
            placeholder="Your first name" 
            onChange={this.handleChange.bind(this)} 
          />
          <InputBox 
            type="text" 
            name="lastName" 
            placeholder="Your last name" 
            onChange={this.handleChange.bind(this)} 
          />
        </InputContainer>
        <InputContainer row signup>
          <InputBox 
            type="email" 
            name="email" 
            placeholder="Your Email address" 
            onChange={this.handleChange.bind(this)} 
          />
          <InputBox 
            type="text" 
            name="desiredTitle" 
            placeholder="What is your desired title?" 
            onChange={this.handleChange.bind(this)} 
          />
        </InputContainer>
        <InputContainer>
          <InputTextarea large 
            type="text"
            name="summary" 
            placeholder="Summarize yourself" 
            onChange={this.handleChange.bind(this)} 
           />
          <RegisterMessage alert={!this.state.summaryLengthOK}>
            {this.state.summary.length}
          </RegisterMessage>
          <InputBox 
            type="text" 
            name="topSkills" 
            placeholder="Select your top skills, max five" onChange={this.handleChange.bind(this)} 
          />
          <InputTextarea large 
            type="text" 
            name="experience" 
            placeholder="List your experience (Job Title, YearStarted - YearEnded/Current)" 
            onChange={this.handleChange.bind(this)} 
          />       
          <InputBox 
            type="text" 
            name="education" 
            placeholder="Educational Experience (School, Year Graduated)" 
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
          <Button type="submit">Find a Job</Button>
        </ButtonsContainer>
      </Form>
      </RegisterContainer>);
  }
}

export default withRouter(connect(null, { registerUser })(SeekerRegister));
