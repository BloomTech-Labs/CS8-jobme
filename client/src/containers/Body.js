import React from 'react';
import { Route } from 'react-router';

import LandingPage from './Landingpage';
import Login from './Login';
// import Register from './Register';
import Browse from './Browse';
import Matches from './Matches';
// import Profile from './Profile';
import Billing from './Billing';

//Register
import EmployerProfile from './EmployerProfile';
import JobSeekerProfile from './JobSeekerProfile';

import EmployerRegister from './EmployerRegister';
<<<<<<< HEAD
import JobSeekerRegister from './JobSeekerRegister';
=======
>>>>>>> 7b6e9a8006882cc3ee481c528dcf98e7f30db01d




const Body = () => {
  return (
    <div>
      <Route exact path="/" component={LandingPage} />

      <Route path="/employer/signup" component={EmployerRegister} />
      <Route path="/jobseeker/signup" component={JobSeekerRegister} />
      <Route path="/employer/profile" component={EmployerProfile} />
      <Route path="/jobseeker/profile" component={JobSeekerProfile} />

      <Route path="/login" component={Login} />
      <Route path="/browse" component={Browse} />
      <Route path="/matches" component={Matches} />
      <Route path="/billing" component={Billing} />
    </div>
  );
};

export default Body;
