import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './container/nav/Nav';
import Body from './container/body';

import './App.css';

class App extends Component {
  // eventually we want a listner/action that checks
  // if the token is in localStorage on componentMount
  // from there it would auto login if the token was valid
  // you could probably just check if you can succesfully
  // access a protected route
  render() {
    return <Router>
        <Fragment>
          <div className="App">
            {!this.props.loggedInEmployer.token || <Nav />}
            <Route path="/" component={Body} />
          </div>
        </Fragment>
      </Router>;
  }
}

const mapStateToProps = state => ({
  loggedInEmployer: state.loggedInEmployer,
});

export default connect(mapStateToProps)(App);
