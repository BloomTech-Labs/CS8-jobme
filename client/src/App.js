import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Nav from './containers/nav/Nav';
import Body from './containers/Body';
import { getEmployerProfile, getSeekerProfile } from './actions';

class App extends Component {
  // eventually we want a listner/action that checks
  // if the token is in localStorage on componentMount
  // from there it would auto login if the token was valid
  // you could probably just check if you can succesfully
  // access a protected route

  render() {
    return <div>
      {localStorage.getItem('employerToken') || localStorage.getItem('seekerToken') ? <Nav /> : <Fragment />}
        <Route path="/" component={Body} />
      </div>;
  }
}

const mapStateToProps = state => ({
  loggedInEmployer: state.loggedInEmployer,
});

export default connect(mapStateToProps, { getEmployerProfile, getSeekerProfile })(App);
