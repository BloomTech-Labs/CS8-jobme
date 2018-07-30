import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  BrowseView,
  ChildContainer,
  ProfilePic,
  Title,
  Paragraph,
  ButtonsContainer,
  Button,
  Collapser,
} from '../styles';

class EmployerBrowseView extends Component {
  likeAndIncrement() {
    const token = localStorage.getItem('employerToken');
    const { submittedJobs } = this.props.loggedInEmployer.profile;
    const requestOptions = { headers: { Authorization: `Bearer ${token}` } };
    const id = this.props.seekers.availableSeekers[this.props.index]._id;

    axios
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

    return <BrowseView>
        <ChildContainer row>
          <ProfilePic src="http://via.placeholder.com/150x150" />
          <ChildContainer>
            <Title center>should be company name</Title>
            <Paragraph center>model needs summary</Paragraph>
          </ChildContainer>
        </ChildContainer>
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
        <ButtonsContainer>
          <Button>Skip</Button>
          <Button>Super</Button>
          <Button onClick={() => this.likeAndIncrement()}>Like</Button>
        </ButtonsContainer>
        <Collapser />
      </BrowseView>;
  }
}

// click should like the job and then increase index
// index should be checked for render or stop

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(EmployerBrowseView);
