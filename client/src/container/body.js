import React from 'react';

// Router
import { Route } from 'react-router';

// Route Imports
import LandingPage from './landingpage';
import Login from './login';
import Browse from './browse';
import Matches from './matches';
import Profile from './profile';
import Billing from './billing';

const Body = () => {
  return (
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/browse" component={Browse} />
      <Route path="/matches" component={Matches} />
      <Route path="/profile" component={Profile} />
      <Route path="/billing" component={Billing} />
    </div>
  );
};

export default Body;
