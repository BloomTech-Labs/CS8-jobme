import React, { Component } from 'react';

// Router
import { BrowserRouter as Router } from 'react-router-dom';

// Imports
// import { Login } from './components';
import Nav from './container/nav/Nav';
import Body from './container/body';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Body />
        </div>
      </Router>
    );
  }
}

export default App;
