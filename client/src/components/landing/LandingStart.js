import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser, registerUser} from '../../actions';
import '../styles/landingStart.css';
import {
  Main,
  EmptyFlex,
  LandingDesktopLogoWrapper,
  LandingDesktopLogo,
  LandingFormContainer,
  LandingFormHeader,
  LandingFormHeaderTitle,
  LandingFormHeaderButton,
  LandingMobileLogoWrapper,
  LandingFormsWrapper,
  LandingForm,
  LandingFormLabel,
  LandingSectionUser,
  LandingSectionInfo,
  LandingSectionCredentials,
  LandingSectionLogin,
  LandingInput100,
  LandingInput100C,
  LandingInput50,
  LandingTextarea,
  LandingSubmitButton,
  LandingToggle,
  LandingToggleButton,
  LandingLogo
} from '../styles';
const logo ='images/logo_gold.png';
const btnColor = 'blue';
const hoverColor = 'darkBlue';


class LandingStart extends Component {
  constructor(){
    super();
    this.state = {
      action: 'login', // Default Action to take
      selected: 'seeker', // Default Type for register
      window: null, // mobile|desktop
      resize: true // Prevent resize on mobile keyboard
    }
  }

  findHPercent = (h, w) =>  h * 100 / (h + w).toFixed(0);

  setSelected = (selected) => this.state.selected !== selected ? this.setState({selected}) : null;
  setAction = (action) => this.setState({action});

  setWindow = () => {
    const winHPercent = this.findHPercent(window.innerHeight, window.innerWidth);
    const view = winHPercent >= 60 ? 
      'mobile' : 'desktop';

    return this.state.window === view ? 
      null : this.setState({window: view});
  }

  colorBlend = (e, property, color, sec) => {
    e.target.style.transition += `${property} ${sec}s`;  
    e.target.style[property] = color;
  }

  register = (e) => {
    e.preventDefault();
        
    if(this.state.selected === 'seeker')
      this.props.registerUser({
        email: e.target.email.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        desiredTitle: e.target.desiredTitle.value,
        summary: e.target.summary.value,
        topSkills: e.target.topSkills.value,
        password: e.target.password.value,
        experience: e.target.experience.value,
        education: e.target.education.value,
      },'jobSeeker');
    if(this.state.selected === 'employer')
      this.props.registerUser({
        email: e.target.email.value,
        companyName: e.target.companyName.value,
        companyUrl: e.target.companyUrl.value,
        industry: e.target.industry.value,
        description: e.target.description.value,
        password: e.target.password.value
      }, 'employer');
  }
  componentWillMount() {
    this.setWindow();
  }
  
  render(){
    window.onresize = () => this.state.resize && this.setWindow();    
    return (
      <Main>
        {
          this.state.window !== 'mobile' && 
            <LandingDesktopLogoWrapper>
              <LandingDesktopLogo>
                Rcruit {/* Main Desktop Logo */}
              </LandingDesktopLogo>
              <EmptyFlex />
            </LandingDesktopLogoWrapper>
        }
        <LandingFormContainer>
          {
            this.state.window === 'mobile' && 
            this.state.action === 'register' && 
              <LandingMobileLogoWrapper>
                <LandingLogo src={logo}/>
              </LandingMobileLogoWrapper>}
          {
            this.state.action === 'register' &&
            <LandingFormHeader>
              <LandingFormHeaderButton 
                onClick={() => this.setSelected('seeker')} 
                style={{background: this.state.selected === 'seeker' ? btnColor : hoverColor}}
                >SEEKER
              </LandingFormHeaderButton>

              <LandingFormHeaderButton 
                onClick={() => this.setSelected('employer')}
                style={{background: this.state.selected === 'employer' ? btnColor: hoverColor}}
                >EMPLOYER
              </LandingFormHeaderButton>
            </LandingFormHeader>
          }
          {
            this.state.action === 'login' && 
              <LandingFormHeader>
                <LandingFormHeaderTitle>LOG INTO RCRUIT</LandingFormHeaderTitle>
              </LandingFormHeader>
          }
          <LandingFormsWrapper 
            onFocus={() => this.setState({resize:false})} 
            onBlur={() => this.setState({resize:true})}>
            {
              this.state.selected === 'seeker' && 
              this.state.action === 'register' ?
                <LandingForm onSubmit={(e) => this.register(e)}>
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
              :
                null
            }
            {
              this.state.selected === 'employer' && 
              this.state.action === 'register' ?
                <LandingForm onSubmit={(e) => this.register(e)}>
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
              :
                null
            }
            
            {
              this.state.action === 'login' && 
                <LandingForm 
                  onSubmit={(e) => 
                    this.props.loginUser(
                      {
                        email: e.target.email.value, 
                        password: e.target.password.value
                      }, 
                        this.state.selected === 'seeker' ? 
                          'jobseeker' : 'employer'
                    )
                  }>
                  <LandingLogo src={logo}/>
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
                      onMouseOver={(e) => this.colorBlend(e, 'background', hoverColor, 0.45)}
                      onMouseOut={(e) => this.colorBlend(e, 'background', btnColor, 0.45)}
                      type="submit" value="LOGIN"
                    />
                  </LandingSectionLogin>
                </LandingForm>
            }
            {
              this.state.action === 'register' ?
                <LandingToggle>
                  Already a member? 
                  <LandingToggleButton 
                    onClick={() => this.setAction('login')}>
                    Click Here
                  </LandingToggleButton>
                </LandingToggle>
              :
                <LandingToggle>
                  Not a member? 
                  <LandingToggleButton 
                    onClick={() => this.setAction('register')}>
                    Click Here
                  </LandingToggleButton>
                </LandingToggle>
            }
          </LandingFormsWrapper>
        </LandingFormContainer>
      </Main>
    );
  }
}

export default connect(null,{loginUser, registerUser})(LandingStart);