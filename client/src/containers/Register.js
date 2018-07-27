import React, { Component } from 'react';
import { SeekerRegister, EmployerRegister } from '../components';

class Register extends Component {
  render() {
    return (
      <div>
        <SeekerRegister /> : <EmployerRegister />
      </div>
    );
  }
}

export default Register;