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

class EmployerMatchView extends Component {
  render() {
    const {
      summary,
      topSkills,
      additionalSkills,
      familiarWith,
      desiredTitle,
      firstName,
      lastName,
      imgUrl,
    } = this.props.location.state.match;

    return <BrowseView>
      <ChildContainer row>
        <ProfilePic src={imgUrl} />
        <Title center>{`${firstName} ${lastName}`}</Title>
      </ChildContainer>
      <Title>Top Skills:</Title>
      <Paragraph>
        {`Top skills: ${topSkills}`}
        {additionalSkills.length > 0 ? `Additional skills: ${additionalSkills}` : <span />}
        {familiarWith.length > 0 ? `Familiar With: ${familiarWith}` : <span />}
      </Paragraph>
      <Title>Summary:</Title>
      <Paragraph>{summary}</Paragraph>
      <Title>desiredTitle:</Title>
      <Paragraph>{desiredTitle}</Paragraph>
      <ButtonsContainer>
        <Button>Archive</Button>
        <Button>Message</Button>
      </ButtonsContainer>
    </BrowseView>;
  }
}

export default withRouter(connect(null, {})(EmployerMatchView));