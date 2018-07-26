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
import UploadJobs from './UploadJobs';
import { SeekerRegister, EmployerRegister } from '../components';


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
  return <div>
      <Route exact path="/" component={check(props)} />
      <Route path="/employersignup" component={EmployerRegister} />
      <Route path="/jobseekersignup" component={SeekerRegister} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/browse" component={Browse} />
      <Route path="/matches" component={Matches} />
      <Route path="/billing" component={Billing} />
      <Route path="/uploadjob" component={UploadJobs} />
    </div>;
};

const mapStateToProps = state => {
  const { loggedInEmployer, loggedInSeeker } = state;
  return {
    loggedInEmployer,
    loggedInSeeker,
  }
}

export default connect(mapStateToProps)(Body);
