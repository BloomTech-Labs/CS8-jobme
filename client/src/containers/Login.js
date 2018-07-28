import React from 'react';
import { Link } from 'react-router-dom';

import { EmployerLogin, SeekerLogin } from '../components';

const Login = () => {
  return <div>
      <Link to="/">Home</Link>
      <h1>Employer Login: </h1>
      <EmployerLogin />
      <h1>Seeker Login: </h1>
      <SeekerLogin />
    </div>;
};

export default Login;
