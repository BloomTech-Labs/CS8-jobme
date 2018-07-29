import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeekers, toggleSeekerAvailability } from '../../actions';

class EmployerBrowseSeekers extends Component {
  state = {
    index: 0,
  }
  componentDidMount() {
    const token = localStorage.getItem('employerToken');
    this.props.getSeekers(token);
  }

  render() {
    return (
      <div>Hello there</div>
    )
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  { getSeekers, toggleSeekerAvailability }
)(EmployerBrowseSeekers);
