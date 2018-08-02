import React, { Component } from 'react';
import standby from '../images/standby.jpg';

class Progress extends Component {
  render() {
    return (
        <div>
            <img src={standby} alt='goodbye cruel world'/>
        </div>
    );
  }
}

export default Progress;
