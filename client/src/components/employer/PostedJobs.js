import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getJobs } from '../../actions';

import {
  GridContainer,
  Card,
  CardHeader,
  CardName,
  ButtonsContainer,
  Button,
  Paragraph,
  Link,
} from '../styles/matchesStyles';

class PostedJobs extends Component {
  componentDidMount() {
    const token = localStorage.getItem('employerToken');
    this.props.getJobs(token);
  }

  render() {
    const { availableJobs } = this.props.jobs;

    return (
    <GridContainer>
      {availableJobs.map((job, i) => {
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

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps, { getJobs })(PostedJobs));
