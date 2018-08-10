import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendMessage } from '../../actions';

import {
  BodyContainer,
  ChildContainer,
  InputContainer,
  InputTitle,
  InputBox,
  InputTextarea,
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