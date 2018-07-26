import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Nav from './containers/nav/Nav';
import CreditsInfo from './containers/nav/CreditsInfo';
import Body from './containers/Body';
import { getEmployerProfile, getSeekerProfile } from './actions';

import styled from 'styled-components';
const Container = styled.div`
  min-width: 800px;
  max-width: 1400px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
`;
const Menu= styled.div`
  position: fixed;
  top: 1em;
  right: 1em;
`;

class App extends Component {
  // eventually we want a listner/action that checks
  // if the token is in localStorage on componentMount
  // from there it would auto login if the token was valid
  // you could probably just check if you can succesfully
  // access a protected route

  isLoggedOn = () => {
    return localStorage.getItem('employerToken') ||
      localStorage.getItem('seekerToken');
  }

  render() {
    return (
      <Container>
        {this.isLoggedOn() ?
        <Content>
          <CreditsInfo/>
          <Route path="/" component={Body} />
          <Menu><Nav/></Menu>
        </Content> : 
          <Route path="/" component={Body} />
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loggedInEmployer: state.loggedInEmployer,
});

export default connect(mapStateToProps, { getEmployerProfile, getSeekerProfile })(App);
