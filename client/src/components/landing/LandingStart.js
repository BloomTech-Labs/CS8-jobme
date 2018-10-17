import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser, registerUser} from '../../actions';
import '../styles/landingStart.css';
import { userInfo } from 'os';
import { stat } from 'fs';

class LandingStart extends Component {
  constructor(){
    super();
    this.state = {selected: 'seeker', window: null, action: 'login'}
  }

  setSelected = (selected) => {
    if(this.state.selected !== selected) this.setState({selected});
  }

  setAction = (action) => this.setState({action});

  findHPercent = (h, w) =>  h * 100 / (h + w).toFixed(0);

  setWindow = () => {
    const winHPercent = this.findHPercent(window.innerHeight, window.innerWidth);
    const view = winHPercent >= 64 ? 'mobile' : 'desktop';
    if(this.state.window === view) return;
    this.setState({window: view});
  }

  register = (e) => {
    e.preventDefault();
    
    //if(e.target.password.value !== e.target.confirm.value) return alert('Passwords Dont Match');
    
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
    window.onresize = () => this.setWindow();    
    return (
      <main style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        {this.state.window !== 'mobile' && <div style={{flex: 1, height: '100%'}}><label style={{ height: '100%', padding: '0 1rem', fontSize: '10vw', alignItems: 'center', display: 'flex'}}>Rcruit</label>
        <span style={{flex:1}}/></div>}
        <section className="LS-wrapper">
          {this.state.window === 'mobile' && <label>Rcruit</label>}
          {
            this.state.action === 'register' &&
            <header>
              <button 
                onClick={() => this.setSelected('seeker')} 
                className={this.state.selected === 'seeker' ? 'selected' : 'unselected'}
                >SEEKER
              </button>

              <button 
                onClick={() => this.setSelected('employer')}
                className={this.state.selected === 'employer' ? 'selected' : 'unselected'}
                >EMPLOYER
              </button>
            </header>
          }
          {
            this.state.action === 'login' && 
              <header>
                <div>LOG INTO RCRUIT</div>
              </header>
          }
          <section className="LS-form">
            {
              this.state.selected === 'seeker' ? 
                this.state.action === 'register' ?
                  <form onSubmit={(e) => this.register(e)}>
                    <label> SEEKER SIGNUP</label> 
                    <section className="LS-user">
                      <input name="firstName" placeholder="Your First Name"/>
                      <input name="lastName" placeholder="Your Last Name"/>
                      <input name="email" type="email" placeholder="Your Email Address"/>
                      <input name="desiredTitle" placeholder="Your Desired Title"/>
                      <textarea name="summary" placeholder="Summarize Yourself" />
                    </section>
                    <section className="LS-info">
                      <input name="topSkills" placeholder="Select You Top Skills (Max 5)"/>
                      <textarea name="experience" placeholder="List Your Experience (Job Title, Year Started - Year Ended, Current"/>
                      <input name="education" placeholder="Educational Experience (School, Year Graduated)"/>
                    </section>
                    <section className="LS-credentials">
                      <input name="password" type="password" placeholder="Password"/>
                      <input name="confirm" type="password" placeholder="Confirm"/>
                    </section>
                    <input className="submit" type="submit" value="FIND A JOB"/>       
                  </form>
                :
                null
              :
                null
            }
            {
              this.state.selected === 'employer' ? 
                this.state.action === 'register' ?
                <form onSubmit={(e) => this.register(e)}>
                  <label> EMPLOYER SIGNUP</label> 
                  <section className="LS-user">
                    <input name="companyName" placeholder="Your Company Name"/>
                    <input name="companyUrl" placeholder="URL of Your Company"/>
                    <input name="email" type="email" placeholder="Email for Account Access"/>
                    <input name="industry" placeholder="Choose Your Industry"/>
                    <textarea name="description" placeholder="Write a Description of Your Company" />
                  </section>
                  <section className="LS-credentials">
                    <input name="password" type="password" placeholder="Password"/>
                    <input name="confirmPassword" type="password" placeholder="Confirm"/>
                  </section>
                  <button>FIND PEOPLE</button>        
              </form>
                :
                  null
              :
                null
            }
            
            {
              this.state.action === 'login' && 
              <form onSubmit={(e) => this.props.loginUser({email: e.target.email.value, password: e.target.password.value}, this.state.selected === 'seeker' ? 'jobseeker' : 'employer')} >
                {/* <img src={'images/logo.png'} width='80%'/> */}
                <section className="LS-login">
                {/* <form onSubmit={(e) => {e.preventDefault(); console.log(e.target.email)}} className="LS-login"> */}
                  <input name="email" type="email" placeholder="EMAIL"/>
                  <input name="password" type="password" placeholder="PASSWORD"/>
                  <input className="submit" type="submit" value="LOGIN"/>
                </section>
              </form>
            }
            {
              this.state.action === 'register' ?
                <span >
                  Already a member? <button onClick={() => this.setAction('login') }>Click Here</button>
                </span>
              :
                <span>
                  Not a member? <button onClick={() => this.setAction('register') }>Click Here</button>
                </span>
            }
          </section>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  } 
}

export default connect(mapStateToProps,{loginUser, registerUser})(LandingStart);