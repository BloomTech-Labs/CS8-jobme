import React from 'react';
import { Route } from 'react-router';

import LandingPage from './Landingpage';
import Login from './Login';
import Register from './Register';
import Browse from './Browse';
import Matches from './Matches';
import Profile from './Profile';
import Billing from './Billing';

const Body = () => {
  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route path="/signup" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/browse" component={Browse} />
      <Route path="/matches" component={Matches} />
      <Route path="/profile" component={Profile} />
      <Route path="/billing" component={Billing} />
    </div>
  );
};

export default Body;
