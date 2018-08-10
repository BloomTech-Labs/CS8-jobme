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
          {this.props.profile.userType === 'employer' ? <EmployerCreditsInfo /> : <SeekerCreditsInfo />}
        </div>
      );
    } return <div/>;
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  isLoggedIn: state.user.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(CreditsInfo));
