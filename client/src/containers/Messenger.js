import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { MessageSideBar, MessageHistory, MessageCompose } from '../components';

import {
  BodyContainer,
  MessengerContainer, 
  ChildContainer,
} from '../components/styles';

class Messenger extends Component {
  render() {
    return (
      <BodyContainer>
        <MessengerContainer>
          <MessageSideBar />
          <ChildContainer center>
            <Route path='/messages/:historyId' component={ MessageHistory }/>
            <Route path='/messages/compose/:toId/:jobId' component = { MessageCompose } />
          </ChildContainer>
        </MessengerContainer>
      </BodyContainer>
    );
  }
}

export default Messenger;