import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { registerEmployer } from '../../actions'; // TODO: update when file structure changes
import { withRouter } from 'react-router-dom';

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
        username,
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
      }
      else {
        // good to go! load up user, send to register action,
        // and navigate to signin page
          const employer = {
            companyName,
            companyUrl: `https://${companyUrl}`,
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
      this.props.history.push('/employer/profile') // currently broken because router
    }
  }


  render() {
    return (
      <div>
        <a href="/">Home</a>
        <h3>Welcome to Jobme! Let's get started.</h3>
        <div>Not a employer? Looking for <a href="/jobseeker/signup"><i>job?</i></a></div>
        <Form onSubmit={this.submitHandler.bind(this)}>
          <Input type='text' name='companyName' placeholder="Company Name" onChange={this.handleChange.bind(this)}/>
          <Input type='text' name='companyUrl' placeholder="Company URL" onChange={this.handleChange.bind(this)}/>
          <Input type='text' name='industry' placeholder="Industry" onChange={this.handleChange.bind(this)}/>
          <Input type='textarea' name='description' placeholder="Write a brief description of your company" onChange={this.handleChange.bind(this)}/>
          <p>{this.state.userIsUnique ? '' : 'Username already taken!'}</p>
          <Input type='text' name='email' placeholder="Email" onChange={this.handleChange.bind(this)}/>
          <Input type='password' name='password' placeholder="Password" onChange={this.handleChange.bind(this)}/>
          <p>{this.state.passwordLengthOk ? '' : 'Password is too short.'}</p>
          <Input type='password' name='confirmPassword' placeholder="Confirm Password" onChange={this.handleChange.bind(this)}/>
          <p>{this.state.passwordMatch ? '' : 'Passwords do not match.'}</p>
          <Button type="submit">PressMe</Button>
          <div>Already have an account? <a href="/login"><i>Sign In!</i> </a></div>
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

export default withRouter(connect(
  mapStateToProps,
  { registerEmployer }
)(RegisterEmployer));
