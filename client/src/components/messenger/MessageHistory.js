import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Progress from '../../containers/Progress';

import {
    HistoryContainer,
    Title,
    Button,
    MessageContainer,
    MessageToFro,
    Message,
    MessageTime,
} from '../styles';

class MessageHistory extends Component {
    render() {
        if (this.props.inProgress) return <Progress />;
        if (!this.props.messageHistory.messages) return <div />;
        const partnerId = this.props.userType === 'seeker'
            ? this.props.messageHistory.employer
            : this.props.messageHistory.seeker;

        const jobId = this.props.messageHistory.matchedJob._id;

        return (
            <HistoryContainer>                  
                { this.props.messageHistory.messages
                    .sort((a,b) => a.createdOn<b.createdOn)
                    .map(message => {
                    return (
                        <div>
                        <MessageContainer>
                            <MessageToFro>
                                <div>To: { message.to.companyName 
                                    || message.to.firstName + ' ' + message.to.lastName }
                                </div>
                                <div>
                                From: { message.from.companyName 
                                    || message.from.firstName + ' ' + message.from.lastName }
                                </div>
                            </MessageToFro>
                            <Message>
                                { message.title }:
                                { message.body }
                                <MessageTime>
                                    { message.createdOn.split(/[T.]/).slice(0,2).join(' ') }
                                </MessageTime>
                            </Message>
                        </MessageContainer>
                        </div>
                    );
                })}
                <Link to={ `/messages/compose/${partnerId}/${jobId}` }>
                    <Button>Reply</Button>
                </Link>
            </HistoryContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        inProgress: state.messages.inProgress,
        messageHistory: state.messages.messageHistory,
    }
}

export default connect(mapStateToProps)(MessageHistory);