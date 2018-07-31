import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Nav from './components/nav/Nav';
import CreditsInfo from './components/nav/CreditsInfo';
import LandingPage from './containers/LandingPage';
import Browse from './containers/Browse';
import Profile from './containers/Profile';
import Matches from './containers/Matches';
import Billing from './containers/Billing';
import UploadJobs from './containers/UploadJobs';
import Progress from './containers/Progress';
import { PostedJobs } from './components';
import { getUserProfile, clearState } from './actions';

const Container = styled.div`
  min-width: 800px;
  max-width: 1400px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;
const LoggedInContainer = Container.extend`
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 160px;
`;
// ^^^ margin-left important here for page to be centered, if
// changed, width must be changed in NavStyles,NavContainer
const Menu = styled.div`
`;

const check = (props) => {
  if (props.isLoggedIn) {
    return Browse;
  } return LandingPage;
}

class App extends Component {
  // eventually we want a listner/action that checks
  // if the token is in localStorage on componentMount
  // from there it would auto login if the token was valid
  // you could probably just check if you can succesfully
  // access a protected route
  componentDidMount() { // Not related to branch but Williams agree that it will be needed later. Ask why!
    if (localStorage.getItem('user')) {
      this.props.getUserProfile();
    }
  }

  componentDidUpdate() {
    if (this.props.loggedOut) {
      this.props.history.push('/');
      this.props.clearState();
    }
  }

  render() {
    if (this.props.inProgress) {
      return <Progress />;
    }
    return (
      <Container>
        <Content>
        <CreditsInfo />
        <Route exact path="/" component={check(this.props)} />
        <Route path="/profile" component={Profile} />
        <Route path="/matches" component={Matches} />
        <Route path="/billing" component={Billing} />
        <Route path="/uploadjob" component={UploadJobs} />
        <Route path="/jobs" component={PostedJobs} />
        </Content>
        <Nav />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    inProgress: state.user.inProgress,
  };
};

export default connect(mapStateToProps, { getUserProfile, clearState })(App);
