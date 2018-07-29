import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSeekerProfile } from '../../actions';

import {
  StyledGrid,
  Card,
  CardHeader,
  Name,
  ButtonsContainer,
  Button,
  Description,
} from '../styles/matchesStyles';


class PostedJobs extends Component {
  componentDidMount() {
    const token = localStorage.getItem('employerToken');
    this.props.getSeekerProfile(token);
  }

  render() {
    const { submittedJobs } = this.props.loggedInEmployer.profile;
    console.log('YOOOOO', submittedJobs);
    return (
      <StyledGrid>
        {submittedJobs.map((job, i) => {
          return (
            <Card key={`${job.titleAndSalary}${i}`}>
              <Link to={{ pathname: `/jobs/${i}` }}>
                <CardHeader>
                  <Name>
                    {job.titleAndSalary}
                  </Name>
                </CardHeader>
              </Link>
              <Description>{job.description}</Description>
              <ButtonsContainer>
                <Button>Archive</Button>
                <Button>Edit</Button>
              </ButtonsContainer>
            </Card>
          )
        })}
      </StyledGrid>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps, { getSeekerProfile })(PostedJobs));