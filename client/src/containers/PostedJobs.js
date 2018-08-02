import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Progress from './Progress';
import { getJobs } from '../actions';

import {
  GridContainer,
  Card,
  CardHeader,
  CardName,
  ButtonsContainer,
  Button,
  Paragraph,
  Link,
} from '../components/styles';

class PostedJobs extends Component {
  render() {
    const { availableJobs } = this.props.jobs;
    if (!availableJobs) return <Progress/>;

    return (
    <GridContainer>
      {[1].map((job, i) => {
        return (
          <Card key={`${job.titleAndSalary}${i}`}>
            <Link to={{ pathname: `/jobs/${i}` }}>
              <CardHeader>
                <CardName>
                  {job.titleAndSalary}
                </CardName>
              </CardHeader>
            </Link>
            <Paragraph>{job.description}</Paragraph>
            <ButtonsContainer>
              <Button>Archive</Button>
              <Button>Edit</Button>
            </ButtonsContainer>
          </Card>
        )
      })}
    </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  availableJobs: state.jobs.availableJobs,
});

export default withRouter(connect(mapStateToProps, { getJobs })(PostedJobs));
