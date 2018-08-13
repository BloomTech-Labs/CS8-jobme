import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getSeeker } from '../../actions';

import EmployerBrowseView from './EmployerBrowseView';
import Progress from '../../containers/Progress';

import {
  BodyContainer, 
  Title,
  Paragraph,
  Link,
  Button,
 } from '../styles';

class EmployerBrowseSeekers extends Component {
  componentDidUpdate() {
    if (this.props.needNewSeeker) {
      this.props.getSeeker();
    }
  }
  componentDidMount() {
    this.props.getSeeker();
  }

  render() {
    if (this.props.inProgress) return <Progress />;
    if (this.props.availableSeeker) {
      return (
        <BodyContainer>
          <EmployerBrowseView />
        </BodyContainer>
      );
    }
    return (
          <div>
              <Title center>Oh no!</Title>
              <Paragraph center>
                We couldn't find any jobs that matched your skills. Update your profile with other top skills that employers are hiring for.
              </Paragraph>
              <Link to='/jobs'>
                <Button>Jobs</Button>
              </Link>
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.seekers.job,
    availableSeeker: state.seekers.availableSeeker,
    inProgress: state.seekers.inProgress,
    needNewSeeker: state.seekers.needNewSeeker,
  };
};

export default withRouter(connect(
  mapStateToProps,
  { getSeeker },
)(EmployerBrowseSeekers));
