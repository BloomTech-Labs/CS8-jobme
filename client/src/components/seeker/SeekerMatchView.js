import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { archiveJob } from '../../actions';

import {
  BrowseView,
  ChildContainer,
  ProfilePic,
  Title,
  Paragraph,
  ButtonsContainer,
  Button,
} from '../styles';

class SeekerMatchView extends Component {
  archiveHandler(jobId) {
    this.props.archiveJob(jobId);
  }

  render() {
    console.log("HERE", this.props)
    const {
      titleAndSalary,
      topSkills,
      additionalSkills,
      familiarWith,
      description,
      company,
      _id,
    } = this.props.location.state.job;

    return <BrowseView>
      <ChildContainer row>
        <ProfilePic src={company.imgUrl} />
        <Title center>{company.companyName}</Title>
      </ChildContainer>
      <Title>Desired Skills:</Title>
      <Paragraph>
        {`Top skills: ${topSkills}`}
        {additionalSkills.length > 0 ? `Additional skills: ${additionalSkills}` : <span />}
        {familiarWith.length > 0 ? `Familiar With: ${familiarWith}` : <span />}
      </Paragraph>
      <Title>Description:</Title>
      <Paragraph>{description}</Paragraph>
      <Title>Title and Salary:</Title>
      <Paragraph>{titleAndSalary}</Paragraph>
      <ButtonsContainer>
        <Button archive onClick={ () => this.archiveHandler(_id) }>Archive</Button>
        <Link to={ `/messages/compose/${company._id}/${_id}` }>
          <Button>Message</Button>
        </Link>
      </ButtonsContainer>
    </BrowseView>;
  }
}

export default withRouter(connect(null, { archiveJob })(SeekerMatchView));