import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Nav from './components/nav/Nav';
import { getUserProfile } from './actions';
import CreditsInfo from './components/nav/CreditsInfo';
import LandingPage from './containers/LandingPage';
import Browse from './containers/Browse';
import Profile from './containers/Profile';
import Matches from './containers/Matches';
import Billing from './containers/Billing';
import UploadJobs from './containers/UploadJobs';
import { PostedJobs } from './components';

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

const ConditionalNav = (props) => {
  if (props.isLoggedIn) {
    return (
      <div>
      <Nav />
      <CreditsInfo />
      </div>
    );
  } return <div/>;
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

  render() {
    return (
      <Container>
        <ConditionalNav isLoggedIn={this.props.isLoggedIn}/>
      <Content>
        <Route exact path="/" component={check(this.props)} />
        <Route path="/profile" component={Profile} />
        <Route path="/matches" component={Matches} />
        <Route path="/billing" component={Billing} />
        <Route path="/uploadjob" component={UploadJobs} />
        <Route path="/jobs" component={PostedJobs} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps, { getUserProfile })(App);
