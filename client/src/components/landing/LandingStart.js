import React, {Component} from 'react';
import '../styles/landingStart.css';

export default class LandingStart extends Component {
  constructor(){
    super();
    this.state = {selected: 'seeker'}
  }
  setSelected = (selected) => {
    if(this.state.selected !== selected) this.setState({selected});
  }
  render(){
    return (
      <section className="LS-wrapper">
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
            this.state.selected === 'seeker' && 
            <div >
              SEEKER
            </div>
          }
          {
            this.state.selected === 'employer' && 
            <div> 
              EMPLOYER
            </div>
          }
        </section>
      </section>
    );
  }
}