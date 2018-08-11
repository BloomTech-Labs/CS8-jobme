import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeekerBrowseView from './SeekerBrowseView';

import { getJobs } from '../../actions';

import { 
  BodyContainer, 
  NoneLeftMessage,
  NoneLeftHeading,
  NoneLeftParagraph,
} from '../styles';

class SeekerBrowseJobs extends Component {
  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    return (
      <BodyContainer>
        {!this.props.availableJobs.length
          ? <NoneLeftMessage>
              <NoneLeftHeading>Oh no!</NoneLeftHeading>
              <NoneLeftParagraph>
                We couldn't find any jobs that matched your skills. Please update your profile with other top skills that employers are hiring for.
              </NoneLeftParagraph>
          </NoneLeftMessage>
          : <SeekerBrowseView job={this.props.availableJobs[0]}/>
        }
      </BodyContainer>
    );
  }
}

const mapStateToProps = state => ({
  availableJobs: state.jobs.availableJobs,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(
  mapStateToProps,
  { getJobs },
)(SeekerBrowseJobs);
