import React from 'react';
import { EmployerLogin, SeekerLogin } from '../components';

const Login = () => {
  return <div>
      <h1>Employer Login: </h1>
      <EmployerLogin />
      <h1>Seeker Login: </h1>
      <SeekerLogin />
    </div>;
};

export default Login;
