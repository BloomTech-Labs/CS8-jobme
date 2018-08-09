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
  Paragraph,
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
    if (!this.props.availableJobs.length) {
      return (
        <div>
          <h1>You don't currently have any jobs posted.</h1>
          <Link to='/uploadjob'>
            <Button>Post a Job</Button>
          </Link>
        </div>
      )
    }
    const { availableJobs } = this.props;

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
