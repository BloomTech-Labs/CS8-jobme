import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { EmployerMatchView, SeekerMatchView } from '../components';
import { getUserProfile } from '../actions';

class MatchView extends Component {
  render() {
    return (
      <div>
        <EmployerMatchView />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userType: state.user.profile.userType,
  };
};

export default withRouter(connect(mapStateToProps, { getUserProfile })(MatchView));