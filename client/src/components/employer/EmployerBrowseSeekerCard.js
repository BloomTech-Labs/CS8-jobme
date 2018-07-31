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

class EmployerBrowseSeekerCard extends Component {
  likeAndIncrement() {
    const token = localStorage.getItem('employerToken');
    const { submittedJobs } = this.props.user.profile;
    const requestOptions = { headers: { Authorization: `Bearer ${token}` } };
    const id = this.props.seekers.availableSeekers[this.props.index]._id;

    axios
      // !! below the job you are seeking for has been hardcoded as the first job you posted
      // !! we will need to add a dynmaic selection to this
      .put(`jobseekers/like/${id}`, { jobId: `${submittedJobs[0]}` }, requestOptions)
      .then(response => this.props.increment());
  }

  render() {
    const {
      //  company, Just Commented this out incase SeekerJobCards still needs this
      summary,
      topSkills,
      additionalSkills,
      familiarWith,
      desiredTitle,
      firstName,
      lastName,
    } = this.props.seekers.availableSeekers[this.props.index];

    return <JobCard>
        <TopContainer>
          <Img src="http://via.placeholder.com/150x150" />
          <NameAndBio>
            <Title>should be company name</Title>
            <Paragraph>model needs summary</Paragraph>
          </NameAndBio>
        </TopContainer>
        <Title>{`${firstName} ${lastName}`}</Title>
        <Paragraph>
          {`Top skills: ${topSkills}`}
          {additionalSkills.length > 0 ? `Additional skills: ${additionalSkills}` : <span />}
          {familiarWith.length > 0 ? `Familiar With: ${familiarWith}` : <span />}
        </Paragraph>
        <Title>Description:</Title>
        <Paragraph>{summary}</Paragraph>
        <Title>desiredTitle:</Title>
        <Paragraph>{desiredTitle}</Paragraph>
        <Buttons>
          <Button>Skip</Button>
          <Button>Super</Button>
          <Button onClick={() => this.likeAndIncrement()}>Like</Button>
        </Buttons>
        <Collapser />
      </JobCard>;
  }
}

// click should like the job and then increase index
// index should be checked for render or stop

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(EmployerBrowseSeekerCard);
