import React, { Component, Fragment } from 'react';

// Router
import { BrowserRouter as Router } from 'react-router-dom';

// Imports
// import { Login } from './components';
import Nav from './container/nav/Nav';
import Body from './container/body';

import './App.css';
import LandingPage from './container/landingpage';

class App extends Component {
  state = {
    isLoggedOn: false
    // TODO: make isLoggedOn switch
  }

  render() {
    return (
      <div className="App">
        <Fragment>
          {this.state.isLoggedOn ? (
            <Router>
              <div>
                <Nav />
                <Body />
              </div>
            </Router>
          ) : (<LandingPage />)}
        </Fragment>
      </div>
    );
  }
}

export default App;
