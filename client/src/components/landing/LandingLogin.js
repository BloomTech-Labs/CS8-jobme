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

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showSeekerLogin = this.showSeekerLogin.bind(this);
    this.showEmployerLogin = this.showEmployerLogin.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
      // Remember these!? ^  :D
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({
        showMenu: false,
        showSeekerLogin: false,
        showEmployerLogin: false,
      }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  showSeekerLogin(event) {
    event.preventDefault();
    this.setState({ showSeekerLogin: true, showEmployerLogin: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  showEmployerLogin(event) {
    event.preventDefault();
    this.setState({ showEmployerLogin: true, showSeekerLogin: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <LoginContainer>
        <ChildContainer row center>
        </ChildContainer>
        <Button landing tall onClick={this.showMenu}>
          Login
        </Button>
        { this.state.showMenu
          ? (
            <div
              className='menu'
              ref={(element) => {
                this.dropdownMenu = element;
              }}
            >
              <ButtonsContainer>
                <Button small onClick={this.showSeekerLogin}>
                  Job Seeker
                </Button>
                <Button small onClick={this.showEmployerLogin}>
                  Employer
                </Button>
              </ButtonsContainer>
              <ChildContainer row center>
                { this.state.showSeekerLogin ? <SeekerLogin/> : null }
                { this.state.showEmployerLogin ? <EmployerLogin/> : null }
              </ChildContainer>
            </div>
          ) : (null)
        }
      </LoginContainer>
    );
  }
}

export default LandingLogin;
