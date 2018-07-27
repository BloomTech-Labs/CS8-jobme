import React, { Component } from 'react';
import { SeekerRegister, EmployerRegister } from '../components';

class Register extends Component {
  render() {
    const { seekerRegister } = this.props.location.state
    console.log(seekerRegister)
    return (
      <div> 
      {seekerRegister ? <SeekerRegister /> : <EmployerRegister /> }
      </div>
    );
  }
}

export default Register;