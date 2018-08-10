import React, { Component } from 'react';

import { LandingLogin, LandingRegister } from '..';

import {
  RegisterAndLoginContainer,
  LandingButton,
  ChildContainer,
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
        <ChildContainer row>
          <LandingButton
            onClick={self.switch.bind(null, "login")} 
            selected={!self.state.login}>
            Login
          </LandingButton>
          <LandingButton 
            onClick={self.switch.bind(null, "register")} 
            selected={self.state.login}>
            Register
          </LandingButton>
        </ChildContainer>
        {self.state.register ? <LandingRegister /> : null}
        {self.state.login ? <LandingLogin /> : null}
      </RegisterAndLoginContainer>
    );
  }
}

export default LoginOrRegister;