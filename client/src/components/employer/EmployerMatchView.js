import React, { Component } from 'react';
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
  buttonHandler(string) {
    let options = {};
    if (string) {
      options = {
        [string]: true
      };
    }
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
    } = this.props.jobSeeker;

    return <BrowseView>
      <ChildContainer row>
        <ProfilePic src={imgUrl} />
        <ChildContainer>
          <Title center>{this.props.job.titleAndSalary}</Title>
          <Paragraph center>{this.props.job.description}</Paragraph>
        </ChildContainer>
      </ChildContainer>
      <Title>{`${firstName} ${lastName}`}</Title>
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
        <Button onClick={true}>Archive</Button>
        <Button onClick={true}>Message</Button>
      </ButtonsContainer>
    </BrowseView>;
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.seekers.job,
    jobSeeker: state.seekers.availableSeekers[0],
  };
};

export default connect(mapStateToProps, {})(EmployerMatchView);