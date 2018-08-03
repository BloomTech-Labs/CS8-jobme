import React, { Component } from 'react';
import { LandingLogin, LandingRegister } from '..';

import {
  RegisterAndLoginContainer,
  ButtonsContainer,
  LandingButton,
} from '../styles';

class LoginOrRegister extends Component {
  state = {
    register: false,
    login: true 
  }

  switch = (word) => {
    let register;
    let login;

    if (word === "register") { 
      register = true; 
      login = false; 
    } else { 
      login = true; 
      register = false;
    }
    this.setState({ 
      login: login, 
      register: register 
    });
  }

  render() {
    const self = this;

    return (
      <RegisterAndLoginContainer>
        <ButtonsContainer id="buttons">
          <LandingButton id="registerButton" 
             onClick={self.switch.bind(null, "register")} 
             className={self.state.register ? "yellow" : "blue"}>
             Register
          </LandingButton>
          <LandingButton id="loginButton" 
             onClick={self.switch.bind(null, "login")} 
             className={self.state.login ? "yellow" : "blue"}>
             Login
          </LandingButton>
        </ButtonsContainer>
        {self.state.register ? <LandingRegister /> : null}
        {self.state.login ? <LandingLogin /> : null}
      </RegisterAndLoginContainer>
    );
  }
}

export default LoginOrRegister;