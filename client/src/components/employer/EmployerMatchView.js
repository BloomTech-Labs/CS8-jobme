import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { archiveSeeker } from '../../actions';

import {
  BrowseView,
  ChildContainer,
  ProfilePic,
  Title,
  Paragraph,
  ButtonsContainer,
  Button,
  Link,
} from '../styles';

class EmployerMatchView extends Component {
  handleArchive(seekerId, jobId) {
    this.props.archiveSeeker(seekerId, jobId);
  }

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
      _id,
    } = this.props.location.state.match;

    const { job } = this.props.location.state;

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
        <Button onClick={ () => this.handleArchive(_id, job._id) }>Archive</Button>
        <Link to={ `/messages/compose/${_id}/${job._id}` }>
          <Button>Message</Button>
        </Link>
      </ButtonsContainer>
    </BrowseView>;
  }
}

export default withRouter(connect(null, { archiveSeeker })(EmployerMatchView));