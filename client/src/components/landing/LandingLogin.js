import React, { Component } from 'react';

import { SeekerLogin, EmployerLogin } from "..";

import {
  LoginContainer,
  ChildContainer,
  LandingButton,
} from '../styles';

class LandingLogin extends Component {
  constructor() {
    super();

    this.state = {
      showSeekerLogin: true,
      showEmployerLogin: false,
    };

    this.showSeekerLogin = this.showSeekerLogin.bind(this);
    this.showEmployerLogin = this.showEmployerLogin.bind(this);
  }

  showSeekerLogin(event) {
    event.preventDefault();
    this.setState({ 
      showSeekerLogin: true, 
      showEmployerLogin: false 
    });
  }

  showEmployerLogin(event) {
    event.preventDefault();
    this.setState({ 
      showEmployerLogin: true, 
      showSeekerLogin: false 
    });
  }

  render() {
    return (
      <LoginContainer>
        <ChildContainer row>
          <LandingButton small
            onClick={this.showSeekerLogin}
            selected={!this.state.showSeekerLogin}
          >
            Job Seeker
          </LandingButton>
          <LandingButton small
            onClick={this.showEmployerLogin}
            selected={!this.state.showEmployerLogin}
          >
            Employer
          </LandingButton>
        </ChildContainer>
        <ChildContainer row center>
          { this.state.showSeekerLogin ? <SeekerLogin/> : null }
          { this.state.showEmployerLogin ? <EmployerLogin/> : null }
        </ChildContainer>
      </LoginContainer>
    );
  }
}

export default LandingLogin;
