import React from 'react';
import {
  LandingForm,
  LandingFormLabel,
  LandingInput50,
  LandingInput100,
  LandingTextarea,
  LandingSectionUser,
  LandingSectionInfo,
  LandingSectionCredentials,
  LandingSubmitButton
} from '../styles';

const SeekerRegister = (props) => {
  return (
    <LandingForm onSubmit={(e) => props.register(e)}>
      <LandingFormLabel> SEEKER SIGNUP</LandingFormLabel> 
      <LandingSectionUser>
        <LandingInput50 
          name="firstName" 
          placeholder="Your First Name"
        />
        <LandingInput50 
          name="lastName"
          placeholder="Your Last Name"
        />
        <LandingInput50 
          name="email"
          type="email"
          placeholder="Your Email Address"
        />
        <LandingInput50 
          name="desiredTitle" 
          placeholder="Your Desired Title"
        />
        <LandingTextarea 
          name="summary" 
          placeholder="Summarize Yourself" 
        />
      </LandingSectionUser>
      <LandingSectionInfo>
        <LandingInput100 
          name="topSkills" 
          placeholder="Select You Top Skills (Max 5)"
        />
        <LandingTextarea 
          name="experience"
          placeholder="List Your Experience (Job Title, Year Started - Year Ended, Current"
        />
        <LandingInput100 
          name="education"
          placeholder="Educational Experience (School, Year Graduated)"
        />
      </LandingSectionInfo>
      <LandingSectionCredentials>
        <LandingInput50 
          name="password" 
          type="password" 
          placeholder="Password"
        />
        <LandingInput50 
          name="confirm" 
          type="password" 
          placeholder="Confirm"
        />
      </LandingSectionCredentials>
      <LandingSubmitButton 
        type="submit" 
        value="FIND A JOB"
      />       
    </LandingForm>
  )
}

export default SeekerRegister;