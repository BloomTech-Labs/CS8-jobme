import React, { Component} from 'react';
import { connect } from 'react-redux';
import { EmployerProfile, SeekerProfile } from '../components';
import { getUserProfile } from '../actions';
import { withRouter } from 'react-router-dom';
class Profile extends Component {
  render() {
    return (
      <div>
        {this.props.userType === 'employer' ? <EmployerProfile /> : <SeekerProfile />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  userType: state.user.profile.userType,
  }
};

export default withRouter(connect(mapStateToProps, { getUserProfile })(Profile));

