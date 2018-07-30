import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerEmployer } from '../../actions';

import {
  RegisterContainer,
  RegisterMessage,
  Link,
  InputContainer,
  InputTitle,
  InputBox,
  ButtonsContainer,
  Button,
} from '../styles';

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
    } else if (!companyName || !companyUrl || !industry
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
      };

      this.props.registerEmployer(employer);
    }
  }

  componentDidUpdate() {
    if (this.props.registerEmployerSuccess) {
      this.props.history.push('/profile'); // currently broken because router
    }
  }


  render() {
    return (
    <RegisterContainer>
      <form onSubmit={this.submitHandler.bind(this)}>
        <InputContainer>
          <InputBox type="text" name="companyName" placeholder="Company Name" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox type="text" name="companyUrl" placeholder="URL of your company" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox type="text" name="industry" placeholder="Choose an industry" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox large type="text" name="description" placeholder="Write a brief description of your company" onChange={this.handleChange.bind(this)} />
        </InputContainer>
        <InputContainer>
          <InputBox type="text" name="email" placeholder="Email for account access" onChange={this.handleChange.bind(this)} />
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
        {/* <RegisterMessage>
          Already have an account? <Link to="/login">
            <i>Sign In!</i>{' '}
          </Link>
        </RegisterMessage> */}
      </form>
    </RegisterContainer>);
  }
}

const mapStateToProps = (state) => {
  const { registerEmployerSuccess } = state;
  return { registerEmployerSuccess };
};

export default withRouter(connect(mapStateToProps, { registerEmployer })(RegisterEmployer));
