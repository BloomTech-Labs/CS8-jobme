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
} from '../components/styles';

class PostedJobs extends Component {
  componentDidMount() {
    this.props.getJobs();
  }

  delete = (index, event) => {
    const id = this.props.availableJobs[index]._id;
    this.props.deleteJob(id);
  }

  render() {
    if (!this.props.availableJobs) return <Progress />;
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
                  onClick={this.delete.bind(this, i)} />
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

export default withRouter(connect(mapStateToProps, { getJobs, deleteJob })(PostedJobs));
