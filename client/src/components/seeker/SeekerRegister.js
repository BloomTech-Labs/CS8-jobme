import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container, Row, Col, Form, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { registerSeeker } from '../../actions';

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
        let { password, confirmPassword, email } = this.state;
        const { name, value } = target;
        switch(name) {
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
            this.setState({
              passwordLengthOk,
              passwordMatch,
              [name]: value,
            });
          }


    submitHandler(event) {
        event.preventDefault();
        console.log('in here')
        const {
            firstName,
            lastName,
            desiredTitle,
            summary,
            topSkills,
            password,
            email,
            passwordLengthOk,
            passwordMatch,
        } = { ...this.state };
  
        if (!passwordLengthOk) {
            // password too short modal
        } else if (!passwordMatch) {
            // passwords don't match modal
        } else if (!desiredTitle || ! summary || !topSkills
        || !firstName || !lastName || !password || !email) {
            // things are required
        }
        else {
          // good to go! load up user, send to register action,
          // and navigate to signin page
            this.props.registerSeeker(this.state)
        }
    }

    componentDidUpdate() {
        if(this.props.registerJobSeekerSuccess) {
            this.props.history('/jobseeker/profile')
        }
    }

    render() {
        return (
            <div>
                <h3>Apply for jobs</h3>
            
                <Form onSubmit={this.submitHandler.bind(this)}>
                    <Input type='text' name='firstName' placeholder="First Name" onChange={this.handleChange.bind(this)}/>
                    <Input type='text' name='lastName' placeholder="Last Name" onChange={this.handleChange.bind(this)}/>
                    <Input type='text' name='email' placeholder="Email" onChange={this.handleChange.bind(this)}/>
                    <Input type='text' name='desiredTitle' placeholder="Desired Title" onChange={this.handleChange.bind(this)} />
                    <Input type='textarea' name='summary' placeholder="Write a brief summary of yourself" onChange={this.handleChange.bind(this)}/>
                    <Input type='textarea' name='topSkills' placeholder="Enter your top skills" onChange={this.handleChange.bind(this)}/>
                    <Input type='password' name='password' placeholder="Password" onChange={this.handleChange.bind(this)}/>
                    <p>{this.state.passwordLengthOk ? '' : 'Password is too short.'}</p>
                    <Input type='password' name='confirmPassword' placeholder="Confirm Password" onChange={this.handleChange.bind(this)}/>
                    <p>{this.state.passwordMatch ? '' : 'Passwords do not match.'}</p>
                    <Button type="submit">PressMe</Button>
                </Form>
            
            </div>
        )
    }


  

}


const mapStateToProps = state => {
    const { registerJobSeekerSuccess } = state;
    return {
        registerJobSeekerSuccess,
    }
  }
  
  export default connect(
    mapStateToProps,
    { registerSeeker }
  )(SeekerRegister);