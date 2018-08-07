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
  CardButton,
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

          return job.matchedSeekers.map((match, i) => {
            return (
            <Card key={`${match}${i}`}>
              <Link
                to={{
                pathname: `/matches/${i}`,
                state: { match }
                }}>
                <CardHeader>
                    <CardPic src={match.imgUrl || "http://via.placeholder.com/100x100"} alt="seeker" />
                  <CardName>{match.firstName} {match.lastName}</CardName>
                </CardHeader>
              </Link>
              <CardTitle>{titleAndSalary}</CardTitle>
              <ButtonsContainer>
                <CardButton archive/>
                <CardButton call/>
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
