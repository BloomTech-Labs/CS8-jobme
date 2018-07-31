import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likeSeeker } from '../../actions';

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
  buttonHandler(string) {
    const options = {
      [string]: true,
    };
    this.props.likeSeeker(this.props.jobSeeker._id, options);
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
    } = this.props.jobSeeker;

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
          <Button onClick={() => this.buttonHandler('skip')}>Skip</Button>
          <Button onClick={() => this.buttonHandler('super')}>Super</Button>
          <Button onClick={() => this.buttonHandler()}>Like</Button>
        </ButtonsContainer>
        <Collapser />
      </BrowseView>;
  }
}

export default connect(null, { likeSeeker })(EmployerBrowseView);
