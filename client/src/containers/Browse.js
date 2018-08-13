import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJobs, getSeeker } from '../actions';
import { SeekerBrowseJobs, EmployerBrowseSeekers } from '../components';

class Browse extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      if (this.props.userType === 'seeker') {
        this.props.getJobs();
      } else {
        this.props.getSeeker();
      }
    }
  }

  render() {
    if (this.props.userType === 'seeker') {
      return (
        <SeekerBrowseJobs/>
      )
    } if (this.props.userType === 'employer') {
      return (
        <EmployerBrowseSeekers/>
      )
    } return <div> This is the land of the broken browser. </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userType: state.user.profile.userType,
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps, { getJobs, getSeeker })(Browse);
