import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerSeeker } from '../../actions';

import {
  RegisterContainer,
  RegisterMessage,
  InputContainer,
  InputBox,
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
    topSkills: '',
    password: '',
    passwordLengthOk: true,
    passwordMatch: true,
  };

  handleChange({ target }) {
    // take from state, but update if event is changing value
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
      this.props.registerSeeker(this.state);
    }
  }

  componentDidUpdate() {
    if (this.props.registerJobSeekerSuccess) {
      this.props.history.push('/profile');
    }
  }

  render() {
    return (
    <RegisterContainer>
      <form onSubmit={this.submitHandler.bind(this)}>
        <InputContainer>
          <InputBox type="text" name="firstName" placeholder="Your first name" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox type="text" name="lastName" placeholder="Your last name" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox type="text" name="desiredTitle" placeholder="What is your desired title?" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox large type="text" name="summary" placeholder="Summarize yourself" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox large type="text" name="topSkills" placeholder="Select your top skills" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox large type="text" name="experience" placeholder="List your experience (Job Title, YearStarted - YearEnded/Current)" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox large type="text" name="education" placeholder="Educational Experience (School, Year Graduated)" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox type="email" name="email" placeholder="Your Email address" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox type="password" name="password" placeholder="Password" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <RegisterMessage alert>
          {this.state.passwordLengthOk ? '' : 'Password is too short.'}
        </RegisterMessage>
        <InputContainer>
          <InputBox type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <RegisterMessage alert>
          {this.state.passwordMatch ? '' : 'Passwords do not match.'}
        </RegisterMessage>
        <ButtonsContainer>
          <Button type="submit">Create Account</Button>
        </ButtonsContainer>
      </form>
      </RegisterContainer>);
  }
}


const mapStateToProps = (state) => {
  const { registerJobSeekerSuccess } = state;
  return {
    registerJobSeekerSuccess,
  };
};

export default withRouter(connect(
  mapStateToProps, { registerSeeker },
)(SeekerRegister));
