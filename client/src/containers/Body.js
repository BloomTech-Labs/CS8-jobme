import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

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


const Body = props => {
  const check = props => {
    const seekerToken = localStorage.getItem('seekerToken');
    const employerToken = localStorage.getItem('employerToken');
    if (employerToken) {
      return Browse;
    } else if (seekerToken) {
      return Browse;
    } else {
      return LandingPage;
    }
  }
  return (
    <div>
      <Route exact path="/" component={check(props)} />
      <Route path="/employer/signup" component={EmployerRegister} />
      <Route path="/jobseeker/signup" component={JobSeekerRegister} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/browse" component={Browse} />
      <Route path="/matches" component={Matches} />
      <Route path="/billing" component={Billing} />
    </div>
  );
};

const mapStateToProps = state => {
  const { loggedInEmployer, loggedInSeeker } = state;
  return {
    loggedInEmployer,
    loggedInSeeker,
  }
}

export default connect(mapStateToProps)(Body);
