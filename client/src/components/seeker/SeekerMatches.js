import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Progress from '../../containers/Progress';
import { getJobMatches } from '../../actions';

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
    this.props.getJobMatches();
  }

  render() {
    if (this.props.inProgress) return <Progress />;
    const { matchedJobs } = this.props;

    return (
      <GridContainer>
        {matchedJobs.map((job, i) => {
            return (
            <Card key={`${job.titleAndSalary}${i}`}>
              <Link
                to={{ pathname: `/matches/${i}`,
                state: { job }
              }}>
                <CardHeader>
                  <CardPic src={job.company.imgUrl} alt="Company" />
                  <CardName>{job.company.companyName}</CardName>
                </CardHeader>
              </Link>
              <CardTitle>{job.titleAndSalary}</CardTitle>
              <ButtonsContainer>
                <CardButton archive />
                <CardButton email />
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
});

export default withRouter(connect(mapStateToProps, { getJobMatches })(SeekerMatches));
