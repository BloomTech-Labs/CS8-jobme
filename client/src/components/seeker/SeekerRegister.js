import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerSeeker } from '../../actions';
import { withRouter } from 'react-router-dom';

import {
  StyledRegister,
  Banner,
  Message,
  Link,
  Entry,
  ChildTitle,
  ChildBox,
  SaveButton,
} from '../styles/registerStyles.js';

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
    //take from state, but update if event is changing value
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
    //check password length and match
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
    }

    else {
      // good to go! load up user, send to register action,
      // and navigate to signin page
      this.props.registerSeeker(this.state)
    }
  }

  componentDidUpdate() {
    if (this.props.registerJobSeekerSuccess) {
      this.props.history.push('/profile')
    }
  }

  render() {
    return <StyledRegister>
        <Link to="/">Home</Link>
        <Banner>Welcome to JobMe! Let's get started.</Banner>
        <Message>
          Not a Job Seeker? Looking to
          <Link to={{ pathname: '/signup', state: { seekerRegister: false } }}>
            <i> hire?</i>
          </Link>
        </Message>
        <form onSubmit={this.submitHandler.bind(this)}>
          <Entry>
            <ChildTitle>First Name:</ChildTitle>
            <ChildBox type="text" name="firstName" placeholder="Your first name" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Last Name:</ChildTitle>
            <ChildBox type="text" name="lastName" placeholder="Your last name" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Desired Title:</ChildTitle>
            <ChildBox type="text" name="desiredTitle" placeholder="What job do you want" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Summary:</ChildTitle>
            <ChildBox large type="text" name="summary" placeholder="Summarize yourself" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Top Skills:</ChildTitle>
            <ChildBox large type="text" name="topSkills" placeholder="Select your top skills" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Experience:</ChildTitle>
            <ChildBox large type="text" name="experience" placeholder="List your experience (Job Title, YearStarted - YearEnded/Current)" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Education:</ChildTitle>
            <ChildBox large type="text" name="education" placeholder="Educational Experience (School, Year Graduated)" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Email:</ChildTitle>
            <ChildBox type="email" name="email" placeholder="Your Email address" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Password:</ChildTitle>
            <ChildBox type="password" name="password" placeholder="Must be at least 8 characters" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Message alert>
            {this.state.passwordLengthOk ? '' : 'Password is too short.'}
          </Message>
          <Entry>
            <ChildTitle>Confirm:</ChildTitle>
            <ChildBox type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Message alert>
            {this.state.passwordMatch ? '' : 'Passwords do not match.'}
          </Message>
          <SaveButton type="submit">Create Account</SaveButton>
          <Message>
            Already have an account? <Link to="/login">
              <i>Sign In!</i>{' '}
            </Link>
          </Message>
        </form>
      </StyledRegister>;
  }
}


const mapStateToProps = state => {
  const { registerJobSeekerSuccess } = state;
  return {
    registerJobSeekerSuccess,
  }
}

export default withRouter(connect(
  mapStateToProps, { registerSeeker })(SeekerRegister)
);