import React, { Component } from 'react';

import standby from '../images/loading.gif';

import { Loading } from '../components/styles';

class Progress extends Component {
  render() {
    return (
      <Loading>
          <img src={standby} alt='goodbye cruel world'/>
      </Loading>
    );
  }
}

export default Progress;
