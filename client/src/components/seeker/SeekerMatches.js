import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getJobMatches, archiveJob } from '../../actions';

import Progress from '../../containers/Progress';

import {
  GridContainer,
  Card,
  CardHeader,
  CardPic,
  CardName,
  CardTitle,
  ButtonsContainer,
  Link,
  CardButton,
} from '../styles';

class SeekerMatches extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getJobMatches();
    }
  }

  archiveHandler(jobId) {
    this.props.archiveJob(jobId);
  }

  render() {
    if (this.props.inProgress) return <Progress />;
    const { matchedJobs } = this.props;

    return (
      <GridContainer>
        { matchedJobs.map((job, i) => {
            return (
            <Card key={`${job.titleAndSalary}${i}`}>
              <Link
                to={{ pathname: `/matches/${i}`,
                state: { job }
              }}>
                <CardHeader>
                    <CardPic src={ job.company.imgUrl || "http://via.placeholder.com/100x100" } alt="Company" />
                  <CardName>{ job.company.companyName }</CardName>
                </CardHeader>
              </Link>
              <CardTitle>{ job.titleAndSalary }</CardTitle>
              <ButtonsContainer>
                  <CardButton archive onClick={ () => this.archiveHandler(job._id) } />
                <Link to={ `/messages/compose/${job.company._id}/${job._id}` }>
                  <CardButton email />
                </Link>
              </ButtonsContainer>
            </Card>
            )
          })}
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  matchedJobs: state.jobs.matchedJobs,
  isLoggedIn: state.user.isLoggedIn,
});

export default withRouter(connect(mapStateToProps, { getJobMatches, archiveJob })(SeekerMatches));
