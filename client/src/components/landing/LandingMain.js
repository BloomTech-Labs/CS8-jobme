import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  loginUser, 
  registerUser
} from '../../actions';
import {
  EmployerRegister,
  SeekerRegister, 
  Toggle, 
  Login
} from '..';
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
  LandingLogo
} from '../styles';
const logo ='images/logo_gold.png';
const btnColor = 'blue';
const hoverColor = 'darkBlue';


class LandingMain extends Component {
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
                <SeekerRegister register={this.register}/>
              :
                null
            }
            {
              this.state.selected === 'employer' && 
              this.state.action === 'register' ?
                <EmployerRegister register={this.register}/>
              :
                null
            }
            
            {
              this.state.action === 'login' && 
                <Login 
                  selected={this.selected}
                  loginUser={this.props.loginUser} 
                  colorBlend={this.colorBlend}
                  logo={logo}
                  color={{
                    hoverColor,
                    btnColor
                  }}
                />
            }
            {/* LOGIN | REGISTER TOGGLE*/}
            <Toggle 
              action={this.state.action}
              setAction={this.setAction}
            /> 
          </LandingFormsWrapper>
        </LandingFormContainer>
      </Main>
    );
  }
}

export default connect(null,{loginUser, registerUser})(LandingMain);