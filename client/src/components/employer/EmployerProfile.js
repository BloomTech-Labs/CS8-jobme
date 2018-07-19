import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEmployerProfile } from '../../actions/profileActions';



class EmployerProfile extends Component {
  componentDidMount() {
    const token = this.props.loggedInEmployer.token || localStorage.getItem('token');

    this.props.getEmployerProfile(token)
  }
  
  render() {
    return (
      <div>
        <div>
          <img src='http://via.placeholder.com/150x150' /><h2>{this.props.name}</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({ ...state });
};

export default connect(mapStateToProps, { getEmployerProfile })(EmployerProfile);