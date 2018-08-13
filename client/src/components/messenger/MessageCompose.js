import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendMessage } from '../../actions';

import {
  ChildContainer,
  InputContainer,
  InputTitle,
  InputBox,
  InputTextarea,
  ButtonsContainer,
  Button,
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
    const { toId, jobId } = this.props.match.params;
    this.props.sendMessage(title, body, toId, jobId);
  }

  componentDidMount() {
    this.setState({
      email: this.props.email,
    });
  }

  render() { 
    return (
      <div>
        <ChildContainer>
          <InputContainer>
            <InputTitle>Title:</InputTitle>
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
        <ButtonsContainer>
          <Button onClick={ () => this.submitHandler() }>Send</Button>
        </ButtonsContainer>
      </div>
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