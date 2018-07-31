import React from 'react';
import { connect } from 'react-redux';
import EmployerBilling from '../components/employer/EmployerBilling';
import SeekerBilling from '../components/seeker/SeekerBilling';

const Billing = (props) => {
  if (props.userType === 'seeker') {
    return <SeekerBilling />;
  } return <EmployerBilling />;
};

const mapStateToProps = (state) => {
  return {
    userType: state.user.profile.userType,
  }
}

export default connect(mapStateToProps)(Billing);
