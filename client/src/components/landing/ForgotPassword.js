import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions';
import { LandingToggle, LandingToggleButton, Form, LandingInput, LandingSubmitButton, LandingFormHeaderButton } from '../styles';

class ForgotPassword extends Component {
  state = {
    showPasswordReset: false,
  }

  showPasswordReset() {
    this.setState({
      showPasswordReset: true,
    })
  }

  render() {
    if (this.state.showPasswordReset) {
      return (
        <Form onSubmit={(event) => {
          event.preventDefault();
          this.props.resetPassword(this.state.forgotPassword)
        }}
        >
          <LandingInput
            name="forgotPassword"
            placeholder="EMAIL"
            onChange={({ target }) => this.setState({ [target.name]: target.value })}
          />
          <LandingFormHeaderButton>RESET</LandingFormHeaderButton>
        </Form>
      )
    } return (
      <LandingToggle>
        Forgot password?
        <LandingToggleButton
          onClick={() => this.showPasswordReset()}
        >
          Click here
        </LandingToggleButton>
      </LandingToggle>

    )
  }
}

export default connect(null, { resetPassword })(ForgotPassword);