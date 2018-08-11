import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Progress from '../../containers/Progress';

import { Button, NoneLeftMessage, NoneLeftParagraph, NoneLeftHeading } from '../styles';

class MessageHistory extends Component {
    render() {
        if (this.props.inProgress) return <Progress />;
        if (!this.props.messageHistory.messages) return (
            <NoneLeftMessage>
                <NoneLeftHeading>Just getting started!</NoneLeftHeading>
                <NoneLeftParagraph>
                    This is the beginning of your conversation about this job. Be proactive and reach out above.
                </NoneLeftParagraph>
            </NoneLeftMessage>
        );
        const toId = this.props.userType === 'seeker'
            ? this.props.messageHistory.employer
            : this.props.messageHistory.seeker;
        const jobId = this.props.messageHistory.matchedJob._id;
        return (
            <div>                           
                <Link to={ `/messages/compose/${toId}/${jobId}` }>
                    <Button>Reply</Button>
                </Link>
                { this.props.messageHistory.messages
                    .sort((a,b) => a.createdOn<b.createdOn)
                    .map(message => {
                    return (
                        <div>

                            <h3>
                                To: { message.to.companyName 
                                    || message.to.firstName + ' ' + message.to.lastName }
                            </h3>
                            <h3>
                                From: { message.from.companyName 
                                    || message.from.firstName + ' ' + message.from.lastName }
                            </h3>
                            <p>{ message.createdOn.split(/[T.]/).slice(0,2).join(' ') }</p>
                            <h4>{ message.title }</h4>
                            <p>{ message.body }</p>
                        </div>
                    )
                })}
            </div>
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