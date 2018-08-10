import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Progress from './Progress';
import { getJobs, deleteJob } from '../actions';

import {
  GridContainer,
  Card,
  CardHeader,
  CardName,
  ButtonsContainer,
  CardButton,
  CardParagraph,
  Link,
  Button,
} from '../components/styles';

class PostedJobs extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getJobs();
    }
  }
  delete = (index, event) => {
    const id = this.props.availableJobs[index]._id;
    this.props.deleteJob(id);
  }

  render() {
    const { availableJobs } = this.props;
    if (!this.props.availableJobs) return <Progress/>
    return (
      <GridContainer>
            <Card>
            <Link to='/uploadjob'>
              <CardHeader>
                <CardName>
                  Click here to post a new job.
                </CardName>
              </CardHeader>
              </Link>
            </Card>
        {availableJobs.map((job, i) => {
          return (
            <Card key={`${job.titleAndSalary}${i}`}>
              <Link to={{ pathname: `/jobs/${i}` }}>
                <CardHeader>
                  <CardName jobs>
                    {job.titleAndSalary}
                  </CardName>
                </CardHeader>
              </Link>
              <CardParagraph>{job.description}</CardParagraph>
              <ButtonsContainer>
                <CardButton edit
                  onClick={() => this.props.history.push(`/jobs/${i}`)}
                />
                <CardButton trash
                  onClick={() => { if (window.confirm('Deletions are irreversible. Are you sure you wish to delete this posting?')) this.delete.bind(this, i).call() }}
                />
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
  isLoggedIn: state.user.isLoggedIn,
});

export default withRouter(connect(mapStateToProps, { getJobs, deleteJob })(PostedJobs));
