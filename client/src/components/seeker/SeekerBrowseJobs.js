import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeekerBrowseView from './SeekerBrowseView';
import Progress from '../../containers/Progress';

import { getJobs } from '../../actions';

import { 
  BodyContainer, 
  Link,
  Button,
  Title,
  Paragraph,
} from '../styles';

class SeekerBrowseJobs extends Component {
  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    if (this.props.inProgress) return <Progress/>
    return (
      <BodyContainer>
        {!this.props.availableJobs.length
          ? <div>
              <Title center>Oh no!</Title>
              <Paragraph center>
                We couldn't find any jobs that matched your skills. Update your profile with other top skills that employers are hiring for.
              </Paragraph>
              <Link to='/profile'>
                <Button>My Profile</Button>
              </Link>
          </div>
          : <SeekerBrowseView job={this.props.availableJobs[0]}/>
        }
      </BodyContainer>
    );
  }
}

const mapStateToProps = state => ({
  availableJobs: state.jobs.availableJobs,
  isLoggedIn: state.user.isLoggedIn,
  inProgress: state.jobs.inProgress,
});

export default connect(
  mapStateToProps,
  { getJobs },
)(SeekerBrowseJobs);
