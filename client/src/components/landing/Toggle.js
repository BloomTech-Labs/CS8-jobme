import React from 'react';
import {
  LandingToggle,
  LandingToggleButton
} from '../styles';
const Toggle = (props) => {
  return props.action === 'register' ?
      <LandingToggle>
        Already a member? 
        <LandingToggleButton 
          onClick={() => props.setAction('login')}>
          Click Here
        </LandingToggleButton>
      </LandingToggle>
    :
      <LandingToggle>
        Not a member? 
        <LandingToggleButton 
          onClick={() => props.setAction('register')}>
          Click Here
        </LandingToggleButton>
      </LandingToggle>
}

export default Toggle;