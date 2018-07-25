import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class SeekerLogin extends Component {
  render() {
    return (
      <div>
        Browse and stuff
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default withRouter(
  connect(
    mapStateToProps,
  )(SeekerLogin)
);
