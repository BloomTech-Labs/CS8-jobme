import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getConversations, getMessages } from '../../actions';

import Progress from '../../containers/Progress';

import {
    SideBarContainer,
    SideBarBox,
    SideBarTitle,
    SideBarName,
} from '../styles';

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

    // Four space tabs (－‸ლ)
    render() {
        if (!this.props.conversations) return <Progress />
        if (this.props.userType === 'employer') {
            return (
                <SideBarContainer>
                {this.props.conversations.map(conversation => {
                    return (
                    <Link to={`/messages/${conversation._id}`}
                    id={ conversation._id }
                    onClick={() => this.handleClick(conversation)}> 
                        <SideBarBox> 
                            <SideBarName>
                                { conversation.seeker.firstName + 
                            ' ' + conversation.seeker.lastName }
                            </SideBarName>
                            <SideBarTitle>
                                {conversation.matchedJob.titleAndSalary}
                            </SideBarTitle>
                        </SideBarBox>
                    </Link>
                    );
                })}
            </SideBarContainer>
            );
        } return (
            <SideBarContainer>
                {this.props.conversations.map(conversation => {
                    return (
                    <Link to={`/messages/${conversation._id}`}
                    id={ conversation._id }
                    onClick={() => this.handleClick(conversation)}> 
                        <SideBarBox>
                            <SideBarName>
                                { conversation.employer.companyName }
                            </SideBarName>
                            <SideBarTitle>
                                { conversation.matchedJob.titleAndSalary}
                            </SideBarTitle>
                        </SideBarBox>
                    </Link>
                    );
                })}
            </SideBarContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        conversations: state.messages.conversations,
        userType: state.user.profile.userType,
    }
}

export default connect(mapStateToProps, { getConversations, getMessages })(MessageSideBar);