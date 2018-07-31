import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { EmployerMatches, SeekerMatches } from '../components';
import { getUserProfile } from '../actions';

class Matches extends Component {
  render() {
    return (
      <div>
        {this.props.userType === 'employer' ? <EmployerMatches /> : <SeekerMatches />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userType: state.user.profile.userType,
  };
};

export default withRouter(connect(mapStateToProps, { getUserProfile })(Matches));