import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { MessageSideBar, MessageHistory, MessageCompose } from '../components';

class Messenger extends Component {
    render() {
        return (
            <div>
                <MessageSideBar />
                <Route path='/messages/compose/:toId/:jobId' component = { MessageCompose } />
                <Route path='/messages/:historyId' component={ MessageHistory }/>
            </div>
        )
    }
}

export default Messenger;