import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
  render() {
    console.log("HERE", this.props)
    const {
      titleAndSalary,
      topSkills,
      additionalSkills,
      familiarWith,
      description,
      company,
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
        <Button>Archive</Button>
        <Button>Message</Button>
      </ButtonsContainer>
    </BrowseView>;
  }
}

export default withRouter(connect(null, {})(SeekerMatchView));