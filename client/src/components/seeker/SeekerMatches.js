import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    const { jobsWithSeekerMatches } = this.props;
    console.log('HERE!', jobsWithSeekerMatches);


    return (
      <GridContainer>
        {jobsWithSeekerMatches.forEach((job) => {
          const { titleAndSalary } = job;

          job.matches.map((match, i) => (
            <Card index={`${match}${i}`}>
              <Link to={{ pathname: `/matches/${i}` }}>
                <CardHeader>
                  <CardPic src="http://via.placeholder.com/100x100" alt="Card image cap" />
                  <CardName>{titleAndSalary}</CardName>
                </CardHeader>
              </Link>
              <CardTitle>{match.desireTitle}</CardTitle>
              <ButtonsContainer>
                <Button>Archive</Button>
                <Button>Email</Button>
              </ButtonsContainer>
            </Card>
          ));
        })}
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  jobsWithSeekerMatches: state.seekers.jobsWithSeekerMatches,
});

export default withRouter(connect(mapStateToProps, { getJobMatches })(SeekerMatches));
