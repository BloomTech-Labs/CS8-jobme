import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { 
  JobCard, 
  TopContainer, 
  Img, 
  NameAndBio,
  Title,
  Paragraph,
  Buttons,
  Button, 
  Collapser,
 } from '../styles/browseStyles';

class SeekerBrowseJobCard extends Component {
  likeAndIncrement() {
    const token = localStorage.getItem('seekerToken');
    console.log('token', token);
    const requestOptions = { headers: { Authorization: `Bearer ${token}` }} 
    const id = this.props.jobs.availableJobs[this.props.index]._id;

    axios
    .put(`jobs/like/${id}`, {}, requestOptions)
    .then(response => {
      return this.props.increment();
    });
  }

  render() {
    const { 
    //  company, Just Commented this out incase SeekerJobCards still needs this 
      titleAndSalary,
      topSkills,
      additionalSkills,
      familiarWith,
      description,
    } = this.props.jobs.availableJobs[this.props.index];

    return (
      <JobCard>
        <TopContainer>
          <Img src="http://via.placeholder.com/150x150"/>
          <NameAndBio>
            <Title>should be company name</Title>
            <Paragraph>model needs summary</Paragraph>
          </NameAndBio>
        </TopContainer>
        <Title>{titleAndSalary}</Title>
        <Paragraph>
          {`${topSkills} ${
          additionalSkills} ${
          familiarWith}`}
        </Paragraph>
        <Title>Description:</Title>
        <Paragraph>{description}</Paragraph>
        <Title>Requirements:</Title>
        <Paragraph>{description} model needs requirements</Paragraph>
        <Buttons>
          <Button>Skip</Button>
          <Button>Super</Button>
          <Button onClick={() => this.likeAndIncrement()}>Like</Button>
        </Buttons>
        <Collapser/>
      </JobCard>
    );
  }
}

// click should like the job and then increase index
// index should be checked for render or stop

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(SeekerBrowseJobCard);

// You login and you go to browse
// You send the token and do a GET for jobs
// You have one job that you can like/pass(super like in Balsamiq but treat as stretch?)
// Then you should get another job
// Repeat until no jobs available

/*### Like a Job
  - [PUT] request to`/jobs/like/:jobId` requires a signed JWT retrieved from successful[POST] to / seekers / login. 
- Nothing is needed in the body. 
- Response body contains a boolean value for `match`, indicating whether the seeker has already been liked for the job.
*/