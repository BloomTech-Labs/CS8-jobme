import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Nav from './components/nav/Nav';
import CreditsInfo from './components/nav/CreditsInfo';
import LandingPage from './containers/LandingPage';
import Browse from './containers/Browse';
import Profile from './containers/Profile';
import Matches from './containers/Matches';
import MatchView from './containers/MatchView';
import Billing from './containers/Billing';
import UploadJobs from './containers/UploadJobs';
import Progress from './containers/Progress';
import PostedJobs from './containers/PostedJobs';
import EditJob from './components/employer/EditJob';
import OneModal from './components/OneModal';
import Messenger from './containers/Messenger';
import PasswordReset from './containers/PasswordReset';

import { getUserProfile, clearState, returnedHome } from './actions';

import {
  Container,
  Content,
} from './components/styles';

// ^^^ margin-left important here for page to be centered, if
// changed, width must be changed in NavStyles,NavContainer
const check = (props) => {
  if (props.isLoggedIn) {
    return Browse;
  }
  return LandingPage;
};

class App extends Component {
  // check if the token is in localStorage on componentMount
  // auto login if the token is valid, go home to login otherwise
  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.props.getUserProfile();
    } else if (!window.location.href.includes('resetpass')) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    // handles user logout by going home and clearing state
    if (this.props.loggedOut) {
      this.props.history.push('/');
      this.props.clearState();
    }
    // handles posting and updating events that should return home
    if (this.props.returnHome) {
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
        <OneModal />
        <Content>
        <CreditsInfo />
        <Route exact path="/" component={check(this.props)} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/matches" component={Matches} />
        <Route path="/matches/:matchId" component={MatchView} />
        <Route path="/billing" component={Billing} />
        <Route path="/uploadjob" component={UploadJobs} />
        <Route exact path="/jobs" component={PostedJobs} />
        <Route path="/jobs/:jobId" component={EditJob} />
        <Route path="/messages" component={Messenger} />
        <Route path="/resetpass/:userType/:resetToken" component={PasswordReset} />
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
