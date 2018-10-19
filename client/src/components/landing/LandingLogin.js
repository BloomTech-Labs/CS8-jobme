import React from 'react';
import {
  LandingForm,
  LandingLogo,
  LandingSectionLogin,
  LandingInput100C,
  LandingSubmitButton
} from '../styles';

const Login = (props) => {
  return (
    <LandingForm 
      onSubmit={(e) => 
        props.loginUser(
          {
            email: e.target.email.value, 
            password: e.target.password.value
          }, 
            props.selected === 'seeker' ? 
              'jobseeker' : 'employer'
        )
      }>
      <LandingLogo src={props.logo}/>
      <LandingSectionLogin>
        <LandingInput100C 
          name="email" 
          type="email" 
          placeholder="EMAIL"
        />
        <LandingInput100C 
          name="password" 
          type="password" 
          placeholder="PASSWORD"
        />
        <LandingSubmitButton 
          onMouseOver={(e) => props.colorBlend(e, 'background', props.color.hoverColor, 0.45)}
          onMouseOut={(e) => props.colorBlend(e, 'background', props.color.btnColor, 0.45)}
          type="submit" value="LOGIN"
        />
      </LandingSectionLogin>
    </LandingForm>
  )
}

export default Login;