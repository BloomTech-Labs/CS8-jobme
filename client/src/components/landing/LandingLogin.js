import React, { Component } from 'react';

import { SeekerLogin, EmployerLogin } from "..";

import {
  LoginContainer,
  ChildContainer,
  ButtonsContainer,
  Button,
} from '../styles';

class LandingLogin extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
      showSeekerLogin: false,
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
        <ButtonsContainer>
          <Button onClick={this.showSeekerLogin}>
            Job Seeker
          </Button>
          <Button onClick={this.showEmployerLogin}>
            Employer
          </Button>
        </ButtonsContainer>
        <ChildContainer row center>
          { this.state.showSeekerLogin ? <SeekerLogin/> : null }
          { this.state.showEmployerLogin ? <EmployerLogin/> : null }
        </ChildContainer>
      </LoginContainer>
    );
  }
}

export default LandingLogin;
