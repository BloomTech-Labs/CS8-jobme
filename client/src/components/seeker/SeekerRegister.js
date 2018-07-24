import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react';
import { registerJobSeeker } from '../../actions';

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
        // const passwordLengthOk = !password || password.length >= 8;
        // const passwordMatch = password === confirmPassword;

        // if (name === 'username' && value) {
        //     axios
        //       .get(`/employers/unique/${username}`)
        //       .then(response => {
        //         const { userIsUnique } = response.data;
        //         this.setState({
        //           passwordLengthOk,
        //           passwordMatch,
        //           userIsUnique,
        //           [name]: value,
        //       })
        //     }).catch(err => {
        //         this.setState({
        //           passwordLengthOk,
        //           passwordMatch,
        //           userIsUnique: true,
        //           [name]: value,
        //       });
        //     });
        //   } else {
        //     this.setState({
        //       passwordLengthOk,
        //       passwordMatch,
        //       [name]: value,
        //     });
        //   }
        // }
    
    }


    submitHandler(event) {
        event.preventDefault();
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
            userIsUnique,
        } = { ...this.state };
  
        if (!passwordLengthOk) {
            // password too short modal
        } else if (!passwordMatch) {
            // passwords don't match modal
        } else if (!userIsUnique) {
            // user is not unique modal
        } else if (!desiredTitle || ! summary || !topSkills
        || !firstName || !lastName || !password || !email) {
            // things are required
        }
        else {
          // good to go! load up user, send to register action,
          // and navigate to signin page
            const seeker = {
              firstName,
              lastName,
              desiredTitle,
              summary,
              topSkills,
              password,
              email,
            }
            this.props.registerJobSeeker(seeker)
        }
    }

    componentDidUpdate() {
        if(this.props.registerJobSeekerSuccess) {
            this.props.history('/signin')
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
                    <Input type='textarea' name='summary' placeholder="Write a brief summary of yourself" onChange={this.handleChange.bind(this)}/>
                    <Input type='textarea' name='topSkills' placeholder="Enter your top skills" onChange={this.handleChange.bind(this)}/>
                    <p>{this.state.userIsUnique ? '' : 'Username already taken!'}</p>
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
      registerEmployerSuccess,
    }
  }
  
  export default connect(
    mapStateToProps,
    { registerJobSeekerSuccess }
  )(SeekerRegister);