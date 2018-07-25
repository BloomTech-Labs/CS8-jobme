import React from 'react';
import { Route } from 'react-router';

import LandingPage from './Landingpage';
import Login from './Login';
// import Register from './Register';
import Browse from './Browse';
import Matches from './Matches';
// import Profile from './Profile';
import Billing from './Billing';
import Profile from './Profile';

//Register
import EmployerProfile from './EmployerProfile';
import JobSeekerProfile from './JobSeekerProfile';

import EmployerRegister from './EmployerRegister';
import JobSeekerRegister from './JobSeekerRegister';




const Body = () => {
  return (
    <div>
      <Route exact path="/" component={LandingPage} />

      <Route path="/employer/signup" component={EmployerRegister} />
      <Route path="/jobseeker/signup" component={JobSeekerRegister} />

      <Route path="/employer/profile" component={EmployerProfile} />
      <Route path="/jobseeker/profile" component={JobSeekerProfile} />

      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/browse" component={Browse} />
      <Route path="/matches" component={Matches} />
      <Route path="/billing" component={Billing} />
    </div>
  );
};

export default Body;
