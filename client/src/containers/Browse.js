import React from 'react';
import { connect } from 'react-redux';
import { SeekerBrowseJobs, EmployerBrowseSeekers} from '../components';

const Browse = (props) => {
  if (props.userType === 'seeker') {
    return <SeekerBrowseJobs/>
  } return <EmployerBrowseSeekers/>
};

const mapStateToProps = (state) => {
  return {
    userType: state.user.profile.userType,
  }
};

export default connect(mapStateToProps)(Browse);
