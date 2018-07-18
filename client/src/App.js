import React, { Component } from 'react';
import { Login } from './components';
import Nav from './container/nav/Nav';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Login />
      </div>
    );
  }
}

export default App;
