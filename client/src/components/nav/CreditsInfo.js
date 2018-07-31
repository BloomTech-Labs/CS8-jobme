import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import EmployerCreditsInfo from '../employer/EmployerCreditsInfo';
import SeekerCreditsInfo from '../seeker/SeekerCreditsInfo';

class CreditsInfo extends Component {
  render() {
    return (
      <div>
        {this.props.userType === 'Employer' ? <EmployerCreditsInfo /> : <SeekerCreditsInfo />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userType: state.user.profile.userType,
});

export default withRouter(connect(mapStateToProps)(CreditsInfo));
