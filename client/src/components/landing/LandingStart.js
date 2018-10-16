import React, {Component} from 'react';
import '../styles/landingStart.css';

export default class LandingStart extends Component {
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
          <header>
            <button 
              onClick={() => this.setSelected('seeker')} 
              className={this.state.selected === 'seeker' ? 'selected' : 'unselected'}
            >SEEKER</button>

            <button 
              onClick={() => this.setSelected('employer')}
              className={this.state.selected === 'employer' ? 'selected' : 'unselected'}
            >EMPLOYER</button>

          </header>
          <section className="LS-form">
            {
              this.state.selected === 'seeker' ? 
                this.state.action === 'register' ?
                  <div >
                    <label> SEEKER SIGNUP</label> 
                    <section className="LS-user">
                      <input placeholder="Your First Name"/>
                      <input placeholder="Your Last Name"/>
                      <input type="email" placeholder="Your Email Address"/>
                      <input placeholder="Your Desired Title"/>
                      <textarea placeholder="Summarize Yourself" />
                    </section>
                    <section className="LS-info">
                      <input placeholder="Select You Top Skills (Max 5)"/>
                      <textarea placeholder="List Your Experience (Job Title, Year Started - Year Ended, Current"/>
                      <input placeholder="Educational Experience (School, Year Graduated)"/>
                    </section>
                    <section className="LS-credentials">
                      <input type="password" placeholder="Password"/>
                      <input type="password" placeholder="Confirm"/>
                    </section>
                    <button>Find A Job</button>        
                  </div>
                :
                  <div> SEEKER LOGIN</div>
              :
                null
            }
            {
              this.state.selected === 'employer' ? 
                this.state.action === 'register' ?
                  <div> 
                    EMPLOYER SIGNUP
                  </div>
                :
                  <div>
                    EMPLOYER LOGIN
                  </div>
              :
                null
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