import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Progress from '../../containers/Progress';
import { getSeekerMatches } from '../../actions';

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

class EmployerMatches extends Component {
  componentDidMount() {
    this.props.getSeekerMatches();
  }

  render() {
    if (this.props.inProgress) return <Progress />;
    const { jobsWithSeekerMatches } = this.props;

    return (
      <GridContainer>
        {jobsWithSeekerMatches.map((job) => {
          const { titleAndSalary } = job;
          console.log(titleAndSalary);
          return job.matchedSeekers.map((match, i) => {
            const {firstName, lastName} = match;
            return (
            <Card index={`${match}${i}`}>
              <Link to={{ pathname: `/matches/${i}` }}>
                <CardHeader>
                  <CardPic src="http://via.placeholder.com/100x100" alt="Card image cap" />
                  <CardName>{firstName} {lastName}</CardName>
                </CardHeader>
              </Link>
              <CardTitle>{titleAndSalary}</CardTitle>
              <ButtonsContainer>
                <Button small>Archive</Button>
                <Button small>Email</Button>
              </ButtonsContainer>
            </Card>
            )
          })}
        )}
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  jobsWithSeekerMatches: state.seekers.jobsWithSeekerMatches,
});

export default withRouter(connect(mapStateToProps, { getSeekerMatches })(EmployerMatches));
