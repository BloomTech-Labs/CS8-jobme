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
import PostedJobs from './containers/PostedJobs';
import EditJob from './components/employer/EditJob';

import { getUserProfile, clearState, returnedHome } from './actions';

const Container = styled.div`
  min-width: 500px;
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 180px;
`;
// ^^^ margin-left important here for page to be centered, if
// changed, width must be changed in NavStyles,NavContainer
const check = (props) => {
  if (props.isLoggedIn) {
    return Browse;
  } return LandingPage;
};

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
    } else if (this.props.returnHome) {
      this.props.history.push('/');
      this.props.returnedHome();
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
        <Route exact path="/jobs" component={PostedJobs} />
        <Route path="/jobs/:jobId" component={EditJob} />
        </Content>
        <Nav />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  inProgress: state.user.inProgress,
  loggedOut: state.user.loggedOut,
  returnHome: state.user.returnHome,
});

export default connect(mapStateToProps, { getUserProfile, clearState, returnedHome })(App);
