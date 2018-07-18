import React, { Component } from 'react';
import { Login } from './components';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          <Login />
        </p>
      </div>
    );
  }
}

export default App;
