import React from 'react';
import { connect } from 'react-redux';
import { SeekerBrowseJobs, EmployerBrowseSeekers} from '../components';

const Browse = () => {
  if (this.props.userType === "Seeker") {
    return <SeekerBrowseJobs/>
  } return <EmployerBrowseSeekers/>
};

const mapStateToProps = state => {
  return {
    userType: state.user.profile.userType,
  }
};

export default connect(mapStateToProps)(Browse);
