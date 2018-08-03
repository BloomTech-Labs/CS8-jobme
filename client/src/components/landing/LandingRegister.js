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
      showSeekerRegister: false,
      showEmployerRegister: false,
    };

    this.showSeekerRegister = this.showSeekerRegister.bind(this);
    this.showEmployerRegister = this.showEmployerRegister.bind(this);
  }

  showSeekerRegister(event) {
    event.preventDefault();
    this.setState({ 
      showSeekerRegister: true, 
      showEmployerRegister: false,
    });
  }

  showEmployerRegister(event) {
    event.preventDefault();
    this.setState({ 
      showEmployerRegister: true,
      showSeekerRegister: false,
    });
  }

  render() {
    return (
      <RegisterContainer>
        <ButtonsContainer>
          <Button onClick={this.showSeekerRegister}>
            Job Seeker
          </Button>
          <Button onClick={this.showEmployerRegister}>
            Employer
          </Button>
        </ButtonsContainer>
        <ChildContainer row center>
          {this.state.showSeekerRegister ? <SeekerRegister /> : null}
          {this.state.showEmployerRegister ? <EmployerRegister /> : null}
        </ChildContainer>
      </RegisterContainer>
    );
  }
}

export default LandingRegister;
