import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendMessage } from '../../actions';
import { Button } from '../styles';

import {
  BodyContainer,
  ChildContainer,
  InputContainer,
  InputTitle,
  InputBox,
  InputTextarea,
} from '../styles';


class MessageCompose extends Component {
  state = {
    title: '',
    body: '',
  }

  inputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  submitHandler = () => {
    const { title, body } = this.state;
    const { matchedJob } = this.props.messageHistory;
    const toId = this.props.userType === 'employer'
      ? this.props.messageHistory.seeker
      : this.props.messageHistory.employer;
    this.props.sendMessage(title, body, toId, matchedJob);
  }

  componentDidMount() {
      this.setState({
        email: this.props.email,
      });
  }

  render() { 
    return (
      <BodyContainer>
        <ChildContainer row>
        </ChildContainer>
        <ChildContainer>
            <InputContainer>
              <InputTitle upper>Title:</InputTitle>
                <InputBox
                  value={this.state.title}
                  type="text"
                  name='title'
                onChange={this.inputHandler.bind(this)}
                />
            </InputContainer>
            </ChildContainer>
        <ChildContainer>
          <InputContainer>
            <InputTitle>Body:</InputTitle>
            <InputTextarea large
              value={this.state.body}
              type="text"
              name='body'
              onChange={this.inputHandler.bind(this)}
            />        
            </InputContainer>
        </ChildContainer>
        <Button onClick={ () => this.submitHandler() }>Send</Button>
      </BodyContainer>
       );
    }
}

const mapStateToProps = state => {
  return {
    messageHistory: state.messages.messageHistory,
  }
};

export default connect(mapStateToProps, { 
  sendMessage,
})(MessageCompose);