import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EmployerBrowseMatches, SeekerBrowseMatches } from '../components';
import { getEmployerProfile, getSeekerProfile } from '../actions';
import { withRouter } from 'react-router-dom';

class Matches extends Component {
  render() {
    return (
      <div>
        {this.props.loggedInEmployer ? <EmployerBrowseMatches /> : <SeekerBrowseMatches />}
      </div>
    );
  }
};

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps, { getSeekerProfile, getEmployerProfile })(Matches));