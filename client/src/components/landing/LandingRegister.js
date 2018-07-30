import React, { Component } from 'react';

import { SeekerRegister, EmployerRegister } from '..';

import {
  RegisterContainer,
  ChildContainer,
  ButtonsContainer,
  Button,
} from '../styles';

class LandingRegister extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
      showSeekerRegister: false,
      showEmployerRegister: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showSeekerRegister = this.showSeekerRegister.bind(this);
    this.showEmployerRegister = this.showEmployerRegister.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({
        showMenu: false,
        showSeekerRegister: false,
        showEmployerRegister: false,
      }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  showSeekerRegister(event) {
    event.preventDefault();
    this.setState({ showSeekerRegister: true, showEmployerRegister: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  showEmployerRegister(event) {
    event.preventDefault();
    this.setState({ showEmployerRegister: true, showSeekerRegister: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <RegisterContainer absolute opaque>
        <ChildContainer row center>
        </ChildContainer>
        <Button onClick={this.showMenu}>
          Register
        </Button>
        {this.state.showMenu
          ? (
            <div
              className='menu'
              ref={(element) => {
                this.dropdownMenu = element;
              }}
            >
              <ButtonsContainer>
                <Button small onClick={this.showSeekerRegister}>
                  Job Seeker
                </Button>
                <Button small onClick={this.showEmployerRegister}>
                  Employer
                </Button>
              </ButtonsContainer>
              <ChildContainer row center>
                {this.state.showSeekerRegister ? <SeekerRegister /> : null}
                {this.state.showEmployerRegister ? <EmployerRegister /> : null}
              </ChildContainer>
            </div>
          ) : (null)
        }
      </RegisterContainer>
    );
  }
}

export default LandingRegister;
