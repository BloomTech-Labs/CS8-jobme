import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container, Row, Col, Form, Input, Button } from 'reactstrap';
import { Component } from 'react';
import { connect } from 'react-redux';
import { registerEmployer } from '../../actions'; // TODO: update when file structure changes

class RegisterEmployer extends Component {
  state = {
    companyName: '',
    companyUrl: '',
    industry: '',
    description: '',
    username: '',
    password: '',
    email: '',
    passwordLengthOk: true,
    passwordMatch: true,
    userIsUnique: true,
  };

  handleChange({ target }) {
    //take from state, but update if event is changing value
    let { password, confirmPassword, username } = this.state;
    const { name, value } = target;
    switch(name) {
        case 'username':
          username = value;
          break;
        case 'password':
          password = value;
          break;
        case 'confirmPassword':
          confirmPassword = value;
        default:
          break;
    }
    //check password length and match
    const passwordLengthOk = !password || password.length >= 8;
    const passwordMatch = password === confirmPassword;
    //call 'unique' api endpoint with current username attempt
    //set state with Form data and new values for validators
    //default to true if server request is failing for unique
    if (name === 'username' && value) {
      axios
        .get(`/employers/unique/${username}`)
        .then(response => {
          const { userIsUnique } = response.data;
          this.setState({
            passwordLengthOk,
            passwordMatch,
            userIsUnique,
            [name]: value,
        })
      }).catch(err => {
          this.setState({
            passwordLengthOk,
            passwordMatch,
            userIsUnique: true,
            [name]: value,
        });
      });
    } else {
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
        companyName,
        companyUrl,
        industry,
        description,
        username,
        password,
        email,
        passwordLengthOk,
        passwordMatch,
        userIsUnique,
      } = { ...this.state };

      if (!passwordLengthOk) {
          // password too short modal
      } else if (!passwordMatch) {
          // passwords don't match modal
      } else if (!userIsUnique) {
          // user is not unique modal
      } else if (!companyName || ! companyUrl || !industry
      || !description || !username || !password || !email) {
          // things are required
      }
      else {
        // good to go! load up user, send to register action,
        // and navigate to signin page
          const employer = {
            companyName,
            companyUrl,
            industry,
            description,
            username,
            password,
            email,
          }
          this.props.registerEmployer(employer)
      }
  }

  componentDidUpdate() {
    if (this.props.registerEmployerSuccess) {
      this.props.history.push('/signin') // currently broken because router
    }
  }


  render() {
    return (
      <div>
        <h3>Welcome to Jobme! Let's get started.</h3>
        <Form onSubmit={this.submitHandler.bind(this)}>
          <Input type='text' name='companyName' placeholder="Company Name" onChange={this.handleChange.bind(this)}/>
          <Input type='text' name='companyUrl' placeholder="Company URL" onChange={this.handleChange.bind(this)}/>
          <Input type='text' name='industry' placeholder="Industry" onChange={this.handleChange.bind(this)}/>
          <Input type='textarea' name='description' placeholder="Write a brief description of your company" onChange={this.handleChange.bind(this)}/>
          <Input type='text' name='username' placeholder="Username" onChange={this.handleChange.bind(this)}/>
          <p>{this.state.userIsUnique ? '' : 'Username already taken!'}</p>
          <Input type='text' name='email' placeholder="Email" onChange={this.handleChange.bind(this)}/>
          <Input type='password' name='password' placeholder="Password" onChange={this.handleChange.bind(this)}/>
          <p>{this.state.passwordLengthOk ? '' : 'Password is too short.'}</p>
          <Input type='password' name='confirmPassword' placeholder="Confirm Password" onChange={this.handleChange.bind(this)}/>
          <p>{this.state.passwordMatch ? '' : 'Passwords do not match.'}</p>
          <Button type="submit">PressMe</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { registerEmployerSuccess } = state;
  return {
    registerEmployerSuccess,
  }
}

export default connect(
  mapStateToProps,
  { registerEmployer }
)(RegisterEmployer);
