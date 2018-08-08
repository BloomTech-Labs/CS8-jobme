import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Progress from '../../containers/Progress';

import { getConversations, getMessages } from '../../actions';

class MessageSideBar extends Component {
    state = {
        show: 'received',
    }

    toggleShowing() {
        const { show } = this.state;
        const view = ['received', 'sent'];
        const value = (view.indexOf(show) + 1) % 2

        this.setState({
            show: view[value],
        });
    }

    handleClick(conversation) {
        const { seeker, employer, matchedJob } = conversation;
        if (this.props.userType === 'employer') {
            this.props.getMessages(matchedJob._id, seeker._id);
        } else {
            this.props.getMessages(matchedJob._id, employer._id);
        }
    }

    componentDidMount() {
        this.props.getConversations();
    }

    render() {
        if (!this.props.conversations) return <Progress />
        if (this.props.userType === 'employer') {
            return (
                <div>
                {this.props.conversations.map(conversation => {
                    return (
                    <Link to={`/messages/${conversation._id}`}
                    id={ conversation._id }
                    onClick={() => this.handleClick(conversation)}>  
                        <h3>{ conversation.seeker.firstName + 
                        ' ' + conversation.seeker.lastName }</h3>
                        <h5>{ conversation.matchedJob.titleAndSalary}</h5>
                    </Link>
                    )
                })}
            </div>
            )
        } return (
            <div>
                {this.props.conversations.map(conversation => {
                    return (
                    <Link to={`/messages/${conversation._id}`}
                    id={ conversation._id }
                    onClick={() => this.handleClick(conversation)}>  
                        <h3>{ conversation.employer.companyName }</h3>
                        <h5>{ conversation.matchedJob.titleAndSalary}</h5>
                    </Link>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        conversations: state.messages.conversations,
        userType: state.user.profile.userType,
    }
}

export default connect(mapStateToProps, { getConversations, getMessages })(MessageSideBar);