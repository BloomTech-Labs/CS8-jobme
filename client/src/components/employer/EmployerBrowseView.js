import React, { Component } from 'react';
import { connect } from 'react-redux';

import { likeSeeker } from '../../actions';

import {
  BrowseView,
  ChildContainer,
  ProfilePic,
  Title,
  MatchedAndDesired,
  Paragraph,
  ButtonsContainer,
  Button,
} from '../styles';

class EmployerBrowseView extends Component {
  buttonHandler(string) {
    let options = {};
    if (string) {
      options = {
        [string]: true,
      };
    }
    this.props.likeSeeker(this.props.jobSeeker._id, this.props.job._id, options);
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
      imgUrl,
    } = this.props.jobSeeker;

    return <BrowseView>
        <ChildContainer row>
        <ProfilePic src={imgUrl || "http://via.placeholder.com/250x250"} />
          <ChildContainer>
            <Title big center>{`${firstName} ${lastName}`}</Title>
            <Paragraph center>{summary}</Paragraph>
          </ChildContainer>
        </ChildContainer>
        <MatchedAndDesired center>
          Desired Title: {desiredTitle}
        </MatchedAndDesired>
        <Title>Skills:</Title>      
        <Paragraph>
          {`Top skills: ${topSkills}`}
          {additionalSkills.length > 0 ? `Additional skills: ${additionalSkills}` : <span />}
          {familiarWith.length > 0 ? `Familiar With: ${familiarWith}` : <span />}
        </Paragraph>
        <Title>Description:</Title>
        <Paragraph>{summary}</Paragraph>
        <Title>desiredTitle:</Title>
        <Paragraph>{desiredTitle}</Paragraph>
        <ButtonsContainer browse>
          <Button onClick={() => this.buttonHandler('skip')}>Skip</Button>
          <Button onClick={() => this.buttonHandler('superLike')}>Super</Button>
          <Button onClick={() => this.buttonHandler()}>Like</Button>
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

export default connect(mapStateToProps, { likeSeeker })(EmployerBrowseView);
