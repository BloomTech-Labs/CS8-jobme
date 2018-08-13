import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Progress from '../../containers/Progress';

import {
    HistoryContainer,
    MessageContainer,
    MessageSender,
    Message,
    MessageTime,
    ButtonsContainer,
    Button,
    Title, 
    Paragraph,
} from '../styles';

class MessageHistory extends Component {
    componentDidMount() {
        const node = this.refs.trackerRef;
        node && node.scrollIntoView({ behavior: 'smooth' });
    }
    componentDidUpdate() {
        const node = this.refs.trackerRef;
        node && node.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        if (this.props.inProgress) return <Progress />;
        if (!this.props.messageHistory.messages) return (
            <div>
                <Title center>Just getting started!</Title>
                <Paragraph center>
                    This is the beginning of your conversation about this job. Be proactive and reach out above.
                </Paragraph>
            </div>
        ); 
      
        const toId = this.props.userType === 'seeker'
            ? this.props.messageHistory.employer
            : this.props.messageHistory.seeker;
        const jobId = this.props.messageHistory.matchedJob._id;

        return (
            <HistoryContainer>                                          
                { this.props.messageHistory.messages
                    .sort((a,b) => a.createdOn > b.createdOn)
                    .map(message => {
                    return (
                        <MessageContainer>
                            <MessageSender>
                                { message.from.companyName 
                                || message.from.firstName + ' ' + message.from.lastName }:
                            </MessageSender>
                            <Message>
                                <b>{ message.title }:</b> { message.body }
                                <MessageTime>
                                    { message.createdOn.split(/[T.]/).slice(0,2).join(' ') }
                                </MessageTime>
                            </Message>
                        </MessageContainer>
                    );
                })}
                <Link to={ `/messages/compose/${toId}/${jobId}` }>
                    <ButtonsContainer 
    
                    >
                        <Button>Reply</Button>
                    </ButtonsContainer>
                </Link>
                <div ref="trackerRef"/>
            </HistoryContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        inProgress: state.messages.inProgress,
        messageHistory: state.messages.messageHistory,
        userType: state.user.profile.userType,
    }
}

export default connect(mapStateToProps)(MessageHistory);