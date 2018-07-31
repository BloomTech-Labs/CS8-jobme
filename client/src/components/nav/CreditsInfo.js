import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import EmployerCreditsInfo from '../employer/EmployerCreditsInfo';
import SeekerCreditsInfo from '../seeker/SeekerCreditsInfo';

class CreditsInfo extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          {this.props.userType === 'employer' ? <EmployerCreditsInfo /> : <SeekerCreditsInfo />}
        </div>
      );
    } return <div/>;
  }
}

const mapStateToProps = state => ({
  userType: state.user.profile.userType,
  isLoggedIn: state.user.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(CreditsInfo));
