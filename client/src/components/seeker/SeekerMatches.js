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
  Button,
  Link,
} from '../styles';

class SeekerMatches extends Component {
  componentDidMount() {
    this.props.getJobMatches();
  }

  render() {
    if (this.props.inProgress) return <Progress />;
    const { matchedJobs } = this.props;
    console.log('HERE!', matchedJobs);


    return (
      <GridContainer>
        {this.props.matchedJobs.map((job, i) => {
            return (
            <Card index={`${job.titleAndSalary}${i}`}>
              <Link to={{ pathname: `/matches/${i}` }}>
                <CardHeader>
                  <CardPic src="http://via.placeholder.com/100x100" alt="Card image cap" />
                  <CardName>{job.company.companyName}</CardName>
                </CardHeader>
              </Link>
              <CardTitle>{job.titleAndSalary}</CardTitle>
              <ButtonsContainer>
                <Button small>Archive</Button>
                <Button small>Email</Button>
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
