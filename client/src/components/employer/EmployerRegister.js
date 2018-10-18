import React from 'react';
import {
  LandingForm,
  LandingFormLabel,
  LandingInput50,
  LandingTextarea,
  LandingSectionUser,
  LandingSectionCredentials,
  LandingSubmitButton

} from '../styles';

const EmployerRegister = (props) => {
  return (
    <LandingForm onSubmit={(e) => props.register(e)}>
      <LandingFormLabel> EMPLOYER SIGNUP</LandingFormLabel> 
      <LandingSectionUser>
        <LandingInput50 
          name="companyName"
          placeholder="Your Company Name"
        />
        <LandingInput50 
          name="companyUrl"
          placeholder="URL of Your Company"
        />
        <LandingInput50 
          name="email" 
          type="email"
          placeholder="Email for Account Access"
        />
        <LandingInput50 
          name="industry" 
          placeholder="Choose Your Industry"
          />
        <LandingTextarea 
          name="description"
          placeholder="Write a Description of Your Company"
        />
      </LandingSectionUser>
      <LandingSectionCredentials>
        <LandingInput50 
          name="password" 
          type="password"
          placeholder="Password"
        />
        <LandingInput50 
          name="confirmPassword" 
          type="password" 
          placeholder="Confirm"
        />
      </LandingSectionCredentials>
      <LandingSubmitButton 
        type="submit" 
        value="FIND People"
      />        
    </LandingForm>
  )
}

export default EmployerRegister;