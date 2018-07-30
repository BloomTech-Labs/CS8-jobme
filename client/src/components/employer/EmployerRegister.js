import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerEmployer } from '../../actions';
import { withRouter, Link as RouterLink } from 'react-router-dom';

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

class RegisterEmployer extends Component {
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
    //take from state, but update if event is changing value
    let { password, confirmPassword } = this.state;
    const { name, value } = target;
    switch(name) {
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
      // TODO: password too short modal
    } else if (!passwordMatch) {
      // TODO: passwords don't match modal
    } else if (!companyName || ! companyUrl || !industry
      || !description || !password || !email) {
      // things are required
    } else {
      // good to go! load up user, send to register action,
      // and navigate to signin page
    const employer = {
      companyName,
      companyUrl: `https://${companyUrl}`,
      industry,
      description,
      password,
      email,
    }

    this.props.registerEmployer(employer);
    }
  }

  componentDidUpdate() {
    if (this.props.registerEmployerSuccess) {
      this.props.history.push('/profile') // currently broken because router
    }
  }


  render() {
    return <StyledRegister>
        <Link to="/">Home</Link>
        <Banner>Welcome to JobMe! Let's get started.</Banner>
        <Message>
          Not a employer? Looking for
          <RouterLink to={{ pathname: '/signup', state: { seekerRegister: true } }}>
            <i> a job?</i>
          </RouterLink>
        </Message>
        <form onSubmit={this.submitHandler.bind(this)}>
          <Entry>
            <ChildTitle>Company Name:</ChildTitle>
            <ChildBox type="text" name="companyName" placeholder="Company Name" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Company URL:</ChildTitle>
            <ChildBox type="text" name="companyUrl" placeholder="URL of your company" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Industry:</ChildTitle>
            <ChildBox type="text" name="industry" placeholder="Choose an industry" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Description:</ChildTitle>
            <ChildBox large type="text" name="description" placeholder="Write a brief description of your company" onChange={this.handleChange.bind(this)} />
          </Entry>
          <Entry>
            <ChildTitle>Email:</ChildTitle>
            <ChildBox type="text" name="email" placeholder="Email for account access" onChange={this.handleChange.bind(this)} />
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
  const { registerEmployerSuccess } = state;
  return {
    registerEmployerSuccess,
  }
}

export default withRouter(connect(
  mapStateToProps, { registerEmployer })(RegisterEmployer)
);
