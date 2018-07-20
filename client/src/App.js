import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './container/nav/Nav';
import Body from './container/body';

import './App.css';

class App extends Component {
  render() {
    return <div className="App">
        <Router>
          <Fragment>
            {this.props.loggedInEmployer.token ? <Nav /> : <Fragment />}
          <Route path="/" component={Body} />
        </Fragment>
        </Router>
      </div>;
  }
}

const mapStateToProps = state => ({
  loggedInEmployer: state.loggedInEmployer
})

export default connect(mapStateToProps)(App);
