import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PostedJobs } from '../components';

import { getEmployerProfile, getSeekerProfile } from '../actions';

class Jobs extends Component {
  render() {
    return (
      <div>
        <PostedJobs/>
      </div>
    );
  }
};

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(
  mapStateToProps, { getSeekerProfile, getEmployerProfile })
  (Jobs)
);